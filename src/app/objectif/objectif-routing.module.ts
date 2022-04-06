import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ObjListComponent } from './obj-list/obj-list.component';
import { ObjSinglePageComponent } from './obj-single-page/obj-single-page.component';

const routes: Routes = [
  {
    path : '',
    component : ObjListComponent
  },
  {
    path :':id',
    component: ObjSinglePageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ObjectifRoutingModule { }
