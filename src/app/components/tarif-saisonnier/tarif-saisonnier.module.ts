import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TarifSaisonnierRoutingModule } from './tarif-saisonnier-routing.module';
import { AddTarifSaisonnierComponent } from './Simple/add-tarif-saisonnier/add-tarif-saisonnier.component';
import { EditTarifSaisonnierComponent } from './Simple/edit-tarif-saisonnier/edit-tarif-saisonnier.component';
import { ListTarifSaisonnierComponent } from './Simple/list-tarif-saisonnier/list-tarif-saisonnier.component';
import { DetailsTarifSaisonnierComponent } from './Simple/details-tarif-saisonnier/details-tarif-saisonnier.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AddTarifSaisonnierComponent, EditTarifSaisonnierComponent, ListTarifSaisonnierComponent, DetailsTarifSaisonnierComponent],
  imports: [
    CommonModule,
    TarifSaisonnierRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    NgbModule
  ]
})
export class TarifSaisonnierModule { }
