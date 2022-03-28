import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DateModalComponent } from '../date-modal/date-modal.component';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
})
export class DateInputComponent implements OnInit {

  constructor(
    private modalControl: ModalController
  ) { }

  ngOnInit() {}


  async openModal() {
    const modal = await this.modalControl.create({
      component: DateModalComponent,
      backdropDismiss: true,
      breakpoints : [0,0.6],
      initialBreakpoint : 0.6
    });
    return await modal.present();
  }
}
