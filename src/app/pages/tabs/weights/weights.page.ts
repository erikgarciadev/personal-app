import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, Platform } from '@ionic/angular';
import { Weight } from 'src/app/models/weight.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { WeightService } from 'src/app/services/weight.service';
import { AddUpdateWeightComponent } from 'src/app/shared/components/add-update-weight/add-update-weight.component';
import { COLLECTIONS } from 'src/app/utils/constants';

@Component({
  selector: 'app-weights',
  templateUrl: './weights.page.html',
  styleUrls: ['./weights.page.scss'],
})
export class WeightsPage implements OnInit {
  weights: Weight[] = [];

  loading = false;
  limit = 10;
  disable_next = false;

  lastInResponse: any;
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
    private weightSvc: WeightService,
    private platform: Platform
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getWeights();
  }

  getWeights() {
    const wrapper_height = this.platform.height();
    const wrapper_width = this.platform.width();
    let limit = 10;
    if (wrapper_height < 700 && wrapper_width < 600) {
      limit = 5;
    }
    this.loading = true;
    this.limit = limit;

    let sub = this.weightSvc.getWeights(limit).subscribe({
      next: (res) => {
        let weights: any[] = [];
        if (res.docs.length !== 0) {
          this.lastInResponse = res.docs[res.docs.length - 1];
        }
        for (let data of res.docs) {
          const docData: any = data.data();
          weights.push({
            id: data.id,
            ...docData,
          });
        }

        this.weights = weights;
        this.loading = false;
        sub.unsubscribe();
      },
      error: () => {},
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

    let sub = this.weightSvc
      .getNextWeights(this.limit, this.lastInResponse)
      .subscribe({
        next: (res) => {
          let weights: any[] = [];

          if (res.docs.length !== 0) {
            this.lastInResponse = res.docs[res.docs.length - 1];
          }

          for (let data of res.docs) {
            const docData: any = data.data();
            weights.push({
              id: data.id,
              ...docData,
            });
          }

          this.weights = [...this.weights, ...weights];

          if (res.docs.length < this.limit) {
            this.disable_next = true;
          }
          sub.unsubscribe();

          setTimeout(() => {
            (event as InfiniteScrollCustomEvent).target.complete();
          }, 500);
        },
        error: () => {},
        complete: () => {
          sub.unsubscribe();
        },
      });
  }

  async addOrUpdateWeight(weight?: Weight) {
    let res = await this.utilsSvc.presentModal({
      component: AddUpdateWeightComponent,
      componentProps: {
        weight,
      },
      cssClass: 'add-update-modal',
    });

    if (res && res.success) {
      this.getWeights();
    }
  }

  confirmDeleteWeight(weight: Weight) {
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
            this.deleteWeight(weight);
          },
        },
      ],
    });
  }

  deleteWeight(weight: Weight) {
    let path = `${COLLECTIONS.WEIGHTS}/${weight.id}`;
    this.utilsSvc.presentLoading({});

    this.firebaseSvc.deleteDocument(path).then(
      (res) => {
        this.utilsSvc.presentToast({
          message: 'Registro eliminado exitosamente',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500,
        });

        this.getWeights();

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
}
