import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AlertController,
  AlertOptions,
  LoadingController,
  LoadingOptions,
  ModalController,
  ModalOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  // MODAL
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts);

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      return data;
    }
  }

  dismissModal(data?: any) {
    this.modalController.dismiss(data);
  }

  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    await toast.present();
  }

  // === LOADING
  async presentLoading(opts: LoadingOptions) {
    const loading = await this.loadingController.create(opts);

    await loading.present();
  }

  //DISMISS
  async dismissLoading() {
    return await this.loadingController.dismiss();
  }

  // === Alert===
  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertController.create(opts);

    await alert.present();
  }
}
