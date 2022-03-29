import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';
import { Month } from 'src/app/class/base/month';
import { MonthService } from 'src/app/services/data/month.service';
import { UserService } from 'src/app/services/data/user.service';

@Component({
  selector: 'app-add-month',
  templateUrl: './add-month.component.html',
  styleUrls: ['./add-month.component.scss'],
})
export class AddMonthComponent implements OnInit {
  public startDate: Date;
  public endDate: Date;
  public addMonthForm: FormGroup;

  constructor(
    private modalControler: ModalController,
    private formBuilder: FormBuilder,
    private month: MonthService,
    private user: UserService
  ) { }

  ngOnInit() {
    this.addMonthForm = this.formBuilder.group({
      budget : [null,[Validators.required]],
      start : [null,[Validators.required]],
      end: [null,[Validators.required]]
    })
  }

  onStartDateChange(newDate: Date){
    this.startDate = newDate;
    this.addMonthForm.controls.start.setValue(newDate);
    this.addMonthForm.controls.start.updateValueAndValidity();
  }

  onEndDataChange(newDate: Date){
    this.endDate = newDate;
    this.addMonthForm.controls.end.setValue(newDate);
    this.addMonthForm.controls.end.updateValueAndValidity();
  }

  onAddMonth(){
    if(this.startDate<this.endDate){
      console.log('top');
      const b = this.addMonthForm.value.budget;
      const m = new Month(undefined,this.startDate,this.endDate,b);
      this.month.createOne(m)
      .then(m=>{
        if(m){
          this.user.addMonth(m.getId())
          .then(v=>this.modalControler.dismiss())
          .catch(err=>{throw err});
        }
      })
      .catch(err=>{throw err});
    }
  }

}
