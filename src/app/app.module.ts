import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { GestionProduitsModule } from './components/gestion-produits/gestion-produits.module';
import { GestionMenuModule } from './components/gestion-menu/gestion-menu.module';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { TarifSaisonnierModule } from './components/tarif-saisonnier/tarif-saisonnier.module';
import { AuthentificationModule } from './components/authentification/authentification.module';
import { GestionUtilisateursModule } from './components/gestion-utilisateurs/gestion-utilisateurs.module';
import { TarifUnitaireVariableModule } from './components/tarif-unitaire-variable/tarif-unitaire-variable.module';
import { GrilleTarifaireModule } from './components/grille-tarifaire/grille-tarifaire.module';
import { InstCaractVarModule } from './components/inst-caract-var/inst-caract-var.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    DashboardModule,
    SharedModule,
    GestionMenuModule,
    GestionProduitsModule,
    TarifSaisonnierModule,
    AuthentificationModule,
    GestionUtilisateursModule,
    GrilleTarifaireModule,
    TarifUnitaireVariableModule,
    InstCaractVarModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient)=>{return new TranslateHttpLoader(http)},
        deps: [HttpClient]
      }
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
