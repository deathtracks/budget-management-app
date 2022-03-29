import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { AddMonthComponent } from './add-month/add-month.component';
import { MonthListElComponent } from './month-list-el/month-list-el.component';
import { ExtraModule } from '../extra/extra.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExtraModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    AddMonthComponent,
    MonthListElComponent
  ]
})
export class HomePageModule {}
