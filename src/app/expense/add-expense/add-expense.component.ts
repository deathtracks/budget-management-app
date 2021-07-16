import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, PickerController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Month } from 'src/app/class/data/month';
import { MonthService } from 'src/app/services/data/month.service';
import { UserInfoService } from 'src/app/services/data/user-info.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit,OnDestroy {
  @Input() month: Month;
  public newExpenseForm: FormGroup;
  public selectedCategory: number;
  public userCategories: string[];

  private userSub: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private monthService: MonthService,
    private pickerController: PickerController,
    private user: UserInfoService
  ) { }

  ngOnInit() {
    this.userSub = this.user.userInfo.subscribe(
      value => {
        this.userCategories = value.settings.categorie;
    });
    this.user.updateInfo(false);
    this.newExpenseForm = this.formBuilder.group({
      name : ['',Validators.required],
      amount : ['',Validators.required],
      date: ['',Validators.required],
      category: ['']
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  getColumnOptions(){
    const options = [];
    for(let i=0;i<this.userCategories.length;i++){
      options.push({
        text: this.userCategories[i],
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
          options: this.getColumnOptions()
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
      new Date(formValue.date),
      this.selectedCategory
    ).then( () =>{
      this.onDismiss();
    })
    .catch(err => console.log(err));
  }

}
