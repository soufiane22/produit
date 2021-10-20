import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProduitSimpleService } from '../service/produit-simple/produit-simple.service';

@Injectable({
  providedIn: 'root'
})
export class CheckProductExistGuard implements CanActivate {
  public res: boolean;
  public msg: string = "";
  constructor(private router: Router, private psService: ProduitSimpleService, private toastr: ToastrService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = next.params.id;
    if (!id) {
      this.res = false;
    } else {
      if (this.psService.produitExists(id)) {
        this.res = true;
      }else{
        this.res = false;
      }
    }
    if (!this.res) {
      const listUrl = ['gestion-produits/simple/list-produits'];
      this.router.navigate(listUrl);
    }
    return this.res;
  }

}
