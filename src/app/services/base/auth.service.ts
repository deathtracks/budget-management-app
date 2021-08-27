import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/app/tools/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Subject<firebase.User> = new Subject<firebase.User>();

  private currentUser: firebase.User;
  private db: firebase.firestore.Firestore;
  constructor(
    private router: Router,
    private error: ErrorHandlingService
  ) {
    this.db = firebase.firestore();
    firebase.auth().onAuthStateChanged(
      (user) =>{
        if(user){
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
    )
    .catch(err =>{
      console.log(err);
      this.error.showError('createUser','auth.service',err.message);
    });
  }

  public updateEmail(email: string,password: string){
    return this.logInUser(this.currentUser.email,password)
    .then(authCred =>this.currentUser.updateEmail(email))
    .catch(err =>{
      console.log(err);
      this.error.showError('updateEmail','auth.service',err.message);
    });
  }

  public updatePassword(oldpassword: string,password: string){
    return this.logInUser(this.currentUser.email,oldpassword)
    .then(authCred=>this.currentUser.updatePassword(password))
    .catch(err =>{
      console.log(err);
      this.error.showError('updatePassword','auth.service',err.message);
    });
  }

  public logInUser(email: string, password: string){
    console.log('trying to log the user');
    return firebase.auth().signInWithEmailAndPassword(email,password)
    .then(userCred => userCred.credential)
    .catch(err =>{
      console.log(err);
      this.error.showError('logInUser','auth.service',err.message);
    });
  }

  public logOutUser() {
    firebase.auth().signOut()
    .then(() =>{
      this.router.navigate(['connexion']);
    })
    .catch(err =>{
      console.log(err);
      this.error.showError('logOutUser','auth.service',err.message);
    });
  }

  private createUserData(uid: string,email: string){
    this.db.collection('users').doc(uid).set({
      email,
      months: []
    })
    .then(
      result => console.log(result)
    )
    .catch(err =>{
      console.log(err);
      this.error.showError('createUserDate','auth.service',err.message);
    });
  }

}


