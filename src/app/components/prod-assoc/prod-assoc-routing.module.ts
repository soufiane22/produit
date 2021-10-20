import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { AddProdAssocComponent } from './simple/add-prod-assoc/add-prod-assoc.component';
import { DetailsProdAssocComponent } from './simple/details-prod-assoc/details-prod-assoc.component';
import { EditProdAssocComponent } from './simple/edit-prod-assoc/edit-prod-assoc.component';
import { ListProdAssocComponent } from './simple/list-prod-assoc/list-prod-assoc.component';


const routes: Routes = [  {
  path: 'simple/list-prod-assoc',
  component: ListProdAssocComponent,
  data: {
    title: 'Produit Associé List',
    breadcrumb: "Produit Associé List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-prod-assoc',
  component: AddProdAssocComponent,
  data: {
    title: 'Add Produit Associé',
    breadcrumb: "Add Produit Associé"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/edit-prod-assoc/:id',
  component: EditProdAssocComponent,
  data: {
    title: 'Edit Produit Associé',
    breadcrumb: "Edit Produit Associé"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-prod-assoc/:id',
  component: DetailsProdAssocComponent,
  data: {
    title: 'Details Produit Associé',
    breadcrumb: "Details Produit Associé"
  },
  canActivate: [AuthCheckGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdAssocRoutingModule { }
