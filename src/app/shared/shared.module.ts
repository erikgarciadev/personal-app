import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { AddUpdateWeightComponent } from './components/add-update-weight/add-update-weight.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    AddUpdateWeightComponent,
    CustomInputComponent,
  ],
  exports: [HeaderComponent, AddUpdateWeightComponent, CustomInputComponent],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
