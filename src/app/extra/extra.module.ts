import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DateInputComponent } from './date-input/date-input.component';
import { DateModalComponent } from './date-modal/date-modal.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { FloatingBtnComponent } from './floating-btn/floating-btn.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    DateInputComponent,
    DateModalComponent,
    ProgressBarComponent,
    FloatingBtnComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    DateInputComponent,
    DateModalComponent,
    ProgressBarComponent,
    FloatingBtnComponent
  ]
})
export class ExtraModule { }
