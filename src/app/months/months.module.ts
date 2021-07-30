import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMonthComponent } from './add-month/add-month.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MonthRoutingModule } from './months-routing.module';
import { MonthListComponent } from './month-list/month-list.component';
import { SingleMonthComponent } from './single-month/single-month.component';
import { ExpenseModule } from '../expense/expense.module';
import { ToolsModule } from '../tools/tools.module';
import { SingleMonthDetailComponent } from './single-month-detail/single-month-detail.component';



@NgModule({
  declarations: [
    AddMonthComponent,
    MonthListComponent,
    SingleMonthComponent,
    SingleMonthDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseModule,
    ToolsModule,
    ReactiveFormsModule,
    MonthRoutingModule
  ],
  exports: [
    AddMonthComponent
  ]
})
export class MonthsModule { }
