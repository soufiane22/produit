import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdCompRoutingModule } from './prod-comp-routing.module';
import { ListProdCompComponent } from './simple/list-prod-comp/list-prod-comp.component';
import { AddProdCompComponent } from './simple/add-prod-comp/add-prod-comp.component';
import { EditProdCompComponent } from './simple/edit-prod-comp/edit-prod-comp.component';
import { DetailsProdCompComponent } from './simple/details-prod-comp/details-prod-comp.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';

import { NgbDatepicker, NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/shared/service/ngb-date.service';

import { ToolbarModule } from 'primeng/Toolbar';
import { ButtonModule } from 'primeng/Button';
import {InputTextModule} from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import {TableModule} from 'primeng/table';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};


@NgModule({
  declarations: [ListProdCompComponent, AddProdCompComponent, EditProdCompComponent, DetailsProdCompComponent],
  imports: [
    CommonModule,
    ProdCompRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    TableModule
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
    {provide: DROPZONE_CONFIG, useValue: DEFAULT_DROPZONE_CONFIG}

  ]
})
export class ProdCompModule { }
