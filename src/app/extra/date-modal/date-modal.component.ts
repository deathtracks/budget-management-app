import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-date-modal',
  templateUrl: './date-modal.component.html',
  styleUrls: ['./date-modal.component.scss'],
})
export class DateModalComponent implements OnInit {
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @ViewChild(IonDatetime, {static: true}) datetime: IonDatetime;
  
  dateValue = '';

  constructor() { }

  ngOnInit() {}

  formatDate(value: string){
    return format(parseISO(value),'MMM dd yyyy');
  }

}
