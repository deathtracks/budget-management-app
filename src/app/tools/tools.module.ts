import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { TextComponent } from './translation/text/text.component';



@NgModule({
  declarations: [
    LoadingPageComponent,
    TextComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    LoadingPageComponent,
    TextComponent
  ]
})
export class ToolsModule { }
