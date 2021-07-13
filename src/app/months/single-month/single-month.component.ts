import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Month } from 'src/app/class/data/month';
import { AddExpenseComponent } from 'src/app/expense/add-expense/add-expense.component';

@Component({
  selector: 'app-single-month',
  templateUrl: './single-month.component.html',
  styleUrls: ['./single-month.component.scss'],
})
export class SingleMonthComponent implements OnInit {
  @Input() singleMonth: Month;

  constructor(
    private modalController: ModalController
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

}
