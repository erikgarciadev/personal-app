import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Weight } from 'src/app/models/weight.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { COLLECTIONS } from 'src/app/utils/constants';

@Component({
  selector: 'app-add-update-weight',
  templateUrl: './add-update-weight.component.html',
  styleUrls: ['./add-update-weight.component.scss'],
})
export class AddUpdateWeightComponent implements OnInit {
  @Input() weight: Weight;

  form = new FormGroup({
    id: new FormControl(''),
    weight: new FormControl(0, [Validators.required, Validators.min(0)]),
    createdAt: new FormControl(''),
    updatedAt: new FormControl(''),
  });

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {}

  ngOnInit() {
    if (this.weight) {
      this.form.setValue({
        ...this.form.value,
        ...this.weight,
      });
      this.form.updateValueAndValidity();
    }
  }

  submit() {
    if (!this.form.valid) return;

    if (this.weight) {
      this.updateWeight();
    } else {
      this.createWeight();
    }
  }

  async updateWeight() {
    const path = `/${COLLECTIONS.WEIGHTS}/${this.form.value.id}`;

    await this.utilsSvc.presentLoading({});

    const data = {
      weight: Number(this.form.value.weight),
    };
    this.firebaseSvc.updateDocument(path, data).then(
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

  async createWeight() {
    delete this.form.value.id;

    let collection = COLLECTIONS.WEIGHTS;
    await this.utilsSvc.presentLoading({});

    const data = {
      weight: Number(this.form.value.weight),
    };

    this.firebaseSvc.addDocumentToCollection(collection, data).then(
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
