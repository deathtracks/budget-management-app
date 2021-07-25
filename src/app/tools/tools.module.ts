import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { TextComponent } from './translation/text/text.component';
import { DatePipe } from './date.pipe';
import { RoundedPipe } from './rounded.pipe';



@NgModule({
  declarations: [
    LoadingPageComponent,
    TextComponent,
    DatePipe,
    RoundedPipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    LoadingPageComponent,
    TextComponent,
    DatePipe,
    RoundedPipe
  ]
})
export class ToolsModule { }
