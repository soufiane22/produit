import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { CheckProductExistGuard } from 'src/app/shared/guards/check-product-exist.guard';
import { AddIndStockComponent } from './simple/add-ind-stock/add-ind-stock.component';
import { DetailsIndStockComponent } from './simple/details-ind-stock/details-ind-stock.component';
import { EditIndStockComponent } from './simple/edit-ind-stock/edit-ind-stock.component';
import { ListIndStockComponent } from './simple/list-ind-stock/list-ind-stock.component';


const routes: Routes = [  {
  path: 'simple/list-ind-stock',
  component: ListIndStockComponent,
  data: {
    title: 'Indication Stock List',
    breadcrumb: "Indication Stock List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-ind-stock',
  component: AddIndStockComponent,
  data: {
    title: 'Add Indication Stock',
    breadcrumb: "Add Indication Stock"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/edit-ind-stock/:id',
  component: EditIndStockComponent,
  data: {
    title: 'Edit Indication Stock',
    breadcrumb: "Edit Indication Stock"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-ind-stock/:id',
  component: DetailsIndStockComponent,
  data: {
    title: 'Details Indication Stock',
    breadcrumb: "Details Indication Stock"
  },
  canActivate: [AuthCheckGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndStockRoutingModule { }
