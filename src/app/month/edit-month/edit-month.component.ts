import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Month } from 'src/app/class/base/month';
import { LoadingScreen } from 'src/app/extra/loading-screen';
import { MonthService } from 'src/app/services/data/month.service';

@Component({
  selector: 'app-edit-month',
  templateUrl: './edit-month.component.html',
  styleUrls: ['./edit-month.component.scss'],
})
export class EditMonthComponent implements OnInit {
  @Input() m: Month;
  public editMonthForm: FormGroup;
  public startDate: Date;

  constructor(
    private formBuilder: FormBuilder,
    private modalControler: ModalController,
    private loadingCtrl: LoadingController,
    private month: MonthService
  ) {}

  ngOnInit() {
    this.editMonthForm = this.formBuilder.group({
      start: [this.m.startDate,[Validators.required]],
      end: [this.m.endDate,[Validators.required]],
      budget: [this.m.budget,[Validators.required]]
    })
  }

  public onStartDateChange(d: Date){
    this.startDate = d;
    this.editMonthForm.controls.start.setValue(d);
    this.editMonthForm.controls.start.updateValueAndValidity();
  }

  public onEndDataChange(d: Date){
    this.editMonthForm.controls.end.setValue(d);
    this.editMonthForm.controls.end.updateValueAndValidity();
  }

  public onSubmit(){
    const value = this.editMonthForm.value;
    this.m.startDate = value.start;
    this.m.endDate = value.end;
    this.m.budget = value.budget;
    this.modalControler.dismiss({month: this.m});
  }

}
