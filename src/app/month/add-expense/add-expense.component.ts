import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonthService } from 'src/app/services/data/month.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  public addExpenseForm: FormGroup;

  constructor(
    private monthService: MonthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.addExpenseForm = this.formBuilder.group({
      amount : [null,[Validators.required]],
      date: [null,[Validators.required]],
      section: [null,[Validators.required]],
      name: [null,[Validators.required]]
    })
  }

  onAddExpense(){

  }

}
