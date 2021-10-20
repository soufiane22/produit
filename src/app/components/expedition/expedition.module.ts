import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpeditionRoutingModule } from './expedition-routing.module';
import { AddExpeditionComponent } from './simple/add-expedition/add-expedition.component';
import { EditExpeditionComponent } from './simple/edit-expedition/edit-expedition.component';
import { DetailsExpeditionComponent } from './simple/details-expedition/details-expedition.component';
import { ListExpeditionComponent } from './simple/list-expedition/list-expedition.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [AddExpeditionComponent, EditExpeditionComponent, DetailsExpeditionComponent, ListExpeditionComponent],
  imports: [
    CommonModule,
    ExpeditionRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ExpeditionModule { }
