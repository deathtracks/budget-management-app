import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { getAuth, createUserWithEmailAndPassword, Auth, UserCredential, signInWithRedirect, getRedirectResult, User} from 'firebase/auth';
import { signInWithEmailAndPassword, signOut, GoogleAuthProvider } from 'firebase/auth';
import { UserService } from '../data/user.service';
import { UserObject } from 'src/app/class/base/user-object';
import { FirebaseError } from 'firebase/app';
import * as firebaseui from 'firebaseui';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth: Subject<boolean>;

  private isUserAuth: boolean;
  private auth: Auth;
  private provider: GoogleAuthProvider;
  private fireBaseUser: User;

  constructor(
    private userService: UserService
  ) {
    this.auth = getAuth();
    this.isAuth = new Subject();
    this.provider = new GoogleAuthProvider();
  }

  public signIn(u: UserObject, password: string, repeat: string): Promise<boolean | Error> {
    return new Promise<boolean | Error>((resolve,rejects)=>{
      if(password===repeat){
        createUserWithEmailAndPassword(this.auth, u.email,password)
        .then((userCred: UserCredential)=>{
          this.fireBaseUser = userCred.user;
          this.userService.createOne(u)
          .then(()=>{
            this.isUserAuth = true;
            this.publish();
            resolve(true);
          })
          .catch((err)=>rejects(err));
        })
        .catch((err)=>{
          const error = this.handleError(err);
          if(error instanceof FirebaseError){
            rejects(error);
          } else {
            resolve(error);
          }
        });
      } else {
        rejects(new Error('Passwords don\'t match'));
      }
    });
  }

  public signInWithGoogle(): Promise<boolean>{
    return new Promise<boolean>(async (resolve,rejects)=>{
      await signInWithRedirect(this.auth,this.provider);
      getRedirectResult(this.auth)
      .then((result: UserCredential)=>{
        const cred = GoogleAuthProvider.credentialFromResult(result);
        const email = result.user.email;
        this.userService.getOne(email)
        .then((u)=>{
          if(u){
            this.isUserAuth = true;
            this.publish();
            resolve(true);
          } else {
            u = new UserObject(email,result.user.displayName);
            this.userService.createOne(u)
            .then(()=>{
              this.isUserAuth = true;
              this.publish();
              resolve(true);
            })
            .catch((err)=>{
              rejects(err);
            });
          }
        });
      })
      .catch();
    });
  }

  public logIn(email: string, password: string): Promise<boolean | Error>{
    return new Promise<boolean | Error>((resolve,rejects)=>{
      signInWithEmailAndPassword(this.auth,email,password)
      .then((userCred: UserCredential)=>{
        const user = userCred.user;
        this.userService.getOne(email)
        .then(()=>{
          this.isUserAuth = true;
          this.publish();
          resolve(true);
        })
        .catch(err=>{
          console.log(err);
          rejects(err);
        });
      })
      .catch((err:FirebaseError)=>{
        const error = this.handleError(err);
        if(error instanceof FirebaseError){
          rejects(error);
        } else {
          resolve(error);
        }
      });
    });
  }

  public logOut(): Promise<boolean>{
    return new Promise<boolean>((resolve,rejects)=>{
      signOut(this.auth)
      .then(()=>{
        this.isUserAuth = false;
        this.publish();
        resolve(true);
      })
      .catch((err)=>rejects(err));
    });
  }

  public isLogIn(): boolean{
    this.publish();
    return this.isUserAuth===true;
  }

  private publish(): void{
    this.isAuth.next(this.isUserAuth);
  }

  private handleError(err: FirebaseError): FirebaseError | Error{
    let r;
    switch(err.code) {
      case "auth/user-not-found":{
        r = new Error('Invalid email or password');
      }
      default:{
        r = err;
      }
    }
    return r;
  }
}


