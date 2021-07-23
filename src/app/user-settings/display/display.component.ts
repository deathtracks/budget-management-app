import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NumericValueAccessor, PickerController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserInfo } from 'src/app/class/user-info';
import { AuthService } from 'src/app/services/base/auth.service';
import { UserInfoService } from 'src/app/services/data/user-info.service';
import { TranslationService } from 'src/app/tools/translation/translation.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit,OnDestroy {
  public userInf: UserInfo;
  public updatingEmail: boolean;
  public updatingPassword: boolean;
  public updatingCategorie: boolean;
  public addingCategory: boolean;
  public updateEmailForm: FormGroup;
  public updatePasswordForm: FormGroup;
  public updateCategoryForm: FormGroup;
  public addCategoryForm: FormGroup;
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
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private translation: TranslationService,
    private pickerController: PickerController
  ) { }

  ngOnInit() {
    this.language = this.translation.languages;
    this.userInfoSub = this.user.userInfo
    .subscribe(value =>this.userInf = value);
    this.user.updateInfo(false);
    this.transSub = this.translation.translation
    .subscribe(value => this.chooseLanguage = value);
    this.translation.updateTranslation();
    this.initEmailForm();
    this.initPasswordForm();
    this.initCategoryForm();
    console.log(this.language);
    console.log(this.language[this.chooseLanguage]);
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
            console.log(value.col.value);
            console.log(this.language[value.col.value]);
            this.translation.switchTo(value.col.value);
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

  initCategoryForm(){
    this.addCategoryForm = this.formBuilder.group({
      name: ['',Validators.required]
    });
  }

  initCategoryUpdateForm(index: number){
    this.updateCategoryForm = this.formBuilder.group({
      name: [this.userInf.settings.categorie[index],Validators.required]
    });
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

  onAddCategory(){
    this.addingCategory = !this.addingCategory;
  }

  onUpdateCategory(index: number){
    if(this.updatingIndexCategorie && index===this.updatingIndexCategorie){
      this.updatingCategorie=false;
    } else {
      this.updatingCategorie = true;
      this.updatingIndexCategorie = index;
      this.initCategoryUpdateForm(index);
    }
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

  onValidAddCategory(){
    console.log('button pressed');
    const formValue = this.addCategoryForm.value;
    this.user.addCategory(formValue.name);
    this.addingCategory= false;
    this.initCategoryForm();
  }

  onValidUpdateCategory(){
    const formValue = this.updateCategoryForm.value;
    this.user.editCategory(this.updatingIndexCategorie,formValue.name);
    this.updatingCategorie = false;
    this.updatingIndexCategorie = undefined;
  }

  onDeleteCategorie(index: number){
    this.user.removeCategory(index);
  }

}
