import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { CheckProductExistGuard } from 'src/app/shared/guards/check-product-exist.guard';
import { AddMonteeEnGammeComponent } from './simple/add-montee-en-gamme/add-montee-en-gamme.component';
import { DetailsMonteeEnGammeComponent } from './simple/details-montee-en-gamme/details-montee-en-gamme.component';
import { EditMonteeEnGammeComponent } from './simple/edit-montee-en-gamme/edit-montee-en-gamme.component';
import { ListMonteeEnGammeComponent } from './simple/list-montee-en-gamme/list-montee-en-gamme.component';


const routes: Routes = [  {
  path: 'simple/list-montee-en-gamme',
  component: ListMonteeEnGammeComponent,
  data: {
    title: 'Montee En Gamme List',
    breadcrumb: "Montee En Gamme List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-montee-en-gamme/:id',
  component: AddMonteeEnGammeComponent,
  data: {
    title: 'Add Montee En Gamme',
    breadcrumb: "Add Montee En Gamme"
  },
  canActivate: [AuthCheckGuard, CheckProductExistGuard]
},
{
  path: 'simple/edit-montee-en-gamme/:id',
  component: EditMonteeEnGammeComponent,
  data: {
    title: 'Edit Montee En Gamme',
    breadcrumb: "Edit Montee En Gamme"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-montee-en-gamme/:id',
  component: DetailsMonteeEnGammeComponent,
  data: {
    title: 'Details Montee En Gamme',
    breadcrumb: "Details Montee En Gamme"
  },
  canActivate: [AuthCheckGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonteeEnGammeRoutingModule { }
