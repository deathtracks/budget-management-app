import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss'],
})
export class UpdateEmailComponent implements OnInit {
  @Input() prevEmail: string;
  public emailForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: [this.prevEmail,[Validators.required,Validators.email]]
    })
  }

  onSubmit(){
    this.modalCtrl.dismiss({newEmail: this.emailForm.value.email});
  }

  onCancel(){
    this.modalCtrl.dismiss();
  }
}
