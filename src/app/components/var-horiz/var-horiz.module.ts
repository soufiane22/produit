import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VarHorizRoutingModule } from './var-horiz-routing.module';
import { ListVarHorizComponent } from './simple/list-var-horiz/list-var-horiz.component';
import { AddVarHorizComponent } from './simple/add-var-horiz/add-var-horiz.component';
import { EditVarHorizComponent } from './simple/edit-var-horiz/edit-var-horiz.component';
import { DetailsVarHorizComponent } from './simple/details-var-horiz/details-var-horiz.component';


@NgModule({
  declarations: [ListVarHorizComponent, AddVarHorizComponent, EditVarHorizComponent, DetailsVarHorizComponent],
  imports: [
    CommonModule,
    VarHorizRoutingModule
  ]
})
export class VarHorizModule { }
