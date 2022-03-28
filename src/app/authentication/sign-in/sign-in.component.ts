import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserObject } from 'src/app/class/base/user-object';
import { AuthService } from 'src/app/services/base/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public signInForm : FormGroup;
  public error: boolean = false;
  public errorMessage : string;

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email : [null,[Validators.required,Validators.email]],
      name: [null,[Validators.required]],
      password: [null,[Validators.required,Validators.minLength(8)]],
      confirmPassword: [null,[Validators.required,Validators.minLength(8)]]
    })
  }

  onSignIn(){
    this.error = false;
    this.errorMessage = "";
    const value = this.signInForm.value;
    if(value.password===value.confirmPassword){
      const u = new UserObject(value.email,value.name);
      this.auth.signIn(u,value.password,value.confirmPassword)
      .then(v=>{
        if(v instanceof Error){
          this.error = true;
          this.errorMessage = v.message;
        } else {
          this.router.navigate(['home']);
        }
      })
    }
  }

}
