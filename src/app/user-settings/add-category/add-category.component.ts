import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UserInfoService } from 'src/app/services/data/user-info.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  public newCategoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private user: UserInfoService
  ) {}

  ngOnInit() {
    this.newCategoryForm = this.formBuilder.group({
      name : ['',Validators.required],
      color : ['',Validators.required]
    });
    const colorInput = document.getElementById('color');
    colorInput.addEventListener('change',()=>this.onColorPicked());
  }

  public onDismiss(){
    this.modalController.dismiss();
  }

  public onColorPicked(){
    const formValue = this.newCategoryForm.value;
    console.log(formValue.color);
    const canvas = document.getElementById('color-show') as HTMLCanvasElement;
    const cvt = canvas.getContext('2d');
    cvt.fillStyle=formValue.color;
    cvt.fillRect(0,0,30,30);
  }

  public onValidForm(){
    const formValue = this.newCategoryForm.value;
    this.user.addCategory(formValue.name,formValue.color)
    .then(() => this.onDismiss());
  }

}
