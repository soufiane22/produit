import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { InstCaractVarRoutingModule } from './inst-caract-var-routing.module';
import { AddInstCaractVarComponent } from './simple/add-inst-caract-var/add-inst-caract-var.component';
import { EditInstCaractVarComponent } from './simple/edit-inst-caract-var/edit-inst-caract-var.component';
import { DetailsInstCaractVarComponent } from './simple/details-inst-caract-var/details-inst-caract-var.component';
import { ListInstCaractVarComponent } from './simple/list-inst-caract-var/list-inst-caract-var.component';


@NgModule({
  declarations: [AddInstCaractVarComponent, EditInstCaractVarComponent, DetailsInstCaractVarComponent, ListInstCaractVarComponent],
  imports: [
    CommonModule,
    InstCaractVarRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class InstCaractVarModule { }
