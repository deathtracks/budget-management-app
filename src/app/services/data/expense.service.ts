import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { Expense } from 'src/app/class/data/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private db: firebase.firestore.Firestore;
  constructor() { }

  public getOneExpense(expenseId: string){
    return this.db.collection('expenses').doc(expenseId).get()
    .then(
      data =>{
        const expenseData = data.data();
        if(expenseData){
          return new Expense(
            expenseId,
            expenseData.name,
            expenseData.amount,
            new Date(expenseData.date.seconds*1000)
          );
        } else {
          return undefined;
        }
      }
    )
    .catch(err => console.log(err));
  }
}
