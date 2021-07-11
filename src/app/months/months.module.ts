import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMonthComponent } from './add-month/add-month.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MonthRoutingModule } from './months-routing.module';
import { MonthListComponent } from './month-list/month-list.component';



@NgModule({
  declarations: [
    AddMonthComponent,
    MonthListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MonthRoutingModule
  ],
  exports: [
    AddMonthComponent
  ]
})
export class MonthsModule { }
