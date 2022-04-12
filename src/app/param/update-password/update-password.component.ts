import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  public passwordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      old: [null,[Validators.required]],
      new: [null,[Validators.required]],
      newRepeat: [null,[Validators.required]]
    })
  }

  onSubmit(){
    const value = this.passwordForm.value;
    if(value.new===value.newRepeat){
      this.modalCtrl.dismiss({ old : value.old, new : value.new});
    } else {
      this.modalCtrl.dismiss();
    }
  }

}
