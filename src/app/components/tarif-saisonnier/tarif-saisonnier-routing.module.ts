import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { CheckProductExistGuard } from 'src/app/shared/guards/check-product-exist.guard';
import { DirtyCheckGuard } from 'src/app/shared/guards/dirty-check.guard';
import { AddTarifSaisonnierComponent } from './Simple/add-tarif-saisonnier/add-tarif-saisonnier.component';
import { DetailsTarifSaisonnierComponent } from './Simple/details-tarif-saisonnier/details-tarif-saisonnier.component';
import { EditTarifSaisonnierComponent } from './Simple/edit-tarif-saisonnier/edit-tarif-saisonnier.component';
import { ListTarifSaisonnierComponent } from './Simple/list-tarif-saisonnier/list-tarif-saisonnier.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'simple/list-tarif-saisonnier',
        component: ListTarifSaisonnierComponent,
        data: {
          title: 'Tarif Saisonnier Lists',
          breadcrumb: "Tarif Saisonnier Lists"
        },
        canActivate: [AuthCheckGuard]
      },
      {
        path: 'simple/add-tarif-saisonnier/:id',
        component: AddTarifSaisonnierComponent,
        data: {
          title: 'Add Tarif Saisonnier',
          breadcrumb: "Add Tarif Saisonnier"
        },
        canDeactivate: [DirtyCheckGuard],
        canActivate: [AuthCheckGuard, CheckProductExistGuard]
      },
      {
        path: 'simple/edit-tarif-saisonnier/:id',
        component: EditTarifSaisonnierComponent,
        data: {
          title: 'Edit Tarif Saisonnier',
          breadcrumb: "Edit Tarif Saisonnier"
        },
        canActivate: [AuthCheckGuard]
      },
      {
        path: 'simple/details-tarif-saisonnier/:id',
        component: DetailsTarifSaisonnierComponent,
        data: {
          title: 'Details Tarif Saisonnier',
          breadcrumb: "Details Tarif Saisonnier"
        },
        canActivate: [AuthCheckGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarifSaisonnierRoutingModule { }
