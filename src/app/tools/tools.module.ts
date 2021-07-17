import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoadingPageComponent } from './loading-page/loading-page.component';



@NgModule({
  declarations: [
    LoadingPageComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    LoadingPageComponent
  ]
})
export class ToolsModule { }
