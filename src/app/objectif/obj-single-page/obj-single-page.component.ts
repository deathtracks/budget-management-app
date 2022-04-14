import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Chart, ChartItem, registerables } from 'chart.js';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';
import { Objectif } from 'src/app/class/base/objectif';
import { LoadingScreen } from 'src/app/extra/loading-screen';
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
  private loading: LoadingScreen;
  constructor(
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private user: UserService
  ) {
    Chart.register(...registerables);
    this.loading = new LoadingScreen(loadingCtrl);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  public async ngOnInit() {
    await this.loading.generateLoading();
    await this.loading.loadingStart();
    this.objIndex = this.route.snapshot.params['id'];
    this.userSub = this.user.objSub.subscribe((u)=>{
      if(u){
        this.singleObj = u.objectifs[this.objIndex];
        this.initChart();
      }
      this.loading.loadingStop();
    })
    this.user.publish();
  }

  private initChart(){
    const ctx = document.getElementById('area-graph') as ChartItem;
    const graph = new Chart(ctx,{
      type: 'line',
      data : {
        labels : this.getDate(this.singleObj.dates),
        datasets: [{
          label: 'Montant',
          data: this.getSave(this.singleObj.saves),
          borderColor : '#0F71B3',
          backgroundColor : '#87b8d9',
          fill: 'origin'
        }]
      },
      options:{
        scales:{
          y: {
            min: 0,
            max: this.singleObj.amount
          }
        },
        plugins:{
          tooltip:{
            callbacks:{
              label: (context) =>{
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(context.parsed.y);
                }
                return label;
              }
            }
          }
        }
      }
    })
  }

  private getDate(dates: Date[]): string[]{
    const labels = [];
    dates.forEach(d => labels.push(format(d,'yyyy-MM-dd')));
    return labels;
  }

  private getSave(saves: number[]): number[]{
    let sum = 0;
    const value = [];
    saves.forEach(v =>{
      sum = sum + v;
      value.push(sum);
    });
    return value;
  }

}
