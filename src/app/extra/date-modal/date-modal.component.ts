import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonDatetime, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-date-modal',
  templateUrl: './date-modal.component.html',
  styleUrls: ['./date-modal.component.scss'],
})
export class DateModalComponent implements OnInit {
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() default: Date;
  @ViewChild(IonDatetime, {static: true}) datetime: IonDatetime;
  public minD: string;
  public maxD: string;
  
  dateValue = '';
  private selectedDate: Date;
  constructor(
    public modalControler: ModalController
  ) {
    
  }

  ngOnInit() {
    if(this.default){
      this.dateValue = format(this.default,"yyyy-MM-dd");
      console.log(this.dateValue);
    }
    if(this.minDate){
      this.minD = format(this.minDate,"yyyy-MM-dd");
      console.log(this.minD);
    }
    if(this.maxDate){
      this.maxD = format(this.maxDate,"yyyy-MM-dd");
      console.log(this.maxD);
    }
  }

  onChange(v: any){
    this.selectedDate = new Date(v.detail.value);
  }

  onReset(){
    this.modalControler.dismiss();
  }

  onConfirm(){
    if(!this.selectedDate) this.selectedDate = this.default;
    this.modalControler.dismiss({selectedDate: this.selectedDate});
  }

  formatDate(value: string){
    return format(parseISO(value),'MMM dd yyyy');
  }

}
