import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionMenuRoutingModule } from './gestion-menu-routing.module';
import { ListMenuComponent } from './admin/list-menu/list-menu.component';


@NgModule({
  declarations: [ListMenuComponent],
  imports: [
    CommonModule,
    GestionMenuRoutingModule
  ]
})
export class GestionMenuModule { }
