import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { CheckProductExistGuard } from 'src/app/shared/guards/check-product-exist.guard';
import { AddTarifUnitaireVariableComponent } from './simple/add-tarif-unitaire-variable/add-tarif-unitaire-variable.component';
import { DetailsTarifUnitaireVariableComponent } from './simple/details-tarif-unitaire-variable/details-tarif-unitaire-variable.component';
import { EditTarifUnitaireVariableComponent } from './simple/edit-tarif-unitaire-variable/edit-tarif-unitaire-variable.component';
import { ListTarifUnitaireVariableComponent } from './simple/list-tarif-unitaire-variable/list-tarif-unitaire-variable.component';


const routes: Routes = [  {
  path: 'simple/list-tarif-unitaire-variable',
  component: ListTarifUnitaireVariableComponent,
  data: {
    title: 'Tarif Unitaire Variable List',
    breadcrumb: "Tarif Unitaire Variable List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-tarif-unitaire-variable/:id',
  component: AddTarifUnitaireVariableComponent,
  data: {
    title: 'Add Tarif Unitaire Variable',
    breadcrumb: "Add Tarif Unitaire Variable"
  },
  canActivate: [AuthCheckGuard, CheckProductExistGuard]
},
{
  path: 'simple/edit-tarif-unitaire-variable/:id',
  component: EditTarifUnitaireVariableComponent,
  data: {
    title: 'Edit Tarif Unitaire Variable',
    breadcrumb: "Edit Tarif Unitaire Variable"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-tarif-unitaire-variable/:id',
  component: DetailsTarifUnitaireVariableComponent,
  data: {
    title: 'Details Tarif Unitaire Variable',
    breadcrumb: "Details Tarif Unitaire Variable"
  },
  canActivate: [AuthCheckGuard]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarifUnitaireVariableRoutingModule { }
