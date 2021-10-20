import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionUtilisateursRoutingModule } from './gestion-utilisateurs-routing.module';
import { AddUtilisateurComponent } from './add-utilisateur/add-utilisateur.component';
import { EditUtilisateurComponent } from './edit-utilisateur/edit-utilisateur.component';
import { ListUtilisateursComponent } from './list-utilisateurs/list-utilisateurs.component';
import { DetailsUtilisateurComponent } from './details-utilisateur/details-utilisateur.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [AddUtilisateurComponent, EditUtilisateurComponent,  ListUtilisateursComponent,  DetailsUtilisateurComponent],
  imports: [
    CommonModule,
    GestionUtilisateursRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class GestionUtilisateursModule { }
