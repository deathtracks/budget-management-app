import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import firebase from 'firebase/app';
import { AuthService } from '../services/base/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  public logIn = true;

  public signInForm: FormGroup;
  public logInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email : '',
      password : ''
    });
    this.logInForm = this.formBuilder.group({
      email :'',
      password:''
    });
  }

  onSignIn(){
    const formValue = this.signInForm.value;
    this.auth.createUser(
      formValue.email,
      formValue.password
    )
    .then(
      res =>{
        console.log(res);
      }
    )
    .catch(err => console.log(err));
  }

  onLogIn(){
    this.logIn = false;
  }
}
