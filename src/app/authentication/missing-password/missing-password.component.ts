import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/base/auth.service';

@Component({
  selector: 'app-missing-password',
  templateUrl: './missing-password.component.html',
  styleUrls: ['./missing-password.component.scss'],
})
export class MissingPasswordComponent implements OnInit {
  public emailForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private alertController: AlertController,
    private router : Router
  ) {}

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email : [null,[Validators.required,Validators.email]]
    })
  }

  public async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Si vous avez un compte chez nous,vous allez recevoir un email contenant un lien pour modifier votre mot de passe',
      buttons: ['OK']
    });

    await alert.present();
  }

  public onSubmit(){
    if(this.emailForm.value.email){
      this.auth.retrievePassword(this.emailForm.value.email)
      .then( async ()=>{
        await this.presentAlert();
        this.router.navigate(['auth','login']);
      })
      .catch(err =>{throw err});
    }
  }

}
