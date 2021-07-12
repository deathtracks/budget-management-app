import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.monthSub = this.months.months.subscribe(
      value =>{
        this.monthList = value;
      }
    );
    this.months.getMonthOfUser(this.auth.getUserUID());
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

  public onDelete(id: string){
    this.months.removeMonth(id);
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
