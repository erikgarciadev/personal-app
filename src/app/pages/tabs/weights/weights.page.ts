import { Component, OnInit } from '@angular/core';
import { Weight } from 'src/app/models/weight.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
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
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getWeights();
  }

  getWeights() {
    let collection = COLLECTIONS.WEIGHTS;
    this.loading = true;
    let sub = this.firebaseSvc.getDocumentsByCollection(collection).subscribe({
      next: (res: any[]) => {
        console.log(res);
        this.weights = res;
        sub.unsubscribe();
        this.loading = false;
      },
      complete: () => {
        sub.unsubscribe();
        this.loading = false;
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
