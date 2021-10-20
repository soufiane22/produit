import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstComIntRoutingModule } from './inst-com-int-routing.module';
import { ListInstComIntComponent } from './simple/list-inst-com-int/list-inst-com-int.component';
import { AddInstComIntComponent } from './simple/add-inst-com-int/add-inst-com-int.component';
import { EditInstComIntComponent } from './simple/edit-inst-com-int/edit-inst-com-int.component';
import { DetailsInstComIntComponent } from './simple/details-inst-com-int/details-inst-com-int.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/shared/service/ngb-date.service';




@NgModule({
  declarations: [ListInstComIntComponent, AddInstComIntComponent, EditInstComIntComponent, DetailsInstComIntComponent],
  imports: [
    CommonModule,
    InstComIntRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class InstComIntModule { }
