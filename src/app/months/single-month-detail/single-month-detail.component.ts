import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Month } from 'src/app/class/data/month';

@Component({
  selector: 'app-single-month-detail',
  templateUrl: './single-month-detail.component.html',
  styleUrls: ['./single-month-detail.component.scss'],
})
export class SingleMonthDetailComponent implements OnInit {
  @Input() singleMonth: Month;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  public onDismiss(){
    this.modalController.dismiss();
  }
}
