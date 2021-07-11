import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConnexionGuard } from './guards/connexion.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'months',
    pathMatch: 'full'
  },
  {
    path: 'connexion',
    loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  {
    path: 'months',
    canActivate: [ConnexionGuard],
    loadChildren: () => import('./months/months.module').then(m => m.MonthsModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
