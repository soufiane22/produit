import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { InstClassifRoutingModule } from './inst-classif-routing.module';
import { AddInstClassifComponent } from './simple/add-inst-classif/add-inst-classif.component';
import { EditInstClassifComponent } from './simple/edit-inst-classif/edit-inst-classif.component';
import { ListInstClassifComponent } from './simple/list-inst-classif/list-inst-classif.component';
import { DetailsInstClassifComponent } from './simple/details-inst-classif/details-inst-classif.component';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/shared/service/ngb-date.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [AddInstClassifComponent, EditInstClassifComponent, ListInstClassifComponent, DetailsInstClassifComponent],
  imports: [
    CommonModule,
    InstClassifRoutingModule,
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
export class InstClassifModule { }
