import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { AddProdCompComponent } from './simple/add-prod-comp/add-prod-comp.component';
import { DetailsProdCompComponent } from './simple/details-prod-comp/details-prod-comp.component';
import { EditProdCompComponent } from './simple/edit-prod-comp/edit-prod-comp.component';
import { ListProdCompComponent } from './simple/list-prod-comp/list-prod-comp.component';


const routes: Routes = [  {
  path: 'simple/list-prod-comp',
  component: ListProdCompComponent,
  data: {
    title: 'Produit Composant List',
    breadcrumb: "Produit Composant List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-prod-comp',
  component: AddProdCompComponent,
  data: {
    title: 'Add Produit Composant',
    breadcrumb: "Add Produit Composant"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/edit-prod-comp/:id',
  component: EditProdCompComponent,
  data: {
    title: 'Edit Produit Composant',
    breadcrumb: "Edit Produit Composant"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-prod-comp/:id',
  component: DetailsProdCompComponent,
  data: {
    title: 'Details Produit Composant',
    breadcrumb: "Details Produit Composant"
  },
  canActivate: [AuthCheckGuard]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdCompRoutingModule { }
