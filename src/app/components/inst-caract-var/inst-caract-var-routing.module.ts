import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { CheckProductExistGuard } from 'src/app/shared/guards/check-product-exist.guard';
import { AddInstCaractVarComponent } from './simple/add-inst-caract-var/add-inst-caract-var.component';
import { DetailsInstCaractVarComponent } from './simple/details-inst-caract-var/details-inst-caract-var.component';
import { EditInstCaractVarComponent } from './simple/edit-inst-caract-var/edit-inst-caract-var.component';
import { ListInstCaractVarComponent } from './simple/list-inst-caract-var/list-inst-caract-var.component';


const routes: Routes = [  {
  path: 'simple/list-inst-caract-var',
  component: ListInstCaractVarComponent,
  data: {
    title: 'Instance Caracteristique Variante List',
    breadcrumb: "Instance Caracteristique Variante List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-inst-caract-var',
  component: AddInstCaractVarComponent,
  data: {
    title: 'Add Instance Caracteristique Variante',
    breadcrumb: "Add Instance Caracteristique Variante"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/edit-inst-caract-var/:id',
  component: EditInstCaractVarComponent,
  data: {
    title: 'Edit Instance Caracteristique Variante',
    breadcrumb: "Edit Instance Caracteristique Variante"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-inst-caract-var/:id',
  component: DetailsInstCaractVarComponent,
  data: {
    title: 'Details Instance Caracteristique Variante',
    breadcrumb: "Details Instance Caracteristique Variante"
  },
  canActivate: [AuthCheckGuard]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstCaractVarRoutingModule { }
