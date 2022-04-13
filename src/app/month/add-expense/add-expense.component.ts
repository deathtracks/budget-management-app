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
  @Input() editedExpense: Expense;
  @Input() editedExpenseIndex: number;
  public addExpenseForm: FormGroup;
  public defaultDate : Date = new Date();

  constructor(
    private monthService: MonthService,
    private formBuilder: FormBuilder,
    public modalControler: ModalController,
  ) {
  }

  ngOnInit() {
    if(this.editedExpense){
      this.addExpenseForm = this.formBuilder.group({
        amount : [this.editedExpense.amount,[Validators.required]],
        date: [this.editedExpense.date,[Validators.required]],
        section: [this.editedExpense.section,[Validators.required]],
        name: [this.editedExpense.name,[Validators.required]]
      })
      this.defaultDate = this.editedExpense.date;
    } else {
      this.addExpenseForm = this.formBuilder.group({
        amount : [null,[Validators.required]],
        date: [null,[Validators.required]],
        section: [null,[Validators.required]],
        name: [null,[Validators.required]]
      })
    }
  }

  onDatePick(d: Date){
    this.addExpenseForm.controls.date.setValue(d);
    this.addExpenseForm.updateValueAndValidity();
  }

  public onAddExpense(){
    if(this.editedExpense){
      const value = this.addExpenseForm.value;
      this.editedExpense.amount = value.amount;
      this.editedExpense.date = value.date;
      this.editedExpense.name = value.name;
      this.editedExpense.section = value.section;
      this.monthService.editExpense(this.editedExpense,this.editedExpenseIndex)
      .then((v)=>{
        if(v) this.modalControler.dismiss();
      })
      .catch(err=>{throw err});
    } else {
      const value = this.addExpenseForm.value;
      const e = new Expense(value.name,value.date,value.amount,value.section);
      this.monthService.addExpense(e)
      .then((v)=>{
        if(v) this.modalControler.dismiss();
      })
      .catch(err=>{throw err});
    }
    
  }

}
