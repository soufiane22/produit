import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tuvHeaders } from 'src/app/shared/helpers/data.helper';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { TarifUnitVarService } from 'src/app/shared/service/produit-simple/tarif-unitaire-variable.service';

@Component({
  selector: 'app-list-tarif-unitaire-variable',
  templateUrl: './list-tarif-unitaire-variable.component.html',
  styleUrls: ['./list-tarif-unitaire-variable.component.scss']
})
export class ListTarifUnitaireVariableComponent implements OnInit {
  public tuvHeaders: Array<string>;
  public listTarifUnitaireVariables: Array<any>;
  public closeResult: string;
  public tuvToDelete: string;
  constructor(private router: Router, private modalService: NgbModal, private tuvService: TarifUnitVarService, private toastr: ToastrService, private produitService: ProduitSimpleService) {
    this.tuvHeaders = tuvHeaders;

   }


   ngOnInit(): void {
    this.getAllTarifUnitaireVariables();
  }

  getAllTarifUnitaireVariables() {
    this.tuvService.getAllTarifUnitVars().subscribe(
      (success) => {
        this.listTarifUnitaireVariables = success;
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
  onClickShowTuv(id: String) {
    const detailUrl = ['tarif-unitaire-variable/simple/details-tarif-unitaire-variable', id];
    this.router.navigate(detailUrl);
  }

  onClickEditTuv(id: String) {
    const editUrl = ['tarif-unitaire-variable/simple/edit-tarif-unitaire-variable', id];
    this.router.navigate(editUrl);
  }

  setTuvToDelete(id: string) {
    this.tuvToDelete = id;
  }

  onClickDelete() {
    this.tuvService.deleteTarifUnitVarById(this.tuvToDelete).subscribe(
      (success) => {
        if (success.produitService){
          this.produitService.deleteGrilleTarifaireFromList(success.produitService,success._id).subscribe(
            (success)=>{
            },
            (error)=>{
              console.log(error);
            }
          );
        }
        this.toastr.success('Le tarif unitaire variable a été supprimée avec succès', '😄', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'

        });

        this.getAllTarifUnitaireVariables()
      },
      (error) => {
        console.log(error);
        this.toastr.error("Le tarif unitaire variable n'a pas été supprimé avec succès", "😞", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    );
  }

}
