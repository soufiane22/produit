import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal , ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProdCompService } from 'src/app/shared/service/produit-simple/prod-comp.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';


@Component({
  selector: 'app-list-prod-comp',
  templateUrl: './list-prod-comp.component.html',
  styleUrls: ['./list-prod-comp.component.scss']
})
export class ListProdCompComponent implements OnInit {

  public listProduitComps: Array<any>;
  public closeResult: string;
  public distToDelete: string;

  constructor(
     private router: Router,
     private modalService: NgbModal,
     private produitComService: ProdCompService,
     private toastr: ToastrService,
     private produitService: ProduitSimpleService,
     )
      { }

  colProdComp
  ngOnInit(): void {
    this.getAllProdComp();
    this.colProdComp = [
      { field: 'typeProduit', header: 'Type Produit' },
      { field: 'refProdCompose', header: 'Produit composé' },
      { field: 'refProdComposant', header: 'Produit composant'},
      { field: 'qteProduit', header: 'Quantité de produit' } ,

    ];


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


  getAllProdComp(){
    this.produitComService.getAllProduitComposants().subscribe(
      (success) => {
        this.listProduitComps = success
        this.listProduitComps.reverse()

      },
      (error) => {
        console.log(error);
      }
    );
  }

  onClickShowprodAssoci(id){
    const link =['prod-comp/simple/details-prod-comp',id]
    this.router.navigate(link)
  }


  /*   ********************* DELETE PRODCOMP *******************   */
prodComp_ID :any
  setprodToDelete(id, modal){
    this.prodComp_ID = id
    this.open(modal)
  }

  onClickDeleteGarAssur(){
    this.produitComService.deleteProduitComposantById(this.prodComp_ID).subscribe(
      success => { this.getAllProdComp()},
      err => { console.log(err);
      }
    )

  }

}
