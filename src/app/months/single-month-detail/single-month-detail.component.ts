import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Chart, ChartConfiguration, ChartItem, ChartType, registerables } from 'chart.js';
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
  private amountPerDayChart: Chart;
  private amountPerCategoryChart: Chart;
  private amountPerDayCanva: HTMLElement;
  private amountPerCategoryCanva: HTMLElement;
  constructor(
    private modalController: ModalController,
    private user: UserInfoService
  ) {
    Chart.register(...registerables);
   }

  ngOnInit() {
    this.resetCanvas();
    this.getCanvas();
    this.generateExpenseByDayChart();
    this.userInfoSub = this.user.userInfo
    .subscribe(value =>{
      this.userCatgories = value.settings.categorie;
      this.generateExpenseByCategory();
    });
    this.user.updateInfo(false);
  }

  public onDismiss(){
    this.amountPerCategoryChart.destroy();
    this.amountPerDayChart.destroy();
    console.log('test');
    this.modalController.dismiss();
  }

  private resetCanvas(){
    if(this.amountPerDayChart){
      this.amountPerDayChart.destroy();
      this.amountPerCategoryChart.destroy();
    }
  }

  private getCanvas(){
    this.amountPerDayCanva = document.getElementById('amount-by-day');
    this.amountPerCategoryCanva = document.getElementById('amount-by-category');
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
    this.amountPerDayChart = new Chart(this.amountPerDayCanva as ChartItem,config);
  }

  private generateExpenseByCategory(){
    const expenseList = [];
    const userCat = [];
    const colorCat = [];
    for(let i=0;i<this.userCatgories.length;i++){
      expenseList.push(this.singleMonth.getAmountByCategory(i));
      userCat.push(this.userCatgories[i].name);
      colorCat.push(this.userCatgories[i].color);
    }
    const data = {
      labels: userCat,
      datasets:[{
        label: 'Amount per category',
        backgroundColor: colorCat,
        borderColor: 'rgba(0,0,0,0)',
        data : expenseList,
        hoverOffset:4
      }]
    };
    const config: ChartConfiguration = {
      type: 'doughnut',
      data
    };
    this.amountPerCategoryChart = new Chart(this.amountPerCategoryCanva as ChartItem,config);
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
