import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Expense } from 'src/app/class/base/expense';
import { Month } from 'src/app/class/base/month';
import { Objectif } from 'src/app/class/base/objectif';
import { Section } from 'src/app/class/base/section';
import { Description } from 'src/app/extra/floating-btn/floating-btn.component';
import { MonthService } from 'src/app/services/data/month.service';
import { UserService } from 'src/app/services/data/user.service';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { CloseMonthComponent } from '../close-month/close-month.component';

@Component({
  selector: 'app-single-month',
  templateUrl: './single-month.component.html',
  styleUrls: ['./single-month.component.scss'],
})
export class SingleMonthComponent implements OnInit,OnDestroy {
  public month: Month;
  public sectionList: Section[];
  public floatingBtn : Description[] = [
    {
      name: 'close',
      icon: 'checkmark-done-outline'
    },
    {
      name: 'add',
      icon: 'add-outline'
    }
  ]

  private monthSub: Subscription;
  private userSub: Subscription;
  private objList: Objectif[];
  constructor(
    public modalControler: ModalController,
    public alertControler: AlertController,
    private monthService: MonthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnDestroy(): void {
    this.monthSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.monthSub = this.monthService.objSub.subscribe(v=>{
      if(v) this.month = v;
    });
    this.userSub = this.userService.objSub.subscribe(u=>{
      if(u) {
        this.sectionList = u.sections;
        this.objList = u.objectifs;
      }
    })
    this.userService.publish();
    this.monthService.getOne(id)
    .then((v)=>{
      if(v) this.month = v;
    })
  }

  async showExpenseModal(e?: Expense, i?:number) {
    if(!this.month.close){
      const modal = await this.modalControler.create({
        component: AddExpenseComponent,
        breakpoints: [0, 0.5],
        initialBreakpoint: 0.5,
        componentProps : {
          'minDate': this.month.startDate,
          'maxDate': this.month.endDate,
          'sectionList': this.sectionList,
          'editedExpense': e,
          'editedExpenseIndex':i
        }
      });
      return await modal.present();
    }
  }

  async showCloseModal(){
    if(!this.month.close){
      const modal = await this.modalControler.create({
        component: CloseMonthComponent,
        breakpoints: [0,0.3],
        initialBreakpoint: 0.3,
        componentProps:{
          'singleMonth':this.month
        }
      })
      modal.onDidDismiss()
      .then((d)=>{
        console.log(d);
        if(d.data){
          console.log(d.data.selectedObj);
          const save = this.month.budget - this.month.getTotal();
          this.objList[d.data.selectedObj].addSave(save,new Date());
          console.log(this.objList);
          this.userService.editObjectif(this.objList[d.data.selectedObj],d.data.selectedObj)
          .then((v)=>{
            console.log('done');
            this.monthService.endMonth()
            .then((v)=>{
              this.router.navigate(['home']);
            })
            .catch(err=>{throw err})
          })
          .catch((err)=>{throw err});
        }
      })
      return await modal.present();
    }
  }

  public async onDelete(index:number) {
    if(!this.month.close){
      const confiAlert = await this.alertControler.create({
        header: 'Confirmation',
        message : `Est-vous sur de vouloir supprimer la dépense ${this.month.expenseList[index].name} ?`,
        buttons : [
          {
            text: 'Oui',
            role: 'confirm',
            cssClass : 'btn-dark',
            handler: () =>{
              this.monthService.removeExpense(index)
              .then((v)=>this.monthService.publish())
            }
          },
          {
            text: 'Non',
            role: 'Cancel',
            cssClass : 'btn-secondary'
          }
        ]
      })
      await confiAlert.present();
    }
  }

  public onEdit(index: number): void{
    this.showExpenseModal(this.month.expenseList[index],index);
  }

  public onAction(name: string){
    if(name==='add'){
      this.showExpenseModal();
    } else if(name==='close'){
      this.showCloseModal();
    }
  }

}
