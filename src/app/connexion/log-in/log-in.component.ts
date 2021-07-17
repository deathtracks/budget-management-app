import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/base/auth.service';
import { LoadingPageComponent } from 'src/app/tools/loading-page/loading-page.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit,OnDestroy {
  public logInForm: FormGroup;
  public error= false;

  private possibleErrorCode: string[] = [
    'auth/invalid-email',
    'auth/user-not-found',
    'auth/wrong-password'
  ];
  private authSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.authSub = this.auth.user.subscribe(
      userCred =>{
        if(userCred){
          this.router.navigate(['']);
        }
      }
    );
    this.logInForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  async showLoading(){
    const modal = await this.modalController.create({
      component: LoadingPageComponent
    });
    return await modal.present();
  }

  dismissLoading(){
    this.modalController.dismiss();
  }

  onLogIn(){
    const formValue = this.logInForm.value;
    this.showLoading();
    this.auth.logInUser(formValue.email,formValue.password)
    .then(
      result =>{
        //It means it's a success
        this.dismissLoading();
        this.router.navigate(['/']);
      }
    ).catch(err =>{
      if(this.possibleErrorCode.includes(err.code)){
        this.error = true;
      } else {
        console.log(err); //TODO : Error management
      }
    });
  }

}
