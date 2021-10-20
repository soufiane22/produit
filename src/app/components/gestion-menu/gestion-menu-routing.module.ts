import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMenuComponent } from './admin/list-menu/list-menu.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin/list-menu',
        component: ListMenuComponent,
        data: {
          title: 'Menu Lists',
          breadcrumb: "Menu Lists"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionMenuRoutingModule { }
