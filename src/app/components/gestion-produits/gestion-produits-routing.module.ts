import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { CheckProductExistGuard } from 'src/app/shared/guards/check-product-exist.guard';
import { DirtyCheckGuard } from 'src/app/shared/guards/dirty-check.guard';
import { AddProduitComponent } from './simple/add-produit/add-produit.component';
import { DetailsProduitComponent } from './simple/details-produit/details-produit.component';
import { EditProduitComponent } from './simple/edit-produit/edit-produit.component';
import { ListProduitsComponent } from './simple/list-produits/list-produits.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'simple/list-produits',
        component: ListProduitsComponent,
        data: {
          title: 'Produits Lists',
          breadcrumb: "Produits Lists"
        },
        canActivate: [AuthCheckGuard]
      },
      {
        path: 'simple/add-produit',
        component: AddProduitComponent,
        data: {
          title: 'Add Produit',
          breadcrumb: "Add Produit"
        },
        canDeactivate: [DirtyCheckGuard],
        canActivate: [AuthCheckGuard]
      },
      {
        path: 'simple/edit-produit/:id',
        component: EditProduitComponent,
        data: {
          title: 'Edit Produit',
          breadcrumb: "Edit Produit"
        },
        canActivate: [AuthCheckGuard, CheckProductExistGuard,]
      },
      {
        path: 'simple/details-produit/:id',
        component: DetailsProduitComponent,
        data: {
          title: 'Details Produit',
          breadcrumb: "Details Produit"
        },
        canActivate: [AuthCheckGuard, CheckProductExistGuard,]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionProduitsRoutingModule { }
