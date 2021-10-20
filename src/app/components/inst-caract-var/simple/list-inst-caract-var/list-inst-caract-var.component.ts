import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { instCarVarHeaders } from 'src/app/shared/helpers/data.helper';
import { InstCaractVar } from 'src/app/shared/model/produit-simple/inst-caract-var.model';
import { ExpeditionService } from 'src/app/shared/service/produit-simple/expedition.service';
import { IndFraisAddService } from 'src/app/shared/service/produit-simple/ind-frais-add.service';
import { IndPromoService } from 'src/app/shared/service/produit-simple/ind-promo.service';
import { IndStockService } from 'src/app/shared/service/produit-simple/ind-stock.service';
import { InstCaractVarService } from 'src/app/shared/service/produit-simple/inst-caract-var.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-list-inst-caract-var',
  templateUrl: './list-inst-caract-var.component.html',
  styleUrls: ['./list-inst-caract-var.component.scss']
})
export class ListInstCaractVarComponent implements OnInit {
  public instCarVarHeaders: Array<string>;
  public listInstCarVar: Array<InstCaractVar>;
  public closeResult: string;
  public instCarVarToDelete: string;
  constructor(private psService: ProduitSimpleService, private indPromoService: IndPromoService, private indFraisAddService: IndFraisAddService, private indStockService: IndStockService, private expeditionService: ExpeditionService ,private router: Router, private modalService: NgbModal, private instCarVarService: InstCaractVarService, private toastr: ToastrService) {
    this.instCarVarHeaders = instCarVarHeaders;
  }


  ngOnInit(): void {
    this.getAllGrilleTarifaires();
  }

  getAllGrilleTarifaires() {
    this.instCarVarService.getAllInstCaractVars().subscribe(
      (success) => {
        this.listInstCarVar = success;
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
  onClickShowInstCaractVar(id: String) {
    const detailUrl = ['inst-caract-var/simple/details-inst-caract-var', id];
    this.router.navigate(detailUrl);
  }

  onClickEditInstCaractVar(id: String) {
    const editUrl = ['inst-caract-var/simple/edit-inst-caract-var', id];
    this.router.navigate(editUrl);
  }

  setInstCaractVarToDelete(id: string) {
    this.instCarVarToDelete = id;
  }

  onClickDelete() {
    this.instCarVarService.deleteInstCaractVarById(this.instCarVarToDelete).subscribe(
      (success) => {
        this.deleteIndPromoInstCaractVar(success);
        this.deleteIndFraisAddInstCaractVar(success);
        this.deleteIndStockInstCaractVar(success);
        this.deleteExpeditionCaractVar(success);
        this.toastr.success("L'instance caractéristique variante a été supprimée avec succès", '😄', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });

        this.getAllGrilleTarifaires()
      },
      (error) => {
        console.log(error);
        this.toastr.error("L'instance caractéristique variante n'a pas été supprimé avec succès", "😞", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    );
  }

  addInstCaractVar(){
    const addUrl = ['inst-caract-var/simple/add-inst-caract-var'];
    this.router.navigate(addUrl);
  }

  deleteFromProduitInstCaractVarList(instCaractVar: InstCaractVar){
    if (instCaractVar.produitService){
        this.psService.deleteInstCaractVarFromList(instCaractVar.produitService, this.instCarVarToDelete)
        .toPromise()
        .catch(error=>console.log(error));
    }
  }

  deleteIndPromoInstCaractVar(instCaractVar: InstCaractVar){
    instCaractVar.indPromo.forEach(indPromo=>{
      this.indPromoService.removeIndPromoInstCaractVar(indPromo)
      .toPromise()
      .catch(error=>console.log(error));
    })
  }

  deleteIndFraisAddInstCaractVar(instCaractVar: InstCaractVar){
    instCaractVar.indFraisAdd.forEach(indFraisAdd=>{
      this.indFraisAddService.removeIndFraisAddInstCaractVar(indFraisAdd)
      .toPromise()
      .catch(error=>console.log(error));
    })
  }

  deleteIndStockInstCaractVar(instCaractVar: InstCaractVar){
    instCaractVar.indStock.forEach(indStock=>{
      this.indStockService.removeIndStockInstCaractVar(indStock)
      .toPromise()
      .catch(error=>console.log(error));
    })
  }

  deleteExpeditionCaractVar(instCaractVar: InstCaractVar){
    instCaractVar.expedition.forEach(expedition=>{
      this.expeditionService.removeExpeditionInstCaractVar(expedition)
      .toPromise()
      .catch(error=>console.log(error));
    })
  }

  

}
