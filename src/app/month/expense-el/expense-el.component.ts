import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GestureController } from '@ionic/angular';
import { Expense } from 'src/app/class/base/expense';

@Component({
  selector: 'app-expense-el',
  templateUrl: './expense-el.component.html',
  styleUrls: ['./expense-el.component.scss'],
})
export class ExpenseElComponent implements OnInit {
  @Input() e: Expense;
  @Input() sectionName: string;
  constructor(
    private gestureCtrl: GestureController
  ) { }

  ngOnInit() {
    const i = document.getElementById('page-content') as HTMLDivElement;
    const elementWidht = i.clientWidth;
    const g = this.gestureCtrl.create({
      el: i,
      direction : 'x',
      onMove: (detail) => {
        if(Math.abs(detail.deltaX)>elementWidht/2){
          if(detail.deltaX>0){
            i.classList.add('content-to-right');
          } else {
            i.classList.add('content-to-left');
          }
        } else {
          i.classList.remove('content-to-right');
          i.classList.remove('content-to-left');
        }
      },
      gestureName: ''
    });
    g.enable(true);
  }

}