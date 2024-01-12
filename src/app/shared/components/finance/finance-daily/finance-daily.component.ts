import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DailyFinance } from 'src/app/models/finance.model';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateDailyComponent } from './add-update-daily/add-update-daily.component';
import { InfiniteScrollCustomEvent, Platform } from '@ionic/angular';
import { FinanceService } from 'src/app/services/finance.service';
import { FREQUENCIES } from 'src/app/utils/constants';
import { getTextCategory, getTextType } from 'src/app/utils/util';

@Component({
  selector: 'app-finance-daily',
  templateUrl: './finance-daily.component.html',
  styleUrls: ['./finance-daily.component.scss'],
})
export class FinanceDailyComponent implements OnInit {
  dailiesFinance: DailyFinance[] = [];

  loading = false;
  limit = 10;
  disable_next = false;
  active_btn_montly = false;
  error = false;

  lastInResponse: any;

  constructor(
    private utilsSvc: UtilsService,
    private platform: Platform,
    private financeSvc: FinanceService
  ) {}

  ngOnInit() {
    this.getDailiesFinance();
  }

  async generateMonthlyFinance() {
    try {
      await this.utilsSvc.presentLoading({});
      await this.financeSvc.generateMonthlyFinance();
      await this.utilsSvc.presentToast({
        message: 'Se genero el Historial Mensual exitosamente',
        color: 'success',
        icon: 'checkmark-circle-outline',
        duration: 1500,
      });
      await this.utilsSvc.dismissLoading();

      this.getDailiesFinance();
    } catch (error) {
      await this.utilsSvc.presentToast({
        message:
          'Ocurrio un error al generar el Historial Mensual, vuelva a intentar',
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 1500,
      });
      await this.utilsSvc.dismissLoading();
      console.log(error);
    }
  }

  verifyDailiesFinance() {
    for (const dailyFinance of this.dailiesFinance) {
      const dateDailyFinance = new Date(dailyFinance.createdAt.seconds * 1000);
      const today = new Date();

      const monthDailyFinance = dateDailyFinance.getMonth();
      const monthCurrent = today.getMonth();
      if (monthDailyFinance !== monthCurrent) {
        this.active_btn_montly = true;
        return;
      }
    }
    this.active_btn_montly = false;
  }

  getDailiesFinance() {
    const wrapper_height = this.platform.height();
    const wrapper_width = this.platform.width();
    let limit = 10;
    if (wrapper_height < 700 && wrapper_width < 600) {
      limit = 5;
    }
    this.loading = true;
    this.limit = limit;

    let sub = this.financeSvc.getFinances(limit, FREQUENCIES.DAILY).subscribe({
      next: (res) => {
        let dailies: any[] = [];
        if (res.docs.length !== 0) {
          this.lastInResponse = res.docs[res.docs.length - 1];
        }
        for (let data of res.docs) {
          const docData: any = data.data();
          dailies.push({
            id: data.id,
            ...docData,
          });
        }

        this.dailiesFinance = dailies;
        this.verifyDailiesFinance();
        this.loading = false;
        sub.unsubscribe();
      },
      error: (error) => {
        this.error = true;
        this.loading = false;

        console.log(error);
      },
      complete: () => {
        sub.unsubscribe();
      },
    });
  }

  nextData(event) {
    if (this.disable_next) {
      (event as InfiniteScrollCustomEvent).target.complete();
      return;
    }

    let sub = this.financeSvc
      .getNextFinances(this.limit, this.lastInResponse, FREQUENCIES.DAILY)
      .subscribe({
        next: (res) => {
          let dailies: any[] = [];

          if (res.docs.length !== 0) {
            this.lastInResponse = res.docs[res.docs.length - 1];
          }

          for (let data of res.docs) {
            const docData: any = data.data();
            dailies.push({
              id: data.id,
              ...docData,
            });
          }

          this.dailiesFinance = [...this.dailiesFinance, ...dailies];
          this.verifyDailiesFinance();

          if (res.docs.length < this.limit) {
            this.disable_next = true;
          }
          sub.unsubscribe();

          setTimeout(() => {
            (event as InfiniteScrollCustomEvent).target.complete();
          }, 500);
        },
        error: () => {
          this.error = true;
          this.loading = false;
        },
        complete: () => {
          sub.unsubscribe();
        },
      });
  }

  async addOrUpdateDailyFinance(dailyFinance?: DailyFinance) {
    let res = await this.utilsSvc.presentModal({
      component: AddUpdateDailyComponent,
      componentProps: {
        dailyFinance,
      },
      cssClass: 'add-update-modal',
    });

    if (res && res.success) {
      this.getDailiesFinance();
    }
  }

  confirmDeleteDailyFinance(dailyFinance: DailyFinance) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar Registro',
      message: 'Quieres eliminar este registro ?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Si, eliminar',
          handler: () => {
            this.deleteDailyFinance(dailyFinance);
          },
        },
      ],
    });
  }

  deleteDailyFinance(dailyFinance: DailyFinance) {
    this.utilsSvc.presentLoading({});

    this.financeSvc.delete(dailyFinance.id).then(
      (res) => {
        this.utilsSvc.presentToast({
          message: 'Registro eliminado exitosamente',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500,
        });

        this.getDailiesFinance();

        this.utilsSvc.dismissLoading();
      },
      (error) => {
        this.utilsSvc.presentToast({
          message: error,
          color: 'warning',
          icon: 'alert-circle-outline',
          duration: 5000,
        });
      }
    );
  }

  _getTextType(type: string) {
    return getTextType(type);
  }

  _getTextCategory(type: string, category: string) {
    return getTextCategory(type, category);
  }
}
