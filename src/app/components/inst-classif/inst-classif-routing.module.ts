import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { CheckProductExistGuard } from 'src/app/shared/guards/check-product-exist.guard';
import { AddInstClassifComponent } from './simple/add-inst-classif/add-inst-classif.component';
import { DetailsInstClassifComponent } from './simple/details-inst-classif/details-inst-classif.component';
import { EditInstClassifComponent } from './simple/edit-inst-classif/edit-inst-classif.component';
import { ListInstClassifComponent } from './simple/list-inst-classif/list-inst-classif.component';


const routes: Routes = [  {
  path: 'simple/list-inst-classif',
  component: ListInstClassifComponent,
  data: {
    title: 'Instance Classification List',
    breadcrumb: "Instance Classification List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-inst-classif-to-product/:id',
  component: AddInstClassifComponent,
  data: {
    title: 'Add Instance Classification To Product',
    breadcrumb: "Add Instance Classification To Product"
  },
  canActivate: [AuthCheckGuard, CheckProductExistGuard]
},
{
  path: 'simple/edit-inst-classif/:id',
  component: EditInstClassifComponent,
  data: {
    title: 'Edit Instance Classification',
    breadcrumb: "Edit Instance Classification"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-inst-classif/:id',
  component: DetailsInstClassifComponent,
  data: {
    title: 'Details Instance Classification',
    breadcrumb: "Details Instance Classification"
  },
  canActivate: [AuthCheckGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstClassifRoutingModule { }
