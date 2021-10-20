import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarqueRoutingModule } from './marque-routing.module';
import { AddMarqueComponent } from './simple/add-marque/add-marque.component';
import { ListMarqueComponent } from './simple/list-marque/list-marque.component';
import { DetailsMarqueComponent } from './simple/details-marque/details-marque.component';
import { EditMarqueComponent } from './simple/edit-marque/edit-marque.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/shared/service/ngb-date.service';


@NgModule({
  declarations: [AddMarqueComponent, ListMarqueComponent, DetailsMarqueComponent, EditMarqueComponent],
  imports: [
    CommonModule,
    MarqueRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class MarqueModule { }
