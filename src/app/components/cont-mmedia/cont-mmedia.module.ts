import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContMmediaRoutingModule } from './cont-mmedia-routing.module';
import { AddContMmediaComponent } from './simple/add-cont-mmedia/add-cont-mmedia.component';
import { DetailsContMmediaComponent } from './simple/details-cont-mmedia/details-cont-mmedia.component';
import { EditContMmediaComponent } from './simple/edit-cont-mmedia/edit-cont-mmedia.component';
import { ListContMmediaComponent } from './simple/list-cont-mmedia/list-cont-mmedia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DropzoneConfigInterface, DropzoneModule, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};


@NgModule({
  declarations: [AddContMmediaComponent, DetailsContMmediaComponent, EditContMmediaComponent, ListContMmediaComponent],
  imports: [
    CommonModule,
    ContMmediaRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    DropzoneModule
    
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
  ]
})
export class ContMmediaModule { }
