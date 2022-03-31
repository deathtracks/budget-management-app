import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Expense } from 'src/app/class/base/expense';
import { Section } from 'src/app/class/base/section';
import { MonthService } from 'src/app/services/data/month.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() sectionList: Section[];
  public addExpenseForm: FormGroup;
  private date: Date;

  constructor(
    private monthService: MonthService,
    private formBuilder: FormBuilder,
    public modalControler: ModalController
  ) {}

  ngOnInit() {
    this.addExpenseForm = this.formBuilder.group({
      amount : [null,[Validators.required]],
      date: [null,[Validators.required]],
      section: [null,[Validators.required]],
      name: [null,[Validators.required]]
    })
    
  }

  onDatePick(d: Date){
    this.addExpenseForm.controls.date.setValue(d);
    this.addExpenseForm.updateValueAndValidity();
  }

  onAddExpense(){
    const value = this.addExpenseForm.value;
    const e = new Expense(value.name,value.date,value.amount,value.section);
    this.monthService.addExpense(e)
    .then((v)=>{
      if(v) this.modalControler.dismiss();
    })
    .catch(err=>{throw err})
  }

}
