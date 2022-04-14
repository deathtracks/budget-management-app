import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Objectif } from 'src/app/class/base/objectif';
import { LoadingScreen } from 'src/app/extra/loading-screen';
import { UserService } from 'src/app/services/data/user.service';

@Component({
  selector: 'app-add-obj',
  templateUrl: './add-obj.component.html',
  styleUrls: ['./add-obj.component.scss'],
})
export class AddObjComponent implements OnInit {
  public objForm: FormGroup;

  private loading: LoadingScreen;
  constructor(
    private modalControler: ModalController,
    private formBuilder: FormBuilder,
    private user: UserService
  ) { }

  ngOnInit() {
    this.objForm = this.formBuilder.group({
      name: [null,[Validators.required]],
      amount: [null,[Validators.required]]
    })
  }

  onAddObj(){
    const value = this.objForm.value;
    const n = new Objectif(value.name,new Date(),value.amount,false);
    this.modalControler.dismiss({objectif: n});
  }


}
