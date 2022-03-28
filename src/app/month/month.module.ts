import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleMonthComponent } from './single-month/single-month.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MonthRoutingModule } from './month-routing.module';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ExtraModule } from '../extra/extra.module';



@NgModule({
  declarations: [
    SingleMonthComponent,
    AddExpenseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MonthRoutingModule,
    ExtraModule
  ]
})
export class MonthModule { }
