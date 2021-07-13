import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { Expense } from 'src/app/class/data/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private db: firebase.firestore.Firestore;
  constructor() {
    this.db = firebase.firestore();
   }

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

  public createNewExpense(name: string, amount: number, date: Date){
    const newExpense = new Expense(undefined,name,amount,date);
    return this.db.collection('expenses').add(newExpense.getObject())
    .then(docRef =>{
      newExpense.setId(docRef.id);
      return newExpense;
    });
  }

  public deleteOneExpense(expenseId: string){
    return this.db.collection('expenses').doc(expenseId).delete();
  }
}
