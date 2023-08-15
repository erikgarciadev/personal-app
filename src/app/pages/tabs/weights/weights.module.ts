import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeightsPageRoutingModule } from './weights-routing.module';

import { WeightsPage } from './weights.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeightsPageRoutingModule,
    SharedModule,
  ],
  declarations: [WeightsPage],
})
export class WeightsPageModule {}
