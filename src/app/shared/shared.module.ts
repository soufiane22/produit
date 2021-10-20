import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TranslateModule } from '@ngx-translate/core';

import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NavService } from './service/nav.service';
import { WINDOW_PROVIDERS } from './service/windows.service';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AllowedRefProduitDirective } from './directives/allowed-ref-produit.directive';
import { LessThanDirective } from './directives/less-than.directive';
import { PasswordsEqualDirective } from './directives/passwords-equal.directive';
import { AllowedDateDirective } from './directives/allowed-date.directive';
import { AngularFileUploaderModule } from "angular-file-uploader";

import 'hammerjs';
import 'mousetrap';

import {TableModule} from 'primeng/table';
import { ToolbarModule } from 'primeng/Toolbar';
import { ButtonModule } from 'primeng/Button';
import {InputTextModule} from 'primeng/inputtext';




@NgModule({
  declarations: [
    ToggleFullscreenDirective,
    FeatherIconsComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ContentLayoutComponent,
    BreadcrumbComponent,
    RightSidebarComponent,
    AllowedRefProduitDirective,
    LessThanDirective,
    PasswordsEqualDirective,
    AllowedDateDirective,
 
   
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    LazyLoadImageModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularFileUploaderModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [NavService, WINDOW_PROVIDERS],
  exports: [FeatherIconsComponent, ToggleFullscreenDirective, LazyLoadImageModule, TranslateModule, AngularFileUploaderModule,
    AllowedRefProduitDirective, NgMultiSelectDropDownModule, LessThanDirective, 
    PasswordsEqualDirective, AllowedDateDirective,TableModule,ToolbarModule,ButtonModule,InputTextModule
    ]
})
export class SharedModule { }
