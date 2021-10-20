import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../service/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthCheckGuard implements CanActivate {

  constructor(private authService: AuthentificationService, private router: Router) {
    authService.loadUserData();
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authService.loggedIn()) {
      const url = ['/authentification/connexion']
      this.router.navigate(url);
    }
    return this.authService.loggedIn();
  }

}
