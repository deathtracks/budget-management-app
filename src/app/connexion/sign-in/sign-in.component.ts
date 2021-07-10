import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/base/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup;
  public errorMessage: string;
  public notSamePassword=false;

  private printableError = [
    'auth/email-already-in-use',
    'auth/invalid-email',
    'auth/weak-password'
  ];
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
      repeatPassword: ['',Validators.required]
    });
  }

  onSignIn(){
    const formValue = this.signInForm.value;
    this.notSamePassword=false;
    this.errorMessage = '';
    if(formValue.password===formValue.repeatPassword){
      this.auth.createUser(formValue.email,formValue.password)
      .then(
        result =>{
          //It's a success
          this.router.navigate(['/']);
        }
      )
      .catch(err =>{
        if(this.printableError.includes(err.code)){
          this.errorMessage = err.message;
        }else{
          console.log(err);
        }
      });
    }else{
      this.notSamePassword=true;
    }
  }
}
