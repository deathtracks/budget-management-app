import { Component, OnInit } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { AddMonthComponent } from './add-month/add-month.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private main: HTMLDivElement;
  private btn1: HTMLDivElement;
  private btn2: HTMLDivElement;
  private menuDisplay: boolean;
  constructor(
    public modalControler: ModalController,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
    this.main = document.getElementById('main-btn') as HTMLDivElement;
    this.btn1 = document.getElementById('float-btn-1') as HTMLDivElement;
    this.btn2 = document.getElementById('float-btn-2') as HTMLDivElement;
  }

  async presentModal() {
    const modal = await this.modalControler.create({
      component: AddMonthComponent,
      breakpoints: [0, 0.40],
      initialBreakpoint: 0.40
    });
    return await modal.present();
  }

  showBtn(){
    this.menuDisplay = !this.menuDisplay;
    if(this.menuDisplay){
      this.main.classList.add('rotate');
      this.btn1.classList.add('raise-1');
      this.btn2.classList.add('raise-2');
    } else {
      this.main.classList.remove('rotate');
      this.btn1.classList.remove('raise-1');
      this.btn2.classList.remove('raise-2');
    }
    
  }

}
