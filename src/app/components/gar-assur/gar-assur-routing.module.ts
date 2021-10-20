import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { CheckProductExistGuard } from 'src/app/shared/guards/check-product-exist.guard';
import { AddGarAssurComponent } from './simple/add-gar-assur/add-gar-assur.component';
import { DetailsGarAssurComponent } from './simple/details-gar-assur/details-gar-assur.component';
import { EditGarAssurComponent } from './simple/edit-gar-assur/edit-gar-assur.component';
import { ListGarAssurComponent } from './simple/list-gar-assur/list-gar-assur.component';


const routes: Routes = [  {
  path: 'simple/list-gar-assur',
  component: ListGarAssurComponent,
  data: {
    title: 'Garantie Assurance List',
    breadcrumb: "Garantie Assurance List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-gar-assur',
  component: AddGarAssurComponent,
  data: {
    title: 'Add Garantie Assurance',
    breadcrumb: "Add Garantie Assurance"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/edit-gar-assur/:id',
  component: EditGarAssurComponent,
  data: {
    title: 'Edit Garantie Assurance',
    breadcrumb: "EditGarantie Assurance"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-gar-assur/:id',
  component: DetailsGarAssurComponent,
  data: {
    title: 'Details Garantie Assurance',
    breadcrumb: "Details Garantie Assurance"
  },
  canActivate: [AuthCheckGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GarAssurRoutingModule { }
