import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndStockRoutingModule } from './ind-stock-routing.module';
import { AddIndStockComponent } from './simple/add-ind-stock/add-ind-stock.component';
import { EditIndStockComponent } from './simple/edit-ind-stock/edit-ind-stock.component';
import { DetailsIndStockComponent } from './simple/details-ind-stock/details-ind-stock.component';
import { ListIndStockComponent } from './simple/list-ind-stock/list-ind-stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [AddIndStockComponent, EditIndStockComponent, DetailsIndStockComponent, ListIndStockComponent],
  imports: [
    CommonModule,
    IndStockRoutingModule,
    FormsModule, ReactiveFormsModule,
    SharedModule,
    NgbModule
  ]
})
export class IndStockModule { }
