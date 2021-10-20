import { filter } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { contMmediaHeaders } from 'src/app/shared/helpers/data.helper';
import { ContMmediaService } from 'src/app/shared/service/produit-simple/cont-mmedia.service';
import { GarAssurService } from 'src/app/shared/service/produit-simple/gar-assur.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { environment } from 'src/environments/environment';
// import 'ng-bootstrap-to-bootstrap-3' fro

@Component({
  selector: 'app-list-cont-mmedia',
  templateUrl: './list-cont-mmedia.component.html',
  styleUrls: ['./list-cont-mmedia.component.scss']
})
export class ListContMmediaComponent implements OnInit {
  public contMmediaHeaders: Array<string>;
  public listContMmedias: Array<any>;
  public closeResult: string;
  public contMmediaToDelete: string;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private contMmediaService: ContMmediaService,
    private toastr: ToastrService,
    private produitService: ProduitSimpleService,
    private garAssurService: GarAssurService,
    public translateService: TranslateService
    )
    {
    this.contMmediaHeaders = contMmediaHeaders;
  }


  ngOnInit(): void {
    this.getAllContMmedias();
    this.contMmedia_header=[
      { field: 'refContenu', header: 'Réference' ,width: '16rem'},
      { field:  'titreDoc', header: 'Titre',width: '9rem' },
      { field: 'typeContenu', header: 'Type' ,width: '9rem'} ,
      { field: 'formatDoc', header: 'Format',width: '9rem' }  ,
      { field: 'tailleDoc', header: 'Taille' ,width: '9rem'},
      // { field: 'provenanceInterne', header: 'Externe' ,width: '9rem'},
      // { field: 'relation', header: 'Relation' ,width: '9rem'},
      { field: 'contenu', header: 'Contenu' ,width: '9rem'},
    ];
  }

  contMmedia_header: any


  getAllContMmedias() {
    this.contMmediaService.getAllContMmedias().subscribe(
      (success) => {
        this.listContMmedias = success.map(x => {
          this.traduire(x.relation)
          x.relation = this.key
          console.log('urlDoc',x.urlDoc)
          return x;
        });
        this.listContMmedias.reverse()

      },
      (error) => {
        console.log(error);
      }
    );
  }
  key= ""
  traduire(item){
    this.translateService.get(item).subscribe(
      data => {
        this.key = data
        console.log('data traduire',data);

      }
    )
  }
  open(content) {
    this.modalService.open(content, { size:'md', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // Operations
  onClickEditContMmedia(id: string) {
    const editUrl = ['cont-mmedia/simple/edit-cont-mmedia', id];
    this.router.navigate(editUrl);
  }

  onClickShowContMmedia(id: string) {
    const detailUrl = ['cont-mmedia/simple/details-cont-mmedia', id];
    this.router.navigate(detailUrl);
  }

  setContMmediaToDelete(modal,id) {
    this.contMmediaToDelete = id;
    this.open(modal)

  }

  onClickDeleteContMmedia() {
    this.contMmediaService.deleteContMmediaById(this.contMmediaToDelete).subscribe(
      (success) => {
        // this.removeContMmediaFromGarAssur(success);
        // this.removeContMmediaFromProduit(success);
        this.toastr.success("Le contenu multimedia a été supprimée avec succès", '😄', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'

        });

        this.getAllContMmedias()
      },
      (error) => {
        console.log(error);
        this.toastr.error("Le contenu multimedia  n'a pas été supprimé avec succès", "😞", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    );
  }


  goToaddContMmedia(){
    const addUrl = ['cont-mmedia/simple/add-cont-mmedia'];
    this.router.navigate(addUrl);
  }


  fileUrl=''

  openFile(url){
    this.fileUrl  =url;
    let file =  environment.apiEndPoint +this.fileUrl
    console.log('fileUrl',file);
    window.open(file,"_blank");
    file=''

  }
}
