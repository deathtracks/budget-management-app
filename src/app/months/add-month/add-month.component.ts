import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MonthService } from 'src/app/services/data/month.service';

@Component({
  selector: 'app-add-month',
  templateUrl: './add-month.component.html',
  styleUrls: ['./add-month.component.scss'],
})
export class AddMonthComponent implements OnInit {
  public newMonthForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private month: MonthService
  ) { }

  ngOnInit() {
    this.newMonthForm = this.formBuilder.group({
      start:['',Validators.required],
      end:['',Validators.required],
      budget:['',Validators.required]
    });
  }

  onDismiss(){
    this.modalController.dismiss();
  }

  onUpdate(){
    console.log(this.newMonthForm);
  }

  onCreateMonth(){
    const formValue = this.newMonthForm.value;
    this.month.createMonth(new Date(formValue.start),new Date(formValue.end),formValue.budget)
    .then(
      value =>{
        this.onDismiss();
      }
    );
  }

}
