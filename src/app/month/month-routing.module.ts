import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SingleMonthComponent } from './single-month/single-month.component';

const routes: Routes = [
  {
    path : ':id',
    component : SingleMonthComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MonthRoutingModule { }
