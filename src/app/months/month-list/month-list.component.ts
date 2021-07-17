import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Month } from 'src/app/class/data/month';
import { AuthService } from 'src/app/services/base/auth.service';
import { MonthService } from 'src/app/services/data/month.service';
import { AddMonthComponent } from '../add-month/add-month.component';
import { SingleMonthComponent } from '../single-month/single-month.component';

@Component({
  selector: 'app-month-list',
  templateUrl: './month-list.component.html',
  styleUrls: ['./month-list.component.scss'],
})
export class MonthListComponent implements OnInit,OnDestroy {
  public monthList: Month[];

  private monthSub: Subscription;
  constructor(
    private months: MonthService,
    private auth: AuthService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.monthSub = this.months.months.subscribe(
      value =>{
        this.monthList = value;
      }
    );
    this.months.updateMonths();
  }

  ngOnDestroy(): void {
    this.monthSub.unsubscribe();
  }

  public async onAddMonth(){
    const modal = await this.modalController.create({
      component : AddMonthComponent
    });
    return await modal.present();
  }

  public async onDelete(month: Month){
    const alert = await this.alertController.create({
      header:'Confirm',
      message:'Are you sure you want to delete this month?',
      buttons:[
        {
          text:'Cancel',
          role:'cancel'
        },
        {
          text:'OK',
          handler:() =>this.months.deleteOneMonth(month)
        }
      ]
    });
    await alert.present();
  }

  public async onOpenMonth(m: Month){
    const modal = await this.modalController.create({
      component : SingleMonthComponent,
      componentProps: {
        singleMonth:m
      }
    });
    return await modal.present();
  }

}
