import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { critCalcHeaders } from 'src/app/shared/helpers/data.helper';
import { CritereCalculableService } from 'src/app/shared/service/produit-simple/critere-calculable.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-list-critere-calculable',
  templateUrl: './list-critere-calculable.component.html',
  styleUrls: ['./list-critere-calculable.component.scss']
})
export class ListCritereCalculableComponent implements OnInit {
  public critCalcHeaders: Array<string>;
  public listCritCalcs: Array<any>;
  public closeResult: string;
  public critCalcToDelete: string;
  constructor(private router: Router, private modalService: NgbModal, private critCalcService: CritereCalculableService, private toastr: ToastrService, private produitService: ProduitSimpleService) {
    this.critCalcHeaders = critCalcHeaders;
   }


   ngOnInit(): void {
    this.getAllCritCalcs();
  }

  getAllCritCalcs() {
    this.critCalcService.getAllCritereCalculables().subscribe(
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
  onClickEditCritCalc(id: string) {
    const editUrl = ['critere-calculable/simple/edit-critere-calculable', id];
    this.router.navigate(editUrl);
  }

  onClickShowCritCalc(id: string) {
    const detailUrl = ['critere-calculable/simple/details-critere-calculable', id];
    this.router.navigate(detailUrl);
  }

  setCritCalcToDelete(id: string) {
    this.critCalcToDelete = id;
  }

  onClickDeleteCritCalc() {
    this.critCalcService.deleteCritereCalculableById(this.critCalcToDelete).subscribe(
      (success) => {
        if (success.produitService){
          this.produitService.deleteCriteresCalculablesFromList(success.produitService,success._id).subscribe(
            (success)=>{
            },
            (error)=>{
              console.log(error);
            }
          );
        }
        this.toastr.success("Le critère calculable a été supprimée avec succès", '😄', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'

        });

        this.getAllCritCalcs()
      },
      (error) => {
        console.log(error);
        this.toastr.error("Le critère calculable n'a pas été supprimé avec succès", "😞", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    );
  }


}
