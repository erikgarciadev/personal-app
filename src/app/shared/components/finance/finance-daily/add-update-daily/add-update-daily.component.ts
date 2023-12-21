import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DailyFinance } from 'src/app/models/finance.model';
import { FinanceService } from 'src/app/services/finance.service';
import { UtilsService } from 'src/app/services/utils.service';
import {
  COLLECTIONS,
  FREQUENCIES,
  options_types,
} from 'src/app/utils/constants';

@Component({
  selector: 'app-add-update-daily',
  templateUrl: './add-update-daily.component.html',
  styleUrls: ['./add-update-daily.component.scss'],
})
export class AddUpdateDailyComponent implements OnInit {
  @Input() dailyFinance: DailyFinance;

  types = options_types;

  form = new FormGroup({
    id: new FormControl(''),
    description: new FormControl(''),
    amount: new FormControl(0, [Validators.required, Validators.min(0)]),
    frequency: new FormControl(FREQUENCIES.DAILY as string),
    type: new FormControl('', [Validators.required]),
    createdAt: new FormControl(''),
    updatedAt: new FormControl(''),
  });

  constructor(
    private financeSvc: FinanceService,
    private utilsSvc: UtilsService
  ) {}

  ngOnInit() {
    if (this.dailyFinance) {
      this.form.setValue({
        ...this.form.value,
        ...this.dailyFinance,
      });
      this.form.updateValueAndValidity();
    }
  }

  submit() {
    if (!this.form.valid) return;

    if (this.dailyFinance) {
      this.updateDailyFinance();
    } else {
      this.createDailyFinance();
    }
  }

  getData = () => {
    return {
      amount: Number(this.form.value.amount),
      description: this.form.value.description,
      type: this.form.value.type,
      frequency: this.form.value.frequency,
    };
  };

  async updateDailyFinance() {
    await this.utilsSvc.presentLoading({});

    const data = this.getData();

    this.financeSvc.update(this.form.value.id, data).then(
      (res) => {
        this.utilsSvc.dismissModal({
          success: true,
        });
        this.utilsSvc.presentToast({
          message: 'Registro actualizado exitosamente',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500,
        });
        this.utilsSvc.dismissLoading();
      },
      (error) => {
        this.utilsSvc.dismissLoading();
        this.utilsSvc.presentToast({
          message: error,
          color: 'warning',
          icon: 'alert-circle-outline',
          duration: 5000,
        });
      }
    );
  }

  async createDailyFinance() {
    delete this.form.value.id;

    await this.utilsSvc.presentLoading({});

    const data = this.getData();

    this.financeSvc.add(data).then(
      (res) => {
        this.utilsSvc.dismissModal({
          success: true,
        });

        this.utilsSvc.presentToast({
          message: 'Registro creado exitosamente',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500,
        });
        this.utilsSvc.dismissLoading();
      },
      (error) => {
        this.utilsSvc.dismissLoading();
        this.utilsSvc.presentToast({
          message: error,
          color: 'warning',
          icon: 'alert-circle-outline',
          duration: 5000,
        });
      }
    );
  }
}
