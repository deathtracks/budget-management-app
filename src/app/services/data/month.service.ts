import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class MonthService {

  constructor() { }


  public writeUserData(userId,name,email,month){
    firebase.database().ref('users/'+userId).set({
      username: name,
      email,
      month
    });
  }
}
