import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { DisplayComponent } from './display/display.component';
import { ToolsModule } from '../tools/tools.module';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';



@NgModule({
  declarations: [
    DisplayComponent,
    AddCategoryComponent,
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ToolsModule,
    UserSettingsRoutingModule
  ]
})
export class UserSettingsModule { }
