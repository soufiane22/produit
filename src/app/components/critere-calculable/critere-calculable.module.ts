import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { CritereCalculableRoutingModule } from './critere-calculable-routing.module';
import { AddCritereCalculableComponent } from './simple/add-critere-calculable/add-critere-calculable.component';
import { EditCritereCalculableComponent } from './simple/edit-critere-calculable/edit-critere-calculable.component';
import { DetailsCritereCalculableComponent } from './simple/details-critere-calculable/details-critere-calculable.component';
import { ListCritereCalculableComponent } from './simple/list-critere-calculable/list-critere-calculable.component';


@NgModule({
  declarations: [AddCritereCalculableComponent, EditCritereCalculableComponent, DetailsCritereCalculableComponent, ListCritereCalculableComponent],
  imports: [
    CommonModule,
    CritereCalculableRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
    
  ]
})
export class CritereCalculableModule { }
