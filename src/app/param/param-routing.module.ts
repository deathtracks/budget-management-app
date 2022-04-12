import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ParamPageComponent } from './param-page/param-page.component';

const routes: Routes = [
  {
    path : '',
    component : ParamPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ParamRoutingModule { }
