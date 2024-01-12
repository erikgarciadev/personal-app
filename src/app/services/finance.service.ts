import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { COLLECTIONS, FREQUENCIES, TYPES_FINANCE } from '../utils/constants';
import { lastValueFrom } from 'rxjs';
import {
  DailyFinance,
  MonthlyFinance,
  OmitDailyFinance,
} from '../models/finance.model';
import {
  getFirstDayLastMonth,
  getTextCategory,
  getTextType,
} from '../utils/util';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  constructor(
    private firebaseSvc: FirebaseService,
    private storageSvc: StorageService
  ) {}

  path = COLLECTIONS.FINANCE;

  getDataMonthlyFinance(dailiesFinance: OmitDailyFinance[], url: string) {
    let income = 0;
    let expense = 0;
    let amount = 0;

    const firstDayLastMonth = getFirstDayLastMonth();

    for (const data of dailiesFinance) {
      if (data.type === TYPES_FINANCE.EXPENSE) {
        expense = expense + data.amount;
        amount = amount - data.amount;
        continue;
      }

      if (data.type === TYPES_FINANCE.INCOME) {
        income = income + data.amount;
        amount = amount + data.amount;
      }
    }

    const monthlyFinance: Omit<MonthlyFinance, 'id' | 'updatedAt'> = {
      dailiesFinance,
      amount,
      url,
      income,
      expense,
      frequency: FREQUENCIES.MONTHLY,
      createdAt: new Date(),
      transactionDate: firstDayLastMonth,
    };

    return monthlyFinance;
  }

  async generateMonthlyFinance() {
    const res = await this.getAllFinancesByLastMonth();
    const dailies: OmitDailyFinance[] = [];

    let dataBody = [];

    for (const data of res.docs) {
      const dataDailyFinance = data.data();

      const { amount, createdAt, frequency, description, type, category } =
        dataDailyFinance;

      dailies.push({
        amount,
        createdAt,
        frequency,
        description,
        type,
        category: category ?? '',
      });

      dataBody.push([
        amount,
        getTextType(type),
        getTextCategory(type, category),
        description,
        moment(createdAt?.toDate()).format('DD/MM/YYYY HH:mm:ss') ?? '-',
      ]);
    }

    const batch = this.firebaseSvc.batch;

    const doc = new jsPDF();

    autoTable(doc, {
      headStyles: {
        fillColor: '#3880ff',
      },
      head: [['Monto', 'Tipo', 'Categoría', 'Descripción', 'Fecha']],
      body: [...dataBody],
    });

    const namePdf = 'table.pdf';
    const pdfData = doc.output('blob');

    const url = await this.storageSvc.uploadFile(namePdf, pdfData);

    const monthlyFinance = this.getDataMonthlyFinance(dailies, url);

    res.docs.forEach((doc) => {
      // Eliminar documento actual
      batch.delete(doc.ref);
    });

    // crear montglyFinance
    const newDocRef = this.firebaseSvc.getDocRef(this.path);
    batch.set(newDocRef, monthlyFinance);

    // Ejecutar el lote
    return await batch.commit();
  }

  async getAllFinancesByLastMonth() {
    const today = new Date();

    const firstDayLastMonth = getFirstDayLastMonth();

    const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    lastDayLastMonth.setHours(23, 59, 59, 999);
    const frequencies$ = this.firebaseSvc.getList<DailyFinance>(
      this.path,
      (ref) =>
        ref
          .where('frequency', '==', FREQUENCIES.DAILY)
          .where('createdAt', '>=', firstDayLastMonth)
          .where('createdAt', '<=', lastDayLastMonth)
    );

    const frequenciesLastMonth = await lastValueFrom(frequencies$);
    return frequenciesLastMonth;
  }

  getFinances(limit = 10, frequency: string) {
    return this.firebaseSvc.getList(this.path, (ref) =>
      ref
        .limit(limit)
        .where('frequency', '==', frequency)
        .orderBy('createdAt', 'desc')
    );
  }

  getNextFinances(limit = 1, lastInResponse: any, frequency: string) {
    return this.firebaseSvc.getList(this.path, (ref) =>
      ref
        .orderBy('createdAt', 'desc')
        .where('frequency', '==', frequency)
        .startAfter(lastInResponse)
        .limit(limit)
    );
  }

  add(data: any) {
    return this.firebaseSvc.addDocumentToCollection(this.path, {
      ...data,
    });
  }

  update(uuid: string, data: any) {
    return this.firebaseSvc.updateDocument(`${this.path}/${uuid}`, {
      ...data,
    });
  }

  delete(uuid: string) {
    return this.firebaseSvc.deleteDocument(`${this.path}/${uuid}`);
  }
}
