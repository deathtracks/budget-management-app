import { Component, Input, OnInit } from '@angular/core';
import { Expense } from 'src/app/class/base/expense';

@Component({
  selector: 'app-expense-el',
  templateUrl: './expense-el.component.html',
  styleUrls: ['./expense-el.component.scss'],
})
export class ExpenseElComponent implements OnInit {
  @Input() e: Expense;
  @Input() sectionName: string;
  constructor() { }

  ngOnInit() {}

}
