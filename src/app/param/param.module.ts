import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParamRoutingModule } from './param-routing.module';
import { ExtraModule } from '../extra/extra.module';
import { ParamPageComponent } from './param-page/param-page.component';
import { UpdateEmailComponent } from './update-email/update-email.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { SectionElComponent } from './section-el/section-el.component';



@NgModule({
  declarations: [
    ParamPageComponent,
    UpdateEmailComponent,
    UpdatePasswordComponent,
    SectionElComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ParamRoutingModule,
    ExtraModule
  ]
})
export class ParamModule { }
