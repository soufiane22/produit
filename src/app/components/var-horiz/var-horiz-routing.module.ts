import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { AddVarHorizComponent } from './simple/add-var-horiz/add-var-horiz.component';
import { DetailsVarHorizComponent } from './simple/details-var-horiz/details-var-horiz.component';
import { EditVarHorizComponent } from './simple/edit-var-horiz/edit-var-horiz.component';
import { ListVarHorizComponent } from './simple/list-var-horiz/list-var-horiz.component';

const routes: Routes = [  {
  path: 'simple/list-var-horiz',
  component: ListVarHorizComponent,
  data: {
    title: 'Variante Horizontale List',
    breadcrumb: "Variante Horizontale List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-var-horiz',
  component: AddVarHorizComponent,
  data: {
    title: 'Add Variante Horizontale',
    breadcrumb: "Add Variante Horizontale"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/edit-var-horiz/:id',
  component: EditVarHorizComponent,
  data: {
    title: 'Edit Variante Horizontale',
    breadcrumb: "Edit Variante Horizontale"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-var-horiz/:id',
  component: DetailsVarHorizComponent,
  data: {
    title: 'Details Variante Horizontale',
    breadcrumb: "Details Variante Horizontale"
  },
  canActivate: [AuthCheckGuard]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VarHorizRoutingModule { }
