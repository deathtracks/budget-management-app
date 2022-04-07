import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Month } from 'src/app/class/base/month';
import { Objectif } from 'src/app/class/base/objectif';
import { UserService } from 'src/app/services/data/user.service';

@Component({
  selector: 'app-close-month',
  templateUrl: './close-month.component.html',
  styleUrls: ['./close-month.component.scss'],
})
export class CloseMonthComponent implements OnInit,OnDestroy {
  @Input() singleMonth: Month;
  public objList: Objectif[];
  public objForm: FormGroup;

  private userSub : Subscription;
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private user: UserService
  ) { }
  

  ngOnInit() {
    this.userSub = this.user.objSub.subscribe((u)=>{
      if(u){
        this.objList = u.objectifs;
        this.objForm = this.formBuilder.group({
          selectedObj : [null,[Validators.required]]
        });
      }
    })
    this.user.publish();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  public onSubmit(){
    const value = this.objForm.value.selectedObj;
    this.modalController.dismiss({
      selectedObj : value
    })
  }

  public onCancel(){
    this.modalController.dismiss();
  }

}
