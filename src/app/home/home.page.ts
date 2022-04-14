import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Month } from '../class/base/month';
import { Description } from '../extra/floating-btn/floating-btn.component';
import { LoadingScreen } from '../extra/loading-screen';
import { MonthService } from '../services/data/month.service';
import { UserService } from '../services/data/user.service';
import { AddMonthComponent } from './add-month/add-month.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy {
  public name: string;
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
  private loading: LoadingScreen;
  constructor(
    public modalControler: ModalController,
    private loadingCtrl: LoadingController,
    private User: UserService,
    private Months: MonthService,
    private router: Router
  ) {
    this.loading = new LoadingScreen(loadingCtrl);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  async ngOnInit() {
    await this.loading.generateLoading();
    await this.loading.loadingStart();
    this.userSub = this.User.objSub.subscribe((v)=>{
      if(v && v.months){
        this.name = v.name.substring(0,v.name.indexOf(' '));
        this.Months.getAllFromUser(v.email)
        .then(async (m)=>{
          if(m && m.length>0){
            if(!m[0].close){
              this.currentMonth = m.splice(0,1)[0];
            }
            this.monthList = m;
            await this.loading.loadingStop();
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
    modal.onDidDismiss()
    .then(async r =>{
      console.log(r);
      if(r.data){
        await this.loading.loadingStart();
        this.Months.createOne(r.data.month)
        .then((v)=>{
          this.User.publish();
        })
      }
    })
    return await modal.present();
  }

  onAction(name: string){
    if(name==='add'){
      this.presentModal();
    } else if (name==='param'){
      this.router.navigate(['param']);
    }
  }
}
