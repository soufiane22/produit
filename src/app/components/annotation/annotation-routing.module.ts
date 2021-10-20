import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { CheckProductExistGuard } from 'src/app/shared/guards/check-product-exist.guard';
import { AddAnnotationComponent } from './simple/add-annotation/add-annotation.component';
import { DetailsAnnotationComponent } from './simple/details-annotation/details-annotation.component';
import { EditAnnotationComponent } from './simple/edit-annotation/edit-annotation.component';
import { ListAnnotationsComponent } from './simple/list-annotations/list-annotations.component';


const routes: Routes = [  {
  path: 'simple/list-annotation',
  component: ListAnnotationsComponent,
  data: {
    title: 'Annotation List',
    breadcrumb: "Annotation List"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/add-annotation/:id',
  component: AddAnnotationComponent,
  data: {
    title: 'Add Annotation',
    breadcrumb: "Add Annotation"
  },
  canActivate: [AuthCheckGuard, CheckProductExistGuard]
},
{
  path: 'simple/edit-annotation/:id',
  component: EditAnnotationComponent,
  data: {
    title: 'Edit Annotation',
    breadcrumb: "Edit Annotation"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'simple/details-annotation/:id',
  component: DetailsAnnotationComponent,
  data: {
    title: 'Details Annotation',
    breadcrumb: "Details Annotation"
  },
  canActivate: [AuthCheckGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnotationRoutingModule { }
