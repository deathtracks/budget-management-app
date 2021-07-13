import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Expense } from 'src/app/class/data/expense';
import { Month } from 'src/app/class/data/month';
import { AddExpenseComponent } from 'src/app/expense/add-expense/add-expense.component';
import { EditExpenseComponent } from 'src/app/expense/edit-expense/edit-expense.component';
import { MonthService } from 'src/app/services/data/month.service';

@Component({
  selector: 'app-single-month',
  templateUrl: './single-month.component.html',
  styleUrls: ['./single-month.component.scss'],
})
export class SingleMonthComponent implements OnInit {
  @Input() singleMonth: Month;

  constructor(
    private modalController: ModalController,
    private month: MonthService
  ) { }

  ngOnInit() {}

  public async onAddExpense(){
    const modal = await this.modalController.create({
      component : AddExpenseComponent,
      componentProps:{
        month : this.singleMonth
      }
    });
    return await modal.present();
  }

  public onDismiss(){
    this.modalController.dismiss();
  }

  public onDeleteExpense(expense: Expense){
    this.month.deleteOneExpense(this.singleMonth,expense);
  }

  public async onEditExpense(expense: Expense){
    const modal = await this.modalController.create({
      component: EditExpenseComponent,
      componentProps: {
        editedExpense: expense
      }
    });
    return await modal.present();
  }

}
