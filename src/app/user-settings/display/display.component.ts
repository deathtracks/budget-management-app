import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserInfo } from 'src/app/class/user-info';
import { AuthService } from 'src/app/services/base/auth.service';
import { UserInfoService } from 'src/app/services/data/user-info.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit,OnDestroy {
  public userInf: UserInfo;
  public updatingEmail: boolean;
  public updatingPassword: boolean;
  public updateEmailForm: FormGroup;
  public updatePasswordForm: FormGroup;
  public errorMessageEmail: string;
  public errorMessagePassword: string;

  private userInfoSub: Subscription;
  private printableError = [
    'auth/email-already-in-use',
    'auth/invalid-email',
    'auth/weak-password'
  ];
  constructor(
    private auth: AuthService,
    private user: UserInfoService,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.userInfoSub = this.user.userInfo
    .subscribe(value =>this.userInf = value);
    this.user.updateInfo(false);
    this.initEmailForm();
    this.initPasswordForm();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your password has been updated',
      duration: 2000
    });
    toast.present();
  }

  initEmailForm(){
    this.updateEmailForm = this.formBuilder.group({
      email: [this.userInf.email,Validators.required],
      password: ['',Validators.required]
    });
  }

  initPasswordForm(){
    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: ['',Validators.required],
      newPassword: ['',Validators.required],
      confirm: ['',Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.userInfoSub.unsubscribe();
  }

  onLogOut(){
    this.auth.logOutUser();
  }

  onUpdateEmail(){
    this.updatingEmail = !this.updatingEmail;
  }

  onUpdatePassword(){
    this.updatingPassword = !this.updatingPassword;
  }

  onValidUpdateEmail(){
    const formValue = this.updateEmailForm.value;
    this.errorMessageEmail = '';
    this.user.updateEmail(formValue.email,formValue.password)
    .then(() =>{
      this.updatingEmail=false;
      this.initEmailForm();
    })
    .catch(err =>{
      if(this.printableError.includes(err.code)){
        this.errorMessageEmail = err.message;
      }
    });
  }

  onValidUpdatePassword(){
    const formValue = this.updatePasswordForm.value;
    this.errorMessagePassword = '';
    if(formValue.newPassword===formValue.confirm){
      this.auth.updatePassword(formValue.oldPassword,formValue.newPassword)
      .then(() => {
        this.updatingPassword = false;
        this.presentToast();
      })
      .catch(err =>{
        if(this.printableError.includes(err.code)){
          this.errorMessagePassword=err.message;
        }else{
          console.log(err);
        }
      });
    }else{
      this.errorMessagePassword='Password should be the same';
    }
  }

}
