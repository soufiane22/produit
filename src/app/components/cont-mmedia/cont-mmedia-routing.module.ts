import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { AddContMmediaComponent } from './simple/add-cont-mmedia/add-cont-mmedia.component';
import { DetailsContMmediaComponent } from './simple/details-cont-mmedia/details-cont-mmedia.component';
import { EditContMmediaComponent } from './simple/edit-cont-mmedia/edit-cont-mmedia.component';
import { ListContMmediaComponent } from './simple/list-cont-mmedia/list-cont-mmedia.component';


const routes: Routes = [  {
  path: 'simple/list-cont-mmedia',
  component: ListContMmediaComponent,
  data: {
    title: 'Contenu Multimedia List',
    breadcrumb: "Contenu Multimedia List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-cont-mmedia',
  component: AddContMmediaComponent,
  data: {
    title: 'Add Contenu Multimedia',
    breadcrumb: "Add Contenu Multimedia"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-cont-mmedia/:id',
component: AddContMmediaComponent,
data: {
  title: 'Add Contenu Multimedia',
  breadcrumb: "Add Contenu Multimedia"
},
canActivate: [AuthCheckGuard]
},

{
  path: 'simple/edit-cont-mmedia/:id',
  component: EditContMmediaComponent,
  data: {
    title: 'Edit Contenu Multimedia',
    breadcrumb: "Edit Contenu Multimedia"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-cont-mmedia/:id',
  component: DetailsContMmediaComponent,
  data: {
    title: 'Details Contenu Multimedia',
    breadcrumb: "Details Contenu Multimedia"
  },
  canActivate: [AuthCheckGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContMmediaRoutingModule { }
