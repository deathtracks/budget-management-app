import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { UserInfo } from 'src/app/class/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private db: firebase.firestore.Firestore;
  constructor() {
    this.db = firebase.firestore();
  }

  public addMonthId(uid: string,monthId){
    return this.getUserInfo(uid)
    .then(
      data =>{
        data.months.push(monthId);
        return this.writeUserInfo(uid,data);
      }
    );
  }

  public removeMonthId(uid: string,monthId: string){
    return this.getUserInfo(uid)
    .then(
      data =>{
        data.months = data.months.slice(0,data.months.indexOf(monthId)).concat(data.months.slice(data.months.indexOf(monthId)+1));
        return this.writeUserInfo(uid,data);
      }
    );
  }

  private getUserInfo(uid: string): Promise<UserInfo>{
    if(uid && uid.length>0){
      return this.db.collection('users').doc(uid).get()
      .then( value =>new UserInfo(value.data()));
    }
  }

  private writeUserInfo(uid: string,data: UserInfo){
    if(uid && uid.length>0){
      return this.db.collection('users').doc(uid).set(data.getData());
    }
  }

}
