import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConnexionGuard } from './guards/connexion.guard';
import { ReverseConnexionGuard } from './guards/reverse-connexion.guard';
import { LoadingComponent } from './tools/loading/loading.component';
import { UserSettingsModule } from './user-settings/user-settings.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'months',
    pathMatch: 'full'
  },
  {
    path: 'loading',
    component: LoadingComponent
  },
  {
    path: 'connexion',
    canActivate: [ReverseConnexionGuard],
    loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  {
    path: 'months',
    canActivate: [ConnexionGuard],
    loadChildren: () => import('./months/months.module').then(m => m.MonthsModule)
  },
  {
    path: 'settings',
    canActivate: [ConnexionGuard],
    loadChildren: () => import('./user-settings/user-settings.module').then(m => UserSettingsModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
