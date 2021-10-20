import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { CheckProductExistGuard } from 'src/app/shared/guards/check-product-exist.guard';
import { AddExpeditionComponent } from './simple/add-expedition/add-expedition.component';
import { DetailsExpeditionComponent } from './simple/details-expedition/details-expedition.component';
import { EditExpeditionComponent } from './simple/edit-expedition/edit-expedition.component';
import { ListExpeditionComponent } from './simple/list-expedition/list-expedition.component';


const routes: Routes = [  {
  path: 'simple/list-expedition',
  component: ListExpeditionComponent,
  data: {
    title: 'Expedition List',
    breadcrumb: "Expedition List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-expedition',
  component: AddExpeditionComponent,
  data: {
    title: 'Add Expedition',
    breadcrumb: "Add Expedition"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/edit-expedition/:id',
  component: EditExpeditionComponent,
  data: {
    title: 'Edit Expedition',
    breadcrumb: "Edit Expedition"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-expedition/:id',
  component: DetailsExpeditionComponent,
  data: {
    title: 'Details Expedition',
    breadcrumb: "Details Expedition"
  },
  canActivate: [AuthCheckGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpeditionRoutingModule { }
