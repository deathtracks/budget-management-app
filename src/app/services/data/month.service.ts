import { Injectable } from '@angular/core';
import { collection, DocumentData, getDocs, orderBy, query, QuerySnapshot, Timestamp, where } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { Expense } from 'src/app/class/base/expense';
import { Month } from 'src/app/class/base/month';
import { environment } from 'src/environments/environment';
import { ObjectBaseService } from '../base/object-base.service';

@Injectable({
  providedIn: 'root'
})
export class MonthService extends ObjectBaseService<Month> {

  constructor(){
    super();
    this.collection = environment.collection.month;
    this.objListSub = new Subject();
    this.objSub = new Subject();
  }


  public getAllFromUser(user: string): Promise<Month[]>{
    return new Promise<Month[]>((resolve,rejects)=>{
      const q = query(collection(this.db,this.collection),where("user","==",user),orderBy("start"));
      getDocs(q)
      .then((snap: QuerySnapshot<DocumentData>)=>{
        const r: Month[] = [];
        snap.forEach((doc: DocumentData)=>{
          r.push(this.convertToObj(doc.id,doc.data()));
        })
        this.objList = r;
        this.publish();
        resolve(r);
      })
      .catch(err=>rejects(err));
    })
  }


  public addExpense(e: Expense): Promise<boolean | Error>{
    return new Promise<boolean | Error>((resolve,rejects)=>{
      if(!this.obj.close){
        this.obj.expenseList.push(e);
        this.editOne(this.obj)
        .then(()=>resolve(true))
        .catch((err)=>rejects(err));
      } else {
        resolve(false);
      }
    });
  }

  public removeExpense(index: number): Promise<boolean | Error>{
    return new Promise<boolean | Error>((resolve,rejects)=>{
      if(!this.obj.close){
        this.obj.expenseList.slice(index,1);
        this.editOne(this.obj)
        .then(()=>resolve(true))
        .catch((err)=>rejects(err));
      } else {
        resolve(false);
      }
    });
  }

  public editExpense(e: Expense, index: number): Promise<boolean | Error>{
    return new Promise<boolean | Error>((resolve,rejects)=>{
      if(!this.obj.close){
        this.obj.expenseList[index] = e;
        this.editOne(this.obj)
        .then(()=>resolve(true))
        .catch((err)=>rejects(err));
      } else {
        resolve(false);
      }
    });
  }

  public endMonth(): Promise<boolean | Error>{
    return new Promise<boolean | Error>((resolve,rejects)=>{
      this.obj.close = true;
      this.editOne(this.obj)
      .then(()=>resolve(true))
      .catch((err)=>rejects(err));
    });
  }

  protected convertToObj(id: string, data: any): Month {
    const expenses = [];
    if(data.expenseList && data.expenseList.length>0){
      data.expenseList.forEach(e => expenses.push(new Expense(e.name,e.date.toDate(), e.amount, e.section)));
    }
    console.log(data.start.toDate());
    return new Month(
      id,
      data.user,
      data.start.toDate(),
      data.end.toDate(),
      data.budget,
      expenses,
      data.close
      );
  }
  protected publish(): void {
    this.objSub.next(this.obj);
    this.objListSub.next(this.objList);
  }

}
