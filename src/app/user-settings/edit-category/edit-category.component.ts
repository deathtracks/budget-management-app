import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/class/data/category';
import { UserInfoService } from 'src/app/services/data/user-info.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  @Input() category: Category;

  public editCategoryForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private user: UserInfoService
  ) { }

  ngOnInit() {
    this.editCategoryForm = this.formBuilder.group({
      name: [this.category.name,Validators.required],
      color: [this.category.color,Validators.required]
    });
    const colorInput = document.getElementById('color');
    colorInput.addEventListener('change',()=>this.onColorPicked());
    this.onColorPicked();
  }

  public onDismiss(){
    this.modalController.dismiss();
  }

  public onColorPicked(){
    const formValue = this.editCategoryForm.value;
    const canvas = document.getElementById('color-show') as HTMLCanvasElement;
    const cvt = canvas.getContext('2d');
    cvt.fillStyle=formValue.color;
    cvt.fillRect(0,0,30,30);
  }

  public onValidForm(){
    const formValue = this.editCategoryForm.value;
    this.user.editCategory(this.category.index,formValue.name,formValue.color)
    .then(() => this.onDismiss());
  }

}
