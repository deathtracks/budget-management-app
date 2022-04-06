import { Component, Input, OnInit } from '@angular/core';
import { Month } from 'src/app/class/base/month';
import { Description } from 'src/app/extra/floating-btn/floating-btn.component';

@Component({
  selector: 'app-month-list-el',
  templateUrl: './month-list-el.component.html',
  styleUrls: ['./month-list-el.component.scss'],
})
export class MonthListElComponent implements OnInit {
  @Input() month: Month;
  
  constructor() { }

  ngOnInit() {}

}
