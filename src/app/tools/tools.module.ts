import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { TextComponent } from './translation/text/text.component';
import { DatePipe } from './date.pipe';



@NgModule({
  declarations: [
    LoadingPageComponent,
    TextComponent,
    DatePipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    LoadingPageComponent,
    TextComponent,
    DatePipe
  ]
})
export class ToolsModule { }
