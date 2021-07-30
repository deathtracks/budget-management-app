import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { Expense } from 'src/app/class/data/expense';
import { Month } from 'src/app/class/data/month';
import { AddExpenseComponent } from 'src/app/expense/add-expense/add-expense.component';
import { EditExpenseComponent } from 'src/app/expense/edit-expense/edit-expense.component';
import { MonthService } from 'src/app/services/data/month.service';
import { UserInfoService } from 'src/app/services/data/user-info.service';
import { SingleMonthDetailComponent } from '../single-month-detail/single-month-detail.component';

@Component({
  selector: 'app-single-month',
  templateUrl: './single-month.component.html',
  styleUrls: ['./single-month.component.scss'],
})
export class SingleMonthComponent implements OnInit,OnDestroy {
  @Input() singleMonth: Month;
  public userCategory;

  bars: any;
  private userSub: Subscription;
  constructor(
    private modalController: ModalController,
    private month: MonthService,
    private alertController: AlertController,
    private user: UserInfoService
  ) { }

  ngOnInit() {
    this.userSub = this.user.userInfo.subscribe(
      value =>this.userCategory=value.settings.categorie);
    this.user.updateInfo(false);
    this.initBar();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  initBar(){
    const bar = document.querySelectorAll('#prog-bar > .progress-bar')[0] as HTMLElement;
    bar.style.width = `${100*this.singleMonth.getTotal()/this.singleMonth.getBudget()}%`;
  }

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

  public async onDeleteExpense(expense: Expense){
    const alert = await this.alertController.create({
      header : 'Confirm',
      message : 'Are you sure you want to delete this expense ?',
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text : 'OK',
          handler: ()=> this.month.deleteOneExpense(this.singleMonth,expense)
        }
      ]
    });
    await alert.present();
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

  public async onEndMonth(){
    const alert = await this.alertController.create({
      header: 'Confirm',
      message : 'Are you sure you want to end this month ? You will not be able to make any modification after',
      buttons : [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text:'OK',
          handler: () => this.month.endOneMonth(this.singleMonth)
        }
      ]
    });
    return await alert.present();
  }

  public async onDetail(){
    const modal = await this.modalController.create({
      component : SingleMonthDetailComponent,
      componentProps:{
        singleMonth: this.singleMonth
      }
    });
    return await modal.present();
  }

}
