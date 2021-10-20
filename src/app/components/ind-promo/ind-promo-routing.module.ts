import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { CheckProductExistGuard } from 'src/app/shared/guards/check-product-exist.guard';
import { AddIndPromoComponent } from './simple/add-ind-promo/add-ind-promo.component';
import { DetailsIndPromoComponent } from './simple/details-ind-promo/details-ind-promo.component';
import { EditIndPromoComponent } from './simple/edit-ind-promo/edit-ind-promo.component';
import { ListIndPromoComponent } from './simple/list-ind-promo/list-ind-promo.component';


const routes: Routes = [  {
  path: 'simple/list-ind-promo',
  component: ListIndPromoComponent,
  data: {
    title: 'Indication Promo List',
    breadcrumb: "Indication Promo List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-ind-promo',
  component: AddIndPromoComponent,
  data: {
    title: 'Add Indication Promo',
    breadcrumb: "Add Indication Promo"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/edit-ind-promo/:id',
  component: EditIndPromoComponent,
  data: {
    title: 'Edit Indication Promo',
    breadcrumb: "Edit Indication Promo"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-ind-promo/:id',
  component: DetailsIndPromoComponent,
  data: {
    title: 'Details Indication Promo',
    breadcrumb: "Details Indication Promo"
  },
  canActivate: [AuthCheckGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndPromoRoutingModule { }
