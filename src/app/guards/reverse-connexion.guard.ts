import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/base/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReverseConnexionGuard implements CanActivate {

  constructor(
    private auth: AuthService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.isUserLogedIn()){
        return false;
      } else {
        return true;
      }
  }
}
