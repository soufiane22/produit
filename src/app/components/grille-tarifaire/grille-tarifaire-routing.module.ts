import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { CheckProductExistGuard } from 'src/app/shared/guards/check-product-exist.guard';
import { AddGrilleTarifaireComponent } from './simple/add-grille-tarifaire/add-grille-tarifaire.component';
import { DetailsGrilleTarifaireComponent } from './simple/details-grille-tarifaire/details-grille-tarifaire.component';
import { EditGrilleTarifaireComponent } from './simple/edit-grille-tarifaire/edit-grille-tarifaire.component';
import { ListGrilleTarifaireComponent } from './simple/list-grille-tarifaire/list-grille-tarifaire.component';


const routes: Routes = [  {
  path: 'simple/list-grille-tarifaire',
  component: ListGrilleTarifaireComponent,
  data: {
    title: 'Grille Tarifaire List',
    breadcrumb: "Grille Tarifaire List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-grille-tarifaire/:id',
  component: AddGrilleTarifaireComponent,
  data: {
    title: 'Add Grille Tarifaire',
    breadcrumb: "Add Grille Tarifaire"
  },
  canActivate: [AuthCheckGuard, CheckProductExistGuard]
},
{
  path: 'simple/edit-grille-tarifaire/:id',
  component: EditGrilleTarifaireComponent,
  data: {
    title: 'Edit Grille Tarifaire',
    breadcrumb: "Edit Grille Tarifaire"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-grille-tarifaire/:id',
  component: DetailsGrilleTarifaireComponent,
  data: {
    title: 'Details Grille Tarifaire',
    breadcrumb: "Details Grille Tarifaire"
  },
  canActivate: [AuthCheckGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrilleTarifaireRoutingModule { }
