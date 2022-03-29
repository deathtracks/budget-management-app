import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { DateModalComponent } from '../date-modal/date-modal.component';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
})
export class DateInputComponent implements OnInit {
  @Input() maxDate: Date;
  @Input() minDate: Date;
  @Input() default: Date;
  @Output() onDateChoosen: EventEmitter<Date> = new EventEmitter<Date>();

  public selectedDate: string = "";

  constructor(
    private modalControl: ModalController
  ) { }

  ngOnInit() {}


  async openModal() {
    const modal = await this.modalControl.create({
      component: DateModalComponent,
      backdropDismiss: true,
      breakpoints : [0,0.6],
      initialBreakpoint : 0.6,
      componentProps : {
        'minDate' : this.minDate,
        'maxDate' : this.maxDate,
        'default' : this.default
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    if(data && data.selectedDate){
      this.selectedDate = format(data.selectedDate,'dd/MM/yyyy');
      this.onDateChoosen.emit(data.selectedDate);
    }
  }
}
