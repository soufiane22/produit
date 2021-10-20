import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndFraisAddRoutingModule } from './ind-frais-add-routing.module';
import { AddIndFraisAddComponent } from './simple/add-ind-frais-add/add-ind-frais-add.component';
import { EditIndFraisAddComponent } from './simple/edit-ind-frais-add/edit-ind-frais-add.component';
import { DetailsIndFraisAddComponent } from './simple/details-ind-frais-add/details-ind-frais-add.component';
import { ListIndFraisAddComponent } from './simple/list-ind-frais-add/list-ind-frais-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AddIndFraisAddComponent, EditIndFraisAddComponent, DetailsIndFraisAddComponent, ListIndFraisAddComponent],
  imports: [
    CommonModule,
    IndFraisAddRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ]
})
export class IndFraisAddModule { }
