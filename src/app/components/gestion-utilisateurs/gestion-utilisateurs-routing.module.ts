import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { AddUtilisateurComponent } from '../gestion-utilisateurs/add-utilisateur/add-utilisateur.component';
import { DetailsUtilisateurComponent } from '../gestion-utilisateurs/details-utilisateur/details-utilisateur.component';
import { EditUtilisateurComponent } from '../gestion-utilisateurs/edit-utilisateur/edit-utilisateur.component';
import { ListUtilisateursComponent } from '../gestion-utilisateurs/list-utilisateurs/list-utilisateurs.component';


const routes: Routes = [  {
  path: 'list-utilisateurs',
  component: ListUtilisateursComponent,
  data: {
    title: 'Utilisateurs List',
    breadcrumb: "Utilisateurs List"
  },
  // canActivate: [AuthCheckGuard]
},
{
  path: 'add-utilisateur',
  component: AddUtilisateurComponent,
  data: {
    title: 'Add Utilisateur',
    breadcrumb: "Add Utilisateur"
  },
  // canActivate: []
},
{
  path: 'edit-utilisateur/:id',
  component: EditUtilisateurComponent,
  data: {
    title: 'Edit Utilisateur',
    breadcrumb: "Edit Utilisateur"
  },
  canActivate: [AuthCheckGuard]
},
{
  path: 'details-utilisateur/:id',
  component: DetailsUtilisateurComponent,
  data: {
    title: 'Details Utilisateur',
    breadcrumb: "Details Utilisateur"
  },
  canActivate: [AuthCheckGuard]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionUtilisateursRoutingModule { }
