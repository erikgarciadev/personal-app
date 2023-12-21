import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { COLLECTIONS } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  constructor(private firebaseSvc: FirebaseService) {}

  path = COLLECTIONS.FINANCE;

  getFinances(limit = 10, frequency: string) {
    console.log('d', limit, frequency);
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
