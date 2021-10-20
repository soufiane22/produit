import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { distinctionHeaders } from 'src/app/shared/helpers/data.helper';
import { DistinctionService } from 'src/app/shared/service/produit-simple/distinction.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-list-distinction',
  templateUrl: './list-distinction.component.html',
  styleUrls: ['./list-distinction.component.scss']
})
export class ListDistinctionComponent implements OnInit {
  public distinctionHeaders: Array<String>;
  public listDistinctions: Array<any>;
  public closeResult: string;
  public distToDelete: string;

  constructor(private router: Router, private modalService: NgbModal, private distService: DistinctionService,
     private toastr: ToastrService, private produitService: ProduitSimpleService,

     )
      {

    this.distinctionHeaders = distinctionHeaders;
   }

   atrDistinction:any;
   ngOnInit(): void {
    this.getAllDistinctions();
    this.atrDistinction = [
      { field: 'typeD', header: 'Type' ,width: '5rem'},
      { field: 'translations.0.__designation', header: 'Designation',width: '12rem' },
      { field: 'produitService.translations.0.__designation', header: 'Produit' ,width: '12rem'},
      { field: 'dateObtention', header: 'Date Obtention' ,width: '9rem'} ,
      { field: 'duree', header: 'Durée',width: '6rem' }  ,
    ];
  }

  getAllDistinctions() {
    this.distService.getAllDistinctions().subscribe(
      (success) => {
        this.listDistinctions = success.map(d=>{
          d.logo = environment.apiEndPoint + d.logo;
          return d;
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
  onClickShowDist(id: string) {
    const detailUrl = ['distinction/simple/details-distinction', id];
    this.router.navigate(detailUrl);
  }

  onClickEditDist(id: string) {
    const editUrl = ['distinction/simple/edit-distinction', id];
    this.router.navigate(editUrl);
  }

  setDistToDelete(id: string) {
    this.distToDelete = id;
  }

  onClickDeleteDist() {
    this.distService.deleteDistinctionById(this.distToDelete).subscribe(
      (success) => {
        if (success.produitService){
          this.produitService.deleteDistinctionFromList(success.produitService,success._id).subscribe(
            (success)=>{
            },
            (error)=>{
              console.log(error);
            }
          );
        }
        this.toastr.success('La Distinction a été supprimée avec succès', '😄', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'

        });

        this.getAllDistinctions()
      },
      (error) => {
        console.log(error);
        this.toastr.error("La Distinction n'a pas été supprimé avec succès", "😞", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    );
  }


}
