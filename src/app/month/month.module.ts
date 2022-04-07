import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleMonthComponent } from './single-month/single-month.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MonthRoutingModule } from './month-routing.module';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ExtraModule } from '../extra/extra.module';
import { SectionElComponent } from './section-el/section-el.component';
import { ExpenseElComponent } from './expense-el/expense-el.component';
import { CloseMonthComponent } from './close-month/close-month.component';



@NgModule({
  declarations: [
    SingleMonthComponent,
    AddExpenseComponent,
    SectionElComponent,
    ExpenseElComponent,
    CloseMonthComponent
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
