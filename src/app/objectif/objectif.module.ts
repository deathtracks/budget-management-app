import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddObjComponent } from './add-obj/add-obj.component';
import { ObjListComponent } from './obj-list/obj-list.component';
import { ObjSingleElComponent } from './obj-single-el/obj-single-el.component';
import { ObjSinglePageComponent } from './obj-single-page/obj-single-page.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExtraModule } from '../extra/extra.module';
import { ObjectifRoutingModule } from './objectif-routing.module';



@NgModule({
  declarations: [
    AddObjComponent,
    ObjListComponent,
    ObjSingleElComponent,
    ObjSinglePageComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ExtraModule,
    ObjectifRoutingModule
  ]
})
export class ObjectifModule { }
