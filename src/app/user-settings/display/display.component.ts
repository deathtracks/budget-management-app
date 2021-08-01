import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NumericValueAccessor, PickerController, ToastController, ViewDidEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserInfo } from 'src/app/class/user-info';
import { AuthService } from 'src/app/services/base/auth.service';
import { UserInfoService } from 'src/app/services/data/user-info.service';
import { TranslationService } from 'src/app/tools/translation/translation.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit,OnDestroy,ViewDidEnter {
  public userInf: UserInfo;
  public updatingEmail: boolean;
  public updatingPassword: boolean;
  public updateEmailForm: FormGroup;
  public updatePasswordForm: FormGroup;
  public errorMessageEmail: string;
  public errorMessagePassword: string;
  public language: string[];
  public chooseLanguage: number;

  private userInfoSub: Subscription;
  private updatingIndexCategorie: number;
  private transSub: Subscription;
  private printableError = [
    'auth/email-already-in-use',
    'auth/invalid-email',
    'auth/weak-password'
  ];
  constructor(
    private auth: AuthService,
    private user: UserInfoService,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private translation: TranslationService,
    private pickerController: PickerController
  ) { }
  ionViewDidEnter(): void {
    this.initCanvas();
  }

  ngOnInit() {
    this.language = this.translation.languages;
    this.userInfoSub = this.user.userInfo
    .subscribe(value =>{
      this.userInf = value;
      this.initCanvas();
    });
    this.user.updateInfo(false);
    this.transSub = this.translation.translation
    .subscribe(value => this.chooseLanguage = value);
    this.translation.updateTranslation();
    this.initEmailForm();
    this.initPasswordForm();
  }



  ngOnDestroy(): void {
    this.userInfoSub.unsubscribe();
    this.transSub.unsubscribe();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your password has been updated',
      duration: 2000
    });
    toast.present();
  }

  getColumnOptions(){
    const options = [];
    for(let i=0;i<this.language.length;i++){
      options.push({
        text: this.language[i],
        value: i
      });
    }
    return options;
  }

  async openPicker(){
    const picker = await this.pickerController.create({
      columns : [
        {
          name: `col`,
          options: this.getColumnOptions()
        }],
      buttons:[
        {
          text:'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value)=>{
            this.user.updateLangue(value.col.value);
          }
        }
      ]
    });
    return await picker.present();
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

  initCanvas(){
    for(const c of this.userInf.settings.categorie){
      const canvas = document.getElementById(`${c.index}`) as HTMLCanvasElement;
      if(canvas){
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = c.color;
        ctx.fillRect(0, 0, 30, 30);
      }
    }
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

  public async onAddCategory(){
    const modal = await this.modalController.create({
      component : AddCategoryComponent
    });
    return await modal.present();
  }

  public async onUpdateCategory(index: number){
    const modal = await this.modalController.create({
      component: EditCategoryComponent,
      componentProps : {
        category : this.userInf.settings.categorie[index]
      }
    });
    return await modal.present();
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

  onDeleteCategorie(index: number){
    this.user.removeCategory(index);
  }

}
