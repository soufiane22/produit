import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tarifSaisonnierHeaders } from 'src/app/shared/helpers/data.helper';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { TarifSaisonnierService } from 'src/app/shared/service/produit-simple/tarif-saisonnier.service';


@Component({
  selector: 'app-list-tarif-saisonnier',
  templateUrl: './list-tarif-saisonnier.component.html',
  styleUrls: ['./list-tarif-saisonnier.component.scss']
})
export class ListTarifSaisonnierComponent implements OnInit {
  public headers: Array<string>;
  public listTarifSaisonniers: Array<any>;
  public closeResult: string;
  public tsToDelete: string;

  constructor(private router: Router, private modalService: NgbModal, private tarifSaisonnierService: TarifSaisonnierService, private toastr: ToastrService, private produitService: ProduitSimpleService) {
    this.headers = tarifSaisonnierHeaders;

  }

  ngOnInit(): void {
    this.getAllTarifSaisonniers();
  }

  getAllTarifSaisonniers() {
    this.tarifSaisonnierService.getAllTarifSaisonniers().subscribe(
      (success) => {
        this.listTarifSaisonniers = success;
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
  onClickShow(id: String) {
    const detailUrl = ['tarif-saisonnier/simple/details-tarif-saisonnier', id];
    this.router.navigate(detailUrl);
  }

  onClickEdit(id: String) {
    const editUrl = ['tarif-saisonnier/simple/edit-tarif-saisonnier', id];
    this.router.navigate(editUrl);
  }

  setTarifSaisonnierToDelete(id: string) {
    this.tsToDelete = id;
  }

  onClickDelete() {
    this.tarifSaisonnierService.deleteTarifSaisonnierById(this.tsToDelete).subscribe(
      (success) => {
        if (success.produitService){
          this.produitService.deleteTarifSaisonnierFromList(success.produitService,success._id).subscribe(
            (success)=>{
            },
            (error)=>{
              console.log(error);
            }
          );
        }
        this.toastr.success('Le tarif saisonnier a été supprimé avec succès', '😄', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'

        });

        this.getAllTarifSaisonniers()
      },
      (error) => {
        console.log(error);
        this.toastr.error("Le tarif saisonnier n'a pas été supprimé avec succès", "😞", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    );
  }
}
