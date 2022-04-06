import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsConnectedGuard } from './guard/is-connected.guard';

const routes: Routes = [
  {
    path : 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'home',
    canActivate: [IsConnectedGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'month',
    canActivate: [IsConnectedGuard],
    loadChildren: () => import('./month/month.module').then(m => m.MonthModule)
  },
  {
    path: 'obj',
    canActivate: [IsConnectedGuard],
    loadChildren: () => import('./objectif/objectif.module').then(m => m.ObjectifModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
