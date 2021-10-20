import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MonteeEnGammeRoutingModule } from './montee-en-gamme-routing.module';
import { AddMonteeEnGammeComponent } from './simple/add-montee-en-gamme/add-montee-en-gamme.component';
import { EditMonteeEnGammeComponent } from './simple/edit-montee-en-gamme/edit-montee-en-gamme.component';
import { DetailsMonteeEnGammeComponent } from './simple/details-montee-en-gamme/details-montee-en-gamme.component';
import { ListMonteeEnGammeComponent } from './simple/list-montee-en-gamme/list-montee-en-gamme.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/shared/service/ngb-date.service';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [AddMonteeEnGammeComponent, EditMonteeEnGammeComponent, DetailsMonteeEnGammeComponent, ListMonteeEnGammeComponent],
  imports: [
    CommonModule,
    MonteeEnGammeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DropzoneModule,
    NgbModule
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
    {provide: DROPZONE_CONFIG, useValue: DEFAULT_DROPZONE_CONFIG}
  ]
})
export class MonteeEnGammeModule { }
