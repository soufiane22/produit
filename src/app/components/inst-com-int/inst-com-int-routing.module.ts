import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { AddInstComIntComponent } from './simple/add-inst-com-int/add-inst-com-int.component';
import { DetailsInstComIntComponent } from './simple/details-inst-com-int/details-inst-com-int.component';
import { EditInstComIntComponent } from './simple/edit-inst-com-int/edit-inst-com-int.component';
import { ListInstComIntComponent } from './simple/list-inst-com-int/list-inst-com-int.component';


const routes: Routes = [  {
  path: 'simple/list-inst-com-int',
  component: ListInstComIntComponent,
  data: {
    title: 'Instance Commentaire Interne List',
    breadcrumb: "Instance Commentaire Interne List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-inst-com-int',
  component: AddInstComIntComponent,
  data: {
    title: 'Add Instance Commentaire Interne',
    breadcrumb: "Add Instance Commentaire Interne"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/edit-inst-com-int/:id',
  component: EditInstComIntComponent,
  data: {
    title: 'Edit Instance Commentaire Interne',
    breadcrumb: "Edit Instance Commentaire Interne"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-inst-com-int/:id',
  component: DetailsInstComIntComponent,
  data: {
    title: 'Details Instance Commentaire Interne',
    breadcrumb: "Details Instance Commentaire Interne"
  },
  canActivate: [AuthCheckGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstComIntRoutingModule { }
