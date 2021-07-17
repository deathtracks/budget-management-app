import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, PickerController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Expense } from 'src/app/class/data/expense';
import { ExpenseService } from 'src/app/services/data/expense.service';
import { UserInfoService } from 'src/app/services/data/user-info.service';
import { DateToStringService } from 'src/app/services/tools/date-to-string.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss'],
})
export class EditExpenseComponent implements OnInit,OnDestroy {
  @Input() editedExpense: Expense;
  public selectedCategory: number;
  public userCategory: string[];

  public editExpenseForm: FormGroup;

  private userSub: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private expense: ExpenseService,
    private dateConversion: DateToStringService,
    private user: UserInfoService,
    private pickerController: PickerController
  ) { }

  ngOnInit() {
    this.userSub = this.user.userInfo.subscribe(value =>
      this.userCategory = value.settings.categorie);
    this.user.updateInfo(false);
    this.selectedCategory = this.editedExpense.category;
    this.editExpenseForm = this.formBuilder.group({
      name : [this.editedExpense.name,Validators.required],
      amount : [this.editedExpense.amount,Validators.required],
      date : [this.dateConversion.dateStr(this.editedExpense.date),Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }


  onDismiss(){
    this.modalController.dismiss();
  }

  onEditExpense(){
    const formValue = this.editExpenseForm.value;
    this.editedExpense.name = formValue.name;
    this.editedExpense.amount = formValue.amount;
    this.editedExpense.date = new Date(formValue.date);
    this.editedExpense.category = this.selectedCategory;
    this.expense.editOneExpense(this.editedExpense)
    .then(() => this.onDismiss())
    .catch(err => console.log(err));
  }

  getColumnOptions(){
    const options = [];
    for(let i=0;i<this.userCategory.length;i++){
      options.push({
        text: this.userCategory[i],
        value: i
      });
    }
    return options;
  }

  async openPicker(){
    const picker = await this.pickerController.create({
      columns : [
        {
          name: `col`,
          options: this.getColumnOptions(),
          selectedIndex: this.selectedCategory
        }],
      buttons:[
        {
          text:'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value)=>{
            console.log(value.col.value);
            this.selectedCategory = value.col.value;
          }
        }
      ]
    });
    return await picker.present();
  }

}
