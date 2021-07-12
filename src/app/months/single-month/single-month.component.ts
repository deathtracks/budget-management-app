import { Component, Input, OnInit } from '@angular/core';
import { Month } from 'src/app/class/data/month';

@Component({
  selector: 'app-single-month',
  templateUrl: './single-month.component.html',
  styleUrls: ['./single-month.component.scss'],
})
export class SingleMonthComponent implements OnInit {
  @Input() singleMonth: Month;

  constructor() { }

  ngOnInit() {}

}
