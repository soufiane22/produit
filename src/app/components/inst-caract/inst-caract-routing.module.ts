import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { CheckProductExistGuard } from 'src/app/shared/guards/check-product-exist.guard';
import { AddInstCaractComponent } from './simple/add-inst-caract/add-inst-caract.component';
import { DetailsInstCaractComponent } from './simple/details-inst-caract/details-inst-caract.component';
import { EditInstCaractComponent } from './simple/edit-inst-caract/edit-inst-caract.component';
import { ListInstCaractComponent } from './simple/list-inst-caract/list-inst-caract.component';


const routes: Routes = [{
  path: 'simple/list-inst-caract',
  component: ListInstCaractComponent,
  data: {
    title: 'Instance Caracteristique List',
    breadcrumb: "Instance Caracteristique List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-inst-caract-to-product/:id',
  component: AddInstCaractComponent,
  data: {
    title: 'Add Instance Caracteristique To Product',
    breadcrumb: "Add Instance Caracteristique To Product"
  },
  canActivate: [AuthCheckGuard, CheckProductExistGuard]
},
{
  path: 'simple/edit-inst-caract/:id',
  component: EditInstCaractComponent,
  data: {
    title: 'Edit Instance Caracteristique',
    breadcrumb: "Edit Instance Caracteristique"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-inst-caract/:id',
  component: DetailsInstCaractComponent,
  data: {
    title: 'Details Instance Caracteristique',
    breadcrumb: "Details Instance Caracteristique"
  },
  canActivate: [AuthCheckGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstCaractRoutingModule { }
