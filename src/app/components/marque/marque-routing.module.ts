import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { AddMarqueComponent } from './simple/add-marque/add-marque.component';
import { DetailsMarqueComponent } from './simple/details-marque/details-marque.component';
import { EditMarqueComponent } from './simple/edit-marque/edit-marque.component';
import { ListMarqueComponent } from './simple/list-marque/list-marque.component';


const routes: Routes = [  {
  path: 'simple/list-marque',
  component: ListMarqueComponent,
  data: {
    title: 'Marque List',
    breadcrumb: "Marque List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-marque',
  component: AddMarqueComponent,
  data: {
    title: 'Add Marque',
    breadcrumb: "Add Marque"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/edit-marque/:id',
  component: EditMarqueComponent,
  data: {
    title: 'Edit Marque',
    breadcrumb: "Edit Marque"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-marque/:id',
  component: DetailsMarqueComponent,
  data: {
    title: 'Details Marque',
    breadcrumb: "Details Marque"
  },
  canActivate: [AuthCheckGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarqueRoutingModule { }
