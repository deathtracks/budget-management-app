/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, OnDestroy, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import { Month } from '../class/data/month';
import { AuthService } from '../services/base/auth.service';
import { MonthService } from '../services/data/month.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy {
  public monthList: Month[];

  private monthSub: Subscription;
  constructor(
    private month: MonthService,
    private user: AuthService) {
  }
  ngOnInit(): void {
    this.monthSub = this.month.months.
    subscribe( value =>{
      this.monthList = value;
    });
    this.month.updateMonths();
  }
  ngOnDestroy(): void {
    this.monthSub.unsubscribe();
  }
}
