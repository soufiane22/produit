import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DistinctionRoutingModule } from './distinction-routing.module';
import { AddDistinctionComponent } from './simple/add-distinction/add-distinction.component';
import { EditDistinctionComponent } from './simple/edit-distinction/edit-distinction.component';
import { DetailsDistinctionComponent } from './simple/details-distinction/details-distinction.component';
import { ListDistinctionComponent } from './simple/list-distinction/list-distinction.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepicker, NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/shared/service/ngb-date.service';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { ToolbarModule } from 'primeng/Toolbar';
import { ButtonModule } from 'primeng/Button';
import {InputTextModule} from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast'

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
  acceptedFiles: 'image/*'
};


@NgModule({
  declarations: [AddDistinctionComponent, EditDistinctionComponent, DetailsDistinctionComponent, ListDistinctionComponent],
  imports: [
    CommonModule,
    DistinctionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DropzoneModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    ToastModule
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
    {provide: DROPZONE_CONFIG, useValue: DEFAULT_DROPZONE_CONFIG}
  ]
})
export class DistinctionModule { }
