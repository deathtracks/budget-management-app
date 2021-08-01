import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/class/data/category';
import { Month } from 'src/app/class/data/month';
import { UserInfoService } from 'src/app/services/data/user-info.service';

@Component({
  selector: 'app-single-month-detail',
  templateUrl: './single-month-detail.component.html',
  styleUrls: ['./single-month-detail.component.scss'],
})
export class SingleMonthDetailComponent implements OnInit {
  @Input() singleMonth: Month;
  public userCatgories: Category[];

  private userInfoSub: Subscription;
  constructor(
    private modalController: ModalController,
    private user: UserInfoService
  ) {
    Chart.register(...registerables);
   }

  ngOnInit() {
    this.generateExpenseByDayChart();
    this.userInfoSub = this.user.userInfo
    .subscribe(value =>{
      this.userCatgories = value.settings.categorie;
      this.generateExpenseByCategory();
    });
    this.user.updateInfo(false);
  }

  public onDismiss(){
    this.modalController.dismiss();
  }


  private generateExpenseByDayChart(){
    let startDay = this.singleMonth.startDate;
    const dayList = [];
    const expenseList = [];
    while(startDay<this.singleMonth.endDate){
      dayList.push(this.dayToShortString(startDay));
      expenseList.push(this.singleMonth.getAmountOfDay(startDay.getDate(),startDay.getMonth(),startDay.getFullYear()));
      startDay = new Date(startDay.getTime()+24*3600*1000);
    }
    const data = {
      labels : dayList,
      datasets:[{
        label : 'Amount per day',
        data : expenseList,
        fill:false,
        borderColor:'rgb(75, 192, 192)',
        tension:0.1
      }]
    };
    const config: ChartConfiguration = {
      type : 'line',
      data
    };
    const canvas = document.getElementById('amount-by-day');
    const amountPerDay = new Chart(canvas as ChartItem,config);
  }

  private generateExpenseByCategory(){
    const expenseList = [];
    for(let i=0;i<this.userCatgories.length;i++){
      expenseList.push(this.singleMonth.getExpensesByCategory(i));
    }
    const data = {
      labels: this.userCatgories,
      datasets:[{
        label: 'Amount per category',
        data : expenseList,
        hoverOffset:4
      }]
    };
    const config: ChartConfiguration = {
      type: 'pie',
      data
    };
    const canvas = document.getElementById('amount-by-category');
    const amountPerCategory = new Chart(canvas as ChartItem,config);
  }

  private dayToShortString(date: Date){
    let res = '';
    if(date.getDate()<10){
      res = `0${date.getDate()}`;
    }else{
      res=`${date.getDate()}`;
    }
    res+='/';
    if(date.getMonth()+1<10){
      res+=`0${date.getMonth()+1}`;
    }else{
      res+=`${date.getMonth()+1}`;
    }
    return res;
  }
}
