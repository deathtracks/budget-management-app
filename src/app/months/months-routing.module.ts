import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthListComponent } from './month-list/month-list.component';

const routes: Routes = [
  {
    path: '',
    component: MonthListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthRoutingModule {}
