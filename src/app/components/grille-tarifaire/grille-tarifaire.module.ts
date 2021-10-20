import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { GrilleTarifaireRoutingModule } from './grille-tarifaire-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddGrilleTarifaireComponent } from './simple/add-grille-tarifaire/add-grille-tarifaire.component';
import { EditGrilleTarifaireComponent } from './simple/edit-grille-tarifaire/edit-grille-tarifaire.component';
import { DetailsGrilleTarifaireComponent } from './simple/details-grille-tarifaire/details-grille-tarifaire.component';
import { ListGrilleTarifaireComponent } from './simple/list-grille-tarifaire/list-grille-tarifaire.component';


@NgModule({
  declarations: [AddGrilleTarifaireComponent, EditGrilleTarifaireComponent, DetailsGrilleTarifaireComponent, ListGrilleTarifaireComponent],
  imports: [
    CommonModule,
    GrilleTarifaireRoutingModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    SharedModule
  ]
})
export class GrilleTarifaireModule { }
