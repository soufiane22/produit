import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { garAssurHeaders } from 'src/app/shared/helpers/data.helper';
import { ContMmediaService } from 'src/app/shared/service/produit-simple/cont-mmedia.service';
import { GarAssurService } from 'src/app/shared/service/produit-simple/gar-assur.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-gar-assur',
  templateUrl: './list-gar-assur.component.html',
  styleUrls: ['./list-gar-assur.component.scss']
})
export class ListGarAssurComponent implements OnInit {
  public garAssurHeaders: Array<String>;
  public listGarAssurs: Array<any>;
  public closeResult: string;
  public garAssurToDelete: string;
  constructor(private router: Router, private modalService: NgbModal, private garAssurService: GarAssurService, private toastr: ToastrService, 
    private produitService: ProduitSimpleService, private contMmediaService: ContMmediaService) {
    this.garAssurHeaders = garAssurHeaders;
  }


  ngOnInit(): void {
    this.getAllGarAssurs();
  }

  getAllGarAssurs() {
    this.garAssurService.getAllGarAssurs().subscribe(
      (success) => {
        this.listGarAssurs = success.map(x => {
          x.contratModel = environment.apiEndPoint + x.contratModel;
          return x;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
  onClickEditGarAssur(id: string) {
    const editUrl = ['gar-assur/simple/edit-gar-assur', id];
    this.router.navigate(editUrl);
  }

  onClickShowGarAssur(id: string) {
    const detailUrl = ['gar-assur/simple/details-gar-assur', id];
    this.router.navigate(detailUrl);
  }

  setGarAssurToDelete(id,modal) {
    this.garAssurToDelete = id;
    this.open(modal)
  }

  onClickDeleteGarAssur() {
    this.garAssurService.deleteGarAssurById(this.garAssurToDelete).subscribe(
      (success) => {
        this.removeContMmediaGarAssur(success);
        this.removeGarAssurFromProduct(success);
        this.toastr.success("La garanite assurance a été supprimée avec succès", '😄', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'

        });

        this.getAllGarAssurs()
      },
      (error) => {
        console.log(error);
        this.toastr.error("La garanite assurance  n'a pas été supprimé avec succès", "😞", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    );
  }

  removeGarAssurFromProduct(garAssur: any){
    if (garAssur.produitService) {
      this.produitService.deleteGarAssurFromList(garAssur.produitService, garAssur._id).toPromise()
      .catch(error=>console.log(error));
    }
  }

  removeContMmediaGarAssur(garAssur:any){
    garAssur.contenuMmedia.forEach(x => {
      this.contMmediaService.removeContMmediaGarAssur(x).toPromise()
      .catch(error=>console.log(error));
    });
  }

  goToaddGarAssur(){
    const listUrl = ['gar-assur/simple/add-gar-assur'];
    this.router.navigate(listUrl);
  }

  openFile(url){
    window.open(url,"_blank");
  }
}
