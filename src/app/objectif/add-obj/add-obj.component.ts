import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Objectif } from 'src/app/class/base/objectif';
import { Section } from 'src/app/class/base/section';
import { LoadingScreen } from 'src/app/extra/loading-screen';
import { UserService } from 'src/app/services/data/user.service';

@Component({
  selector: 'app-add-obj',
  templateUrl: './add-obj.component.html',
  styleUrls: ['./add-obj.component.scss'],
})
export class AddObjComponent implements OnInit {
  @Input() editedObj: Objectif;
  public objForm: FormGroup;

  private loading: LoadingScreen;
  constructor(
    private modalControler: ModalController,
    private formBuilder: FormBuilder,
    private user: UserService
  ) { }

  ngOnInit() {
    if(this.editedObj){
      this.objForm = this.formBuilder.group({
        name: [this.editedObj.name,[Validators.required]],
        amount: [this.editedObj.amount,[Validators.required,Validators.min(0)]]
      })
    } else {
      this.objForm = this.formBuilder.group({
        name: [null,[Validators.required]],
        amount: [null,[Validators.required,Validators.min(0)]]
      })
    }
    
  }

  onAddObj(){
    const value = this.objForm.value;
    if(this.editedObj){
      this.editedObj.amount = value.amount;
      this.editedObj.name = value.name;
      this.modalControler.dismiss({objectif: this.editedObj});
    } else {
      const n = new Objectif(value.name,new Date(),value.amount,false);
      this.modalControler.dismiss({objectif: n});
    }
  }


}
