import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';
import { AddMonthComponent } from './add-month/add-month.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public modalControler: ModalController,
    private routerOutlet: IonRouterOutlet
  ) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalControler.create({
      component: AddMonthComponent,
      breakpoints: [0, 0.35],
      initialBreakpoint: 0.35
    });
    return await modal.present();
  }

}
