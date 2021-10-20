import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { CheckProductExistGuard } from 'src/app/shared/guards/check-product-exist.guard';
import { AddDistinctionComponent } from './simple/add-distinction/add-distinction.component';
import { DetailsDistinctionComponent } from './simple/details-distinction/details-distinction.component';
import { EditDistinctionComponent } from './simple/edit-distinction/edit-distinction.component';
import { ListDistinctionComponent } from './simple/list-distinction/list-distinction.component';


const routes: Routes = [  {
  path: 'simple/list-distinction',
  component: ListDistinctionComponent,
  data: {
    title: 'Distinction List',
    breadcrumb: "Distinction List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-distinction/:id',
  component: AddDistinctionComponent,
  data: {
    title: 'Add Distinction',
    breadcrumb: "Add Distinction"
  },
  canActivate: [AuthCheckGuard, CheckProductExistGuard]
},
{
  path: 'simple/edit-distinction/:id',
  component: EditDistinctionComponent,
  data: {
    title: 'Edit Distinction',
    breadcrumb: "Edit Distinction"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-distinction/:id',
  component: DetailsDistinctionComponent,
  data: {
    title: 'Details Distinction',
    breadcrumb: "Details Distinction"
  },
  canActivate: [AuthCheckGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistinctionRoutingModule { }
