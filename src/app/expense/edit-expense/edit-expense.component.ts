import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Expense } from 'src/app/class/data/expense';
import { ExpenseService } from 'src/app/services/data/expense.service';
import { DateToStringService } from 'src/app/services/tools/date-to-string.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss'],
})
export class EditExpenseComponent implements OnInit {
  @Input() editedExpense: Expense;

  public editExpenseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private expense: ExpenseService,
    private dateConversion: DateToStringService
  ) { }

  ngOnInit() {
    this.editExpenseForm = this.formBuilder.group({
      name : [this.editedExpense.name,Validators.required],
      amount : [this.editedExpense.amount,Validators.required],
      date : [this.dateConversion.dateStr(this.editedExpense.date),Validators.required]
    });
  }

  onDismiss(){
    this.modalController.dismiss();
  }

  onEditExpense(){
    const formValue = this.editExpenseForm.value;
    this.editedExpense.name = formValue.name;
    this.editedExpense.amount = formValue.amount;
    this.editedExpense.date = new Date(formValue.date);
    this.expense.editOneExpense(this.editedExpense)
    .then(() => this.onDismiss())
    .catch(err => console.log(err));
  }

}
