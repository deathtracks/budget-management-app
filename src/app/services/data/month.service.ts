import { Injectable, OnDestroy } from '@angular/core';
import firebase from 'firebase/app';
import { Subject, Subscription } from 'rxjs';
import { Expense } from 'src/app/class/data/expense';
import { Month } from 'src/app/class/data/month';
import { AuthService } from '../base/auth.service';
import { ExpenseService } from './expense.service';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class MonthService implements OnDestroy{
  public months: Subject<Month[]> = new Subject<Month[]>();

  private monthList: Month[] = [];
  private authSub: Subscription;
  private db: firebase.firestore.Firestore;

  constructor(
    private auth: AuthService,
    private expense: ExpenseService,
    private userInfo: UserInfoService
    ) {
    this.db = firebase.firestore();
    this.authSub = this.auth.user.subscribe(
      userCred =>{
        if(userCred){
          this.monthList = [];
          this.getAllMonthsOfUser(userCred.uid);
        } else {
          this.monthList = [];
          this.updateMonths();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  public updateMonths(){
    this.months.next(this.monthList);
  }

  public createMonth(start: Date,end: Date,budget: number){
    const newMonth = new Month(undefined,start,end,budget);
    return this.db.collection('months').add(newMonth.getObject())
    .then(docRef =>{
      this.userInfo.addMonthId(docRef.id)
      .then( value => this.getAllMonthsOfUser(this.auth.getUserUID()));
    })
    .catch(err => console.log(err));
  }

  public deleteOneMonth(month: Month){
    month.expenses.forEach(e => this.expense.deleteOneExpense(e.getId()));
    return this.db.collection('months').doc(month.getId()).delete()
    .then(() =>this.userInfo.removeMonthId(month.getId())
      .then(() => {
        this.getAllMonthsOfUser(this.auth.getUserUID());
      })
    )
    .catch(err => console.log(err));
  }

  public addOneExpense(month: Month,name: string, amount: number, date: Date,category: number){
    if(!month.ended()){
      return this.expense.createNewExpense(name,amount,date,category)
      .then( newExpense =>{
        month.addOneExpense(newExpense);
        return this.updateOneMonth(month);
      })
      .catch(err => console.log(err));
    }
  }

  public deleteOneExpense(month: Month, expense: Expense){
    if(!month.ended()){
      return this.expense.deleteOneExpense(expense.getId())
      .then(() =>{
        month.removeOneExpense(expense);
        return this.updateOneMonth(month);
      })
      .catch(err => console.log(err));
    }
  }

  public getMonthOfUser(uid: string){
    if(uid && uid.length>0 && this.monthList.length<1){
      this.getAllMonthsOfUser(uid);
    }
  }

  public endOneMonth(month: Month){
    month.end();
    this.updateOneMonth(month);
  }

  private getOneMonth(monthId){
    return this.db.collection('months').doc(monthId).get()
    .then( data =>{
      const monthData = data.data();
      if(monthData){
        const loadedMonth = new Month(
          monthId,
          new Date(monthData.start.seconds*1000),
          new Date(monthData.end.seconds*1000),
          monthData.budget,
          monthData.isEnded
        );
        monthData.expenses.forEach(expenseId =>{
          this.expense.getOneExpense(expenseId)
          .then(loadedExpense => {
            if(loadedExpense){
              loadedMonth.addOneExpense(loadedExpense,true);
            }
          });
        });
        return loadedMonth;
      } else {
        return undefined;
      }
    })
    .catch(err => console.log(err));
  }

  private getAllMonthsOfUser(userUID: string){
    this.monthList = [];
    this.db.collection('users').doc(userUID).get()
    .then(data =>{
      const monthIdList = data.data().months;
      this.monthList = [];
      for(const monthId of monthIdList){
        this.getOneMonth(monthId)
        .then(month =>{
          if(month){
            this.monthList.push(month);
            this.updateMonths();
          }
        });
      }
      this.updateMonths();
    })
    .catch(err => console.log(err));
  }

  private updateOneMonth(month: Month){
    return this.db.collection('months').doc(month.getId()).set(month.getObject());
  }

}
