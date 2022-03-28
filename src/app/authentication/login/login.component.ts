import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/base/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public error: boolean = false;
  public errorMessage: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null,[Validators.required,Validators.email]],
      password : [null,[Validators.required]]
    })
  }

  public googleAuth() {
    this.auth.signInWithGoogle()
    .then((v)=>{
      if(v){
        this.router.navigate(['home']);
      }
    })
  }

  public onLogin(){
    this.error = false;
    this.errorMessage = "";
    const value = this.loginForm.value;
    this.auth.logIn(value.email,value.password)
    .then(v=>{
      if(v instanceof Error){
        this.error = true;
        this.errorMessage = v.message;
        this.loginForm.reset();
      } else {
        if(v){
          this.router.navigate(['home']);
        }
      }
    })
  }


}
