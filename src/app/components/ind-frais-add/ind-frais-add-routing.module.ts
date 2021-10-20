import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { AddIndFraisAddComponent } from './simple/add-ind-frais-add/add-ind-frais-add.component';
import { DetailsIndFraisAddComponent } from './simple/details-ind-frais-add/details-ind-frais-add.component';
import { EditIndFraisAddComponent } from './simple/edit-ind-frais-add/edit-ind-frais-add.component';
import { ListIndFraisAddComponent } from './simple/list-ind-frais-add/list-ind-frais-add.component';


const routes: Routes = [  {
  path: 'simple/list-ind-frais-add',
  component: ListIndFraisAddComponent,
  data: {
    title: 'Indication Frais Additionnel List',
    breadcrumb: "Indication Frais Additionnel List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-ind-frais-add',
  component: AddIndFraisAddComponent,
  data: {
    title: 'Add Indication Frais Additionnel',
    breadcrumb: "Add Indication Frais Additionnel"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/edit-ind-frais-add/:id',
  component: EditIndFraisAddComponent,
  data: {
    title: 'Edit Indication Frais Additionnel',
    breadcrumb: "Edit Indication Frais Additionnel"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-ind-frais-add/:id',
  component: DetailsIndFraisAddComponent,
  data: {
    title: 'Details Indication Frais Additionnel',
    breadcrumb: "Details Indication Frais Additionnel"
  },
  canActivate: [AuthCheckGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndFraisAddRoutingModule { }
