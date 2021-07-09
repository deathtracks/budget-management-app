import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import firebase from 'firebase/app';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  public signInForm: FormGroup;
  public logInForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
    firebase.auth().createUserWithEmailAndPassword(formValue.email, formValue.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  onLogIn(){
    const formValue = this.logInForm.value;
    firebase.auth().signInWithEmailAndPassword(formValue.email, formValue.password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }
}
