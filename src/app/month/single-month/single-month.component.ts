import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Month } from 'src/app/class/base/month';
import { Section } from 'src/app/class/base/section';
import { MonthService } from 'src/app/services/data/month.service';
import { UserService } from 'src/app/services/data/user.service';
import { AddExpenseComponent } from '../add-expense/add-expense.component';

@Component({
  selector: 'app-single-month',
  templateUrl: './single-month.component.html',
  styleUrls: ['./single-month.component.scss'],
})
export class SingleMonthComponent implements OnInit,OnDestroy {
  public month: Month;
  public sectionList: Section[];

  private main: HTMLDivElement;
  private btn1: HTMLDivElement;
  private btn2: HTMLDivElement;
  private menuDisplay: boolean;
  private monthSub: Subscription;
  private userSub: Subscription;
  constructor(
    public modalControler: ModalController,
    private monthService: MonthService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }
  ngOnDestroy(): void {
    this.monthSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.main = document.getElementById('main-btn') as HTMLDivElement;
    this.btn1 = document.getElementById('float-btn-1') as HTMLDivElement;
    this.btn2 = document.getElementById('float-btn-2') as HTMLDivElement;
    this.monthSub = this.monthService.objSub.subscribe(v=>{
      if(v) this.month = v;
    });
    this.userSub = this.userService.objSub.subscribe(u=>{
      if(u) this.sectionList = u.sections;
    })
    this.userService.publish();
    this.monthService.getOne(id)
    .then((v)=>{
      if(v) this.month = v;
    })
  }

  async presentModal() {
    const modal = await this.modalControler.create({
      component: AddExpenseComponent,
      breakpoints: [0, 0.5],
      initialBreakpoint: 0.5
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
