import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepicker, NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';



import { AnnotationRoutingModule } from './annotation-routing.module';
import { AddAnnotationComponent } from './simple/add-annotation/add-annotation.component';
import { EditAnnotationComponent } from './simple/edit-annotation/edit-annotation.component';
import { DetailsAnnotationComponent } from './simple/details-annotation/details-annotation.component';
import { ListAnnotationsComponent } from './simple/list-annotations/list-annotations.component';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/shared/service/ngb-date.service';


@NgModule({
  declarations: [AddAnnotationComponent, EditAnnotationComponent, DetailsAnnotationComponent, ListAnnotationsComponent],
  imports: [
    CommonModule,
    AnnotationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class AnnotationModule { }
