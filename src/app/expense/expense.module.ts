import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { ToolsModule } from '../tools/tools.module';



@NgModule({
  declarations: [
    AddExpenseComponent,
    EditExpenseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ToolsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    AddExpenseComponent,
    EditExpenseComponent
  ]
})
export class ExpenseModule { }
