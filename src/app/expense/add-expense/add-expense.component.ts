import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Month } from 'src/app/class/data/month';
import { MonthService } from 'src/app/services/data/month.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  @Input() month: Month;
  public newExpenseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private monthService: MonthService
  ) { }

  ngOnInit() {
    this.newExpenseForm = this.formBuilder.group({
      name : ['',Validators.required],
      amount : ['',Validators.required],
      date: ['',Validators.required]
    });
  }

  onDismiss(){
    this.modalController.dismiss();
  }

  onAddExpense(){
    const formValue = this.newExpenseForm.value;
    console.log(formValue.date);
    this.monthService.addOneExpense(
      this.month,
      formValue.name,
      formValue.amount,
      new Date(formValue.date)
    ).then( () =>{
      this.onDismiss();
    })
    .catch(err => console.log(err));
  }

}
