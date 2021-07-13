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
      this.userInfo.addMonthId(this.auth.getUserUID(),docRef.id)
      .then( value => this.getAllMonthsOfUser(this.auth.getUserUID()));
    })
    .catch(err => console.log(err));
  }

  public removeMonth(monthId: string){
    return this.db.collection('months').doc(monthId).delete()
    .then( () =>this.userInfo.removeMonthId(this.auth.getUserUID(),monthId)
      .then(() => {
        this.getAllMonthsOfUser(this.auth.getUserUID());
      })
    )
    .catch(err => console.log(err));
  }

  public addOneExpense(month: Month,name: string, amount: number, date: Date){
    return this.expense.createNewExpense(name,amount,date)
    .then( newExpense =>{
      month.addOneExpense(newExpense);
      return this.updateOneMonth(month);
    })
    .catch(err => console.log(err));
  }

  public deleteOneExpense(month: Month, expense: Expense){
    return this.expense.deleteOneExpense(expense.getId())
    .then(() =>{
      month.removeOneExpense(expense);
      return this.updateOneMonth(month);
    })
    .catch(err => console.log(err));
  }



  public getMonthOfUser(uid: string){
    if(uid && uid.length>0){
      this.getAllMonthsOfUser(uid);
    }
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
          monthData.budget
        );
        monthData.expenses.forEach(expenseId =>{
          this.expense.getOneExpense(expenseId)
          .then(loadedExpense => {
            if(loadedExpense){
              loadedMonth.addOneExpense(loadedExpense);
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
    })
    .catch(err => console.log(err));
  }

  private updateOneMonth(month: Month){
    return this.db.collection('months').doc(month.getId()).set(month.getObject());
  }

}
