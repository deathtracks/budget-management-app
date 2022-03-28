import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddExpenseComponent } from '../add-expense/add-expense.component';

@Component({
  selector: 'app-single-month',
  templateUrl: './single-month.component.html',
  styleUrls: ['./single-month.component.scss'],
})
export class SingleMonthComponent implements OnInit {

  private main: HTMLDivElement;
  private btn1: HTMLDivElement;
  private btn2: HTMLDivElement;
  private menuDisplay: boolean;
  constructor(
    public modalControler: ModalController,
  ) { }

  ngOnInit() {
    this.main = document.getElementById('main-btn') as HTMLDivElement;
    this.btn1 = document.getElementById('float-btn-1') as HTMLDivElement;
    this.btn2 = document.getElementById('float-btn-2') as HTMLDivElement;
  }

  async presentModal() {
    const modal = await this.modalControler.create({
      component: AddExpenseComponent,
      breakpoints: [0, 0.5],
      initialBreakpoint: 0.5
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
