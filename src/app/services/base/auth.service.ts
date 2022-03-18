import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { getAuth, createUserWithEmailAndPassword, Auth, UserCredential, signInWithRedirect, getRedirectResult} from 'firebase/auth';
import { signInWithEmailAndPassword, signOut, GoogleAuthProvider } from 'firebase/auth';
import { User } from 'src/app/class/base/user';
import { UserService } from '../data/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth: Subject<boolean>;

  private isUserAuth: boolean;
  private auth: Auth;
  private provider: GoogleAuthProvider;

  constructor(
    private userService: UserService
  ) {
    this.auth = getAuth();
    this.provider = new GoogleAuthProvider();
  }

  public signIn(u: User, password: string, repeat: string): Promise<boolean> {
    return new Promise<boolean>((resolve,rejects)=>{
      if(password===repeat){
        createUserWithEmailAndPassword(this.auth, u.email,password)
        .then((userCred: UserCredential)=>{
          const user = userCred.user;
          this.userService.createOne(u)
          .then(()=>{
            this.isUserAuth = true;
            this.publish();
            resolve(true);
          })
          .catch((err)=>rejects(err));
        })
        .catch((err)=>{
          const errorCode = err.code;
          const errorMessage = err.message;
          //TODO : handle misIdentification.
          rejects(err);
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
            u = new User(email,result.user.displayName,'');
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

  public logIn(email: string, password: string): Promise<boolean>{
    return new Promise<boolean>((resolve,rejects)=>{
      signInWithEmailAndPassword(this.auth,email,password)
      .then((userCred: UserCredential)=>{
        const user = userCred.user;
        this.userService.getOne(email)
        .then(()=>{
          this.isUserAuth = true;
          this.publish();
          resolve(true);
        })
        .catch(err=>rejects(err));
      })
      .catch(err=>rejects(err));
      //TODO : handle misIdentification.
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
}


