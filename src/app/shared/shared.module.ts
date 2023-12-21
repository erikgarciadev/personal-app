import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { AddUpdateWeightComponent } from './components/add-update-weight/add-update-weight.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent } from './components/finance/badge/badge.component';
import { FinanceDailyComponent } from './components/finance/finance-daily/finance-daily.component';
import { AddUpdateDailyComponent } from './components/finance/finance-daily/add-update-daily/add-update-daily.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AddUpdateWeightComponent,
    CustomInputComponent,
    BadgeComponent,
    FinanceDailyComponent,
    AddUpdateDailyComponent,
  ],
  exports: [
    HeaderComponent,
    AddUpdateWeightComponent,
    CustomInputComponent,
    BadgeComponent,
    FinanceDailyComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
