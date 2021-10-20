import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndPromoRoutingModule } from './ind-promo-routing.module';
import { AddIndPromoComponent } from './simple/add-ind-promo/add-ind-promo.component';
import { EditIndPromoComponent } from './simple/edit-ind-promo/edit-ind-promo.component';
import { DetailsIndPromoComponent } from './simple/details-ind-promo/details-ind-promo.component';
import { ListIndPromoComponent } from './simple/list-ind-promo/list-ind-promo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/shared/service/ngb-date.service';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AddIndPromoComponent, EditIndPromoComponent, DetailsIndPromoComponent, ListIndPromoComponent],
  imports: [
    CommonModule,
    IndPromoRoutingModule,
    NgbModule,
    SharedModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
  ]
})
export class IndPromoModule { }
