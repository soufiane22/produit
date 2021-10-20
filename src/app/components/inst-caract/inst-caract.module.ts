import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { InstCaractRoutingModule } from './inst-caract-routing.module';
import { AddInstCaractComponent } from './simple/add-inst-caract/add-inst-caract.component';
import { EditInstCaractComponent } from './simple/edit-inst-caract/edit-inst-caract.component';
import { DetailsInstCaractComponent } from './simple/details-inst-caract/details-inst-caract.component';
import { ListInstCaractComponent } from './simple/list-inst-caract/list-inst-caract.component';


@NgModule({
  declarations: [AddInstCaractComponent, EditInstCaractComponent, DetailsInstCaractComponent, ListInstCaractComponent],
  imports: [
    CommonModule,
    InstCaractRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class InstCaractModule { }
