import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { Expense } from 'src/app/class/data/expense';
import { ErrorHandlingService } from 'src/app/tools/error-handling.service';
import { AuthService } from '../base/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private db: firebase.firestore.Firestore;
  constructor(
    private auth: AuthService,
    private error: ErrorHandlingService
  ) {
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
            expenseData.owner,
            expenseData.name,
            expenseData.amount,
            new Date(expenseData.date.seconds*1000),
            expenseData.category
          );
        } else {
          return undefined;
        }
      }
    )
    .catch(err =>{
      console.log(err);
      this.error.showError('getOneExpense','expense.service',err.message);
    });
  }

  public createNewExpense(name: string, amount: number, date: Date,category: number){
    const newExpense = new Expense(undefined,this.auth.getUserUID(),name,amount,date,category);
    return this.db.collection('expenses').add(newExpense.getObject())
    .then(docRef =>{
      newExpense.setId(docRef.id);
      return newExpense;
    })
    .catch(err =>{
      console.log(err);
      this.error.showError('createNewExpense','expense.service',err.message);
    });
  }

  public deleteOneExpense(expenseId: string){
    return this.db.collection('expenses').doc(expenseId).delete()
    .catch(err =>{
      console.log(err);
      this.error.showError('deleteOneExpense','expense.service',err.message);
    });
  }

  public editOneExpense(editedExpense: Expense){
    return this.db.collection('expenses').doc(editedExpense.getId()).set(editedExpense.getObject())
    .catch(err =>{
      console.log(err);
      this.error.showError('editOneExpense','expense.service',err.message);
    });
  }
}
