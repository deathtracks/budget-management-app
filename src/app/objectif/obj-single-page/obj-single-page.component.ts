import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartItem } from 'chart.js';
import { Subscription } from 'rxjs';
import { Objectif } from 'src/app/class/base/objectif';
import { UserService } from 'src/app/services/data/user.service';

@Component({
  selector: 'app-obj-single-page',
  templateUrl: './obj-single-page.component.html',
  styleUrls: ['./obj-single-page.component.scss'],
})
export class ObjSinglePageComponent implements OnInit,OnDestroy {
  public singleObj: Objectif;
  
  private objIndex : number;
  private userSub : Subscription;
  constructor(
    private route: ActivatedRoute,
    private user: UserService
  ) { }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit() {
    this.objIndex = this.route.snapshot.params['id'];
    this.userSub = this.user.objSub.subscribe((u)=>{
      if(u){
        this.singleObj = u.objectifs[this.objIndex];
      }
    })
    this.user.publish();
  }

  private initChart(){
    const ctx = document.getElementById('area-graph') as ChartItem;
    const graph = new Chart(ctx,{
      type: 'line',
      data : {
        labels : this.singleObj.dates,
        datasets: [{
          label: 'Montant',
          data: this.singleObj.saves,
          borderColor : '#0F71B3',
          backgroundColor : '#87b8d9',
          fill: 'start'
        }]
      }
    })
  }

}
