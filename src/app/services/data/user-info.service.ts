import { Injectable, OnDestroy } from '@angular/core';
import firebase from 'firebase/app';
import { Subject, Subscription } from 'rxjs';
import { UserInfo } from 'src/app/class/user-info';
import { AuthService } from '../base/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService implements OnDestroy {
  public userInfo = new Subject<UserInfo>();

  private loadedInfo: UserInfo;
  private db: firebase.firestore.Firestore;
  private authSub: Subscription;
  constructor(
    private auth: AuthService
  ) {
    this.db = firebase.firestore();
    this.authSub = this.auth.user.subscribe(
      userCred =>{
        if(userCred){
          this.getUserInfo(userCred.uid);
        } else {
          this.loadedInfo = undefined;
          this.updateInfo();
        }
      }
    );
    this.auth.updateUser();
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  public updateInfo(doesUpdate: boolean=true){
    if(this.loadedInfo && doesUpdate){
      this.writeUserInfo();
    }
    this.userInfo.next(this.loadedInfo);
  }

  public updateEmail(newEmail: string,password: string){
    return this.auth.updateEmail(newEmail,password)
    .then(()=>{
      this.loadedInfo.email = newEmail;
      this.updateInfo();
    });
  }

  public addMonthId(monthId: string){
      this.loadedInfo.months.push(monthId);
      this.updateInfo();
      return this.writeUserInfo();
  }

  public removeMonthId(monthId: string){
    return new Promise<void>((next) => {
      this.loadedInfo.months = this.loadedInfo.months.slice(0, this.loadedInfo.months.indexOf(monthId))
        .concat(this.loadedInfo.months.slice(this.loadedInfo.months.indexOf(monthId) + 1));
      this.updateInfo();
      next();
    });
  }

  public addCategory(name: string){
    return new Promise<void>((next)=>{
      this.loadedInfo.settings.categorie.push(name);
      this.updateInfo();
      next();
    });
  }

  public removeCategory(index: number){
    return new Promise<void>((next)=>{
      this.loadedInfo.settings.removeCategory(index);
      this.updateInfo();
      next();
    });
  }

  public editCategory(index: number, newName: string){
    return new Promise<void>((next)=>{
      this.loadedInfo.settings.categorie[index]= newName;
      this.updateInfo();
      next();
    });
  }

  private getUserInfo(uid: string): Promise<void>{
    if(uid && uid.length>0){
      return this.db.collection('users').doc(uid).get()
      .then( value =>{
        this.loadedInfo = new UserInfo(uid,value.data());
        this.updateInfo();
      });
    }
  }

  private writeUserInfo(){
    return this.db.collection('users').doc(this.loadedInfo.getUID()).set(this.loadedInfo.getData())
    .catch(err =>console.log(err));
  }
}
