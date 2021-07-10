/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component } from '@angular/core';
import firebase from 'firebase/app';
import { Month } from '../class/data/month';
import { AuthService } from '../services/base/auth.service';
import { MonthService } from '../services/data/month.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private userData: firebase.User;

  constructor(
    private month: MonthService,
    private user: AuthService) {
      this.user.user.subscribe(
        value =>{
          this.userData = value;
        }
      );
  }

  onTest(){}

}
