import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GarAssurRoutingModule } from './gar-assur-routing.module';
import { ListGarAssurComponent } from './simple/list-gar-assur/list-gar-assur.component';
import { AddGarAssurComponent } from './simple/add-gar-assur/add-gar-assur.component';
import { EditGarAssurComponent } from './simple/edit-gar-assur/edit-gar-assur.component';
import { DetailsGarAssurComponent } from './simple/details-gar-assur/details-gar-assur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/shared/service/ngb-date.service';


@NgModule({
  declarations: [ListGarAssurComponent, AddGarAssurComponent, EditGarAssurComponent, DetailsGarAssurComponent],
  imports: [
    CommonModule,
    GarAssurRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class GarAssurModule { }
