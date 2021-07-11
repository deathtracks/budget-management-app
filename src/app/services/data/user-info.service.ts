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
    this.getUserInfo(uid)
    .then(
      data =>{
        data.months.push(monthId);
        this.writeUserInfo(uid,data);
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
