import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { CheckProductExistGuard } from 'src/app/shared/guards/check-product-exist.guard';
import { AddCritereCalculableComponent } from './simple/add-critere-calculable/add-critere-calculable.component';
import { DetailsCritereCalculableComponent } from './simple/details-critere-calculable/details-critere-calculable.component';
import { EditCritereCalculableComponent } from './simple/edit-critere-calculable/edit-critere-calculable.component';
import { ListCritereCalculableComponent } from './simple/list-critere-calculable/list-critere-calculable.component';


const routes: Routes = [  {
  path: 'simple/list-critere-calculable',
  component: ListCritereCalculableComponent,
  data: {
    title: 'Critere Calculable List',
    breadcrumb: "Critere Calculable List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-critere-calculable/:id',
  component: AddCritereCalculableComponent,
  data: {
    title: 'Add Critere Calculable',
    breadcrumb: "Add Critere Calculable"
  },
  canActivate: [AuthCheckGuard, CheckProductExistGuard]
},
{
  path: 'simple/edit-critere-calculable/:id',
  component: EditCritereCalculableComponent,
  data: {
    title: 'Edit Critere Calculable',
    breadcrumb: "Edit Critere Calculable"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-critere-calculable/:id',
  component: DetailsCritereCalculableComponent,
  data: {
    title: 'Details Critere Calculable',
    breadcrumb: "Details Critere Calculable"
  },
  canActivate: [AuthCheckGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CritereCalculableRoutingModule { }
