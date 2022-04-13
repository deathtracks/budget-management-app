import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Section } from 'src/app/class/base/section';
import { UserService } from 'src/app/services/data/user.service';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.scss'],
})
export class AddSectionComponent implements OnInit {
  @Input() editedSection: Section;
  @Input() editedSectionIndex: number;
  public sectionForm: FormGroup;

  constructor(
    private user: UserService,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    if(this.editedSection){
      this.sectionForm = this.formBuilder.group({
        name : [this.editedSection.name,[Validators.required]],
        part : [this.editedSection.partion*100,[Validators.required,Validators.min(0),Validators.max(100)]]
      })
    } else {
      this.sectionForm = this.formBuilder.group({
        name : [null,[Validators.required]],
        part : [null,[Validators.required,Validators.min(0),Validators.max(100)]]
      })
    }
  }

  onSubmit(){
    const value = this.sectionForm.value;
    const newSection = new Section(value.part/100,value.name);
    if(this.editedSection){
      this.user.editSection(newSection,this.editedSectionIndex)
      .then((v)=>{
        if(v) this.modalCtrl.dismiss();
      })
      .catch(err=>{throw err});
    } else {
      this.user.addSection(newSection)
      .then((v)=>{
        if(v) this.modalCtrl.dismiss();
      })
      .catch(err=>{throw err});
    }
  }

}
