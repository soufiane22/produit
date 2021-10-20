import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdAssocRoutingModule } from './prod-assoc-routing.module';
import { ListProdAssocComponent } from './simple/list-prod-assoc/list-prod-assoc.component';
import { AddProdAssocComponent } from './simple/add-prod-assoc/add-prod-assoc.component';
import { DetailsProdAssocComponent } from './simple/details-prod-assoc/details-prod-assoc.component';
import { EditProdAssocComponent } from './simple/edit-prod-assoc/edit-prod-assoc.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ToolbarModule } from 'primeng/Toolbar';
import { ButtonModule } from 'primeng/Button';
import {InputTextModule} from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [ListProdAssocComponent, AddProdAssocComponent, DetailsProdAssocComponent, EditProdAssocComponent],
  imports: [
    CommonModule,
    ProdAssocRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,ButtonModule,InputTextModule,ToastModule,TableModule
  ]
})
export class ProdAssocModule { }
