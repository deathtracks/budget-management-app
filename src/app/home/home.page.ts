import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Month } from '../class/base/month';
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

  private main: HTMLDivElement;
  private btn1: HTMLDivElement;
  private btn2: HTMLDivElement;
  private menuDisplay: boolean;
  private userSub: Subscription;
  constructor(
    public modalControler: ModalController,
    private animationCtrl: AnimationController,
    private User: UserService,
    private Months: MonthService
  ) { }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit() {
    this.userSub = this.User.objSub.subscribe((v)=>{
      if(v && v.months){
        v.months.forEach(monthId=>{
          this.Months.getOne(monthId)
          .then((m)=>{
            if(m) this.monthList.push(m);
          })
          .catch(err=>{throw err});
        })
        this.monthList.sort((a,b)=>{
          if(a.getDate()>b.getDate()) return 1;
          if(a.getDate()<b.getDate()) return -1;
          else 0;
        })
      }
    })
    this.User.publish();
    this.main = document.getElementById('main-btn') as HTMLDivElement;
    this.btn1 = document.getElementById('float-btn-1') as HTMLDivElement;
    this.btn2 = document.getElementById('float-btn-2') as HTMLDivElement;
  }

  async presentModal() {
    const modal = await this.modalControler.create({
      component: AddMonthComponent,
      breakpoints: [0, 0.40],
      initialBreakpoint: 0.40
    });
    return await modal.present();
  }

  showBtn(){
    this.menuDisplay = !this.menuDisplay;
    if(this.menuDisplay){
      this.main.classList.add('rotate');
      this.btn1.classList.add('raise-1');
      this.btn2.classList.add('raise-2');
    } else {
      this.main.classList.remove('rotate');
      this.btn1.classList.remove('raise-1');
      this.btn2.classList.remove('raise-2');
    }
    
  }

}
