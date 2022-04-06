import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Month } from '../class/base/month';
import { Description } from '../extra/floating-btn/floating-btn.component';
import { MonthService } from '../services/data/month.service';
import { UserService } from '../services/data/user.service';
import { AddMonthComponent } from './add-month/add-month.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy {
  public monthList: Month[];
  public currentMonth: Month;
  public Btn: Description[] = [
    {
      name: 'add',
      icon: 'add-outline'
    },
    {
      name: 'param',
      icon: 'options-outline'
    }
  ];

  private userSub: Subscription;
  constructor(
    public modalControler: ModalController,
    private User: UserService,
    private Months: MonthService
  ) { }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit() {
    this.userSub = this.User.objSub.subscribe((v)=>{
      if(v && v.months){
        this.Months.getAllFromUser(v.email)
        .then((m)=>{
          if(m && m.length>0){
            this.currentMonth = m[0];
            if(m.length>1){
              this.monthList = m.slice(1);
            }
          }
        })
      }
    })
    this.User.publish();
  }

  async presentModal() {
    const modal = await this.modalControler.create({
      component: AddMonthComponent,
      breakpoints: [0, 0.40],
      initialBreakpoint: 0.40
    });
    return await modal.present();
  }

  onAction(name: string){
    if(name==='add'){
      this.presentModal();
    } else if (name==='param'){
      console.log('option page');
    }
  }
}
