import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/base/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  public logInForm: FormGroup;
  public error= false;

  private possibleErrorCode: string[] = [
    'auth/invalid-email',
    'auth/user-not-found',
    'auth/wrong-password'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.logInForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });
  }

  onLogIn(){
    const formValue = this.logInForm.value;
    this.auth.logInUser(formValue.email,formValue.password)
    .then(
      result =>{
        //It means it's a success
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
