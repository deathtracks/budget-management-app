import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Subject<firebase.User> = new Subject<firebase.User>();

  private currentUser: firebase.User;
  private db: firebase.firestore.Firestore;

  constructor(
    private router: Router
  ) {
    this.db = firebase.firestore();
    firebase.auth().onAuthStateChanged(
      (user) =>{
        if(user){
          console.log('user connected');
          this.currentUser = user;
          this.updateUser();
        }else{
          this.currentUser = null;
          this.updateUser();
        }
      }
    );
  }

  public isUserLogedIn(): boolean{
    if(this.currentUser){
      return true;
    } else {
      return false;
    }
  }

  public getUserUID(): string{
    if(this.currentUser){
      return this.currentUser.uid;
    } else {
      return null;
    }
  }

  public updateUser(){
    console.log('update user');
    this.user.next(this.currentUser);
  }

  public createUser(email: string, password: string){
    return firebase.auth().
    createUserWithEmailAndPassword(email,password)
    .then(
      result =>{
        const userUid = result.user.uid;
        this.createUserData(userUid,result.user.email);
      }
    );
  }

  public logInUser(email: string, password: string){
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }

  private createUserData(uid: string,email: string){
    this.db.collection('users').doc(uid).set({
      email,
      months: []
    })
    .then(
      result => console.log(result)
    )
    .catch(error => {
      console.log(error.message); //TODO : manage error
  });
  }

}


