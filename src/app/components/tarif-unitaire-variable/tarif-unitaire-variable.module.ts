import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { TarifUnitaireVariableRoutingModule } from './tarif-unitaire-variable-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddTarifUnitaireVariableComponent } from './simple/add-tarif-unitaire-variable/add-tarif-unitaire-variable.component';
import { EditTarifUnitaireVariableComponent } from './simple/edit-tarif-unitaire-variable/edit-tarif-unitaire-variable.component';
import { ListTarifUnitaireVariableComponent } from './simple/list-tarif-unitaire-variable/list-tarif-unitaire-variable.component';
import { DetailsTarifUnitaireVariableComponent } from './simple/details-tarif-unitaire-variable/details-tarif-unitaire-variable.component';


@NgModule({
  declarations: [AddTarifUnitaireVariableComponent, EditTarifUnitaireVariableComponent, ListTarifUnitaireVariableComponent, DetailsTarifUnitaireVariableComponent],
  imports: [
    CommonModule,
    TarifUnitaireVariableRoutingModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    SharedModule
  ]
})
export class TarifUnitaireVariableModule { }
