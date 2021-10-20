import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { instCaractHeaders } from 'src/app/shared/helpers/data.helper';
import { InstCaracteristiqueService } from 'src/app/shared/service/produit-simple/inst-caracteristique.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-list-inst-caract',
  templateUrl: './list-inst-caract.component.html',
  styleUrls: ['./list-inst-caract.component.scss']
})
export class ListInstCaractComponent implements OnInit {

  public instCaractHeaders: Array<string>;
  public listCritCalcs: Array<any>;
  public closeResult: string;
  public instCaractToDelete: string;
  constructor(private router: Router, private modalService: NgbModal, private instCaractService: InstCaracteristiqueService, private toastr: ToastrService, private produitService: ProduitSimpleService) {
    this.instCaractHeaders = instCaractHeaders;
   }


   ngOnInit(): void {
    this.getAllCritCalcs();
  }

  getAllCritCalcs() {
    this.instCaractService.getAllInstCaracts().subscribe(
      (success) => {
        this.listCritCalcs = success;
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
  onClickEditInstCaract(id: string) {
    const editUrl = ['inst-caract/simple/edit-inst-caract', id];
    this.router.navigate(editUrl);
  }

  onClickShowInstCaract(id: string) {
    const detailUrl = ['inst-caract/simple/details-inst-caract', id];
    this.router.navigate(detailUrl);
  }

  setInstCaractToDelete(id: string) {
    this.instCaractToDelete = id;
  }

  onClickDeleteInstCaract() {
    this.instCaractService.deleteInstCaractById(this.instCaractToDelete).subscribe(
      (success) => {
        this.toastr.success("L'instance caractéristique a été supprimée avec succès", '😄', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'

        });

        this.getAllCritCalcs()
      },
      (error) => {
        console.log(error);
        this.toastr.error("L'instance caractéristique n'a pas été supprimé avec succès", "😞", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    );
  }
}
