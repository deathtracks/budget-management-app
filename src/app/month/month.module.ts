import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleMonthComponent } from './single-month/single-month.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MonthRoutingModule } from './month-routing.module';



@NgModule({
  declarations: [
    SingleMonthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MonthRoutingModule
  ]
})
export class MonthModule { }
