import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProduitSimple } from 'src/app/shared/model/produit-simple/produit-simple.model';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { TarifSaisonnierService } from 'src/app/shared/service/produit-simple/tarif-saisonnier.service';
import { TarifUnitVarService } from 'src/app/shared/service/produit-simple/tarif-unitaire-variable.service';
import { GrilleTarifaireService } from 'src/app/shared/service/produit-simple/grille-tarifaire.service';
import { productHeaders } from 'src/app/shared/helpers/data.helper';


@Component({
  selector: 'app-list-produits',
  templateUrl: './list-produits.component.html',
  styleUrls: ['./list-produits.component.scss']
})
export class ListProduitsComponent implements OnInit {
  public headers: Array<string>;
  public listProducts: Array<ProduitSimple>;
  public url = environment.apiEndPoint;
  public closeResult: string;
  public produitToDelete: string;
  lang:any;
  constructor(private modalService: NgbModal, private router: Router, private psService: ProduitSimpleService, private tuvService: TarifUnitVarService, private gtService: GrilleTarifaireService, private tsService: TarifSaisonnierService, private toastr: ToastrService) {
    this.headers = productHeaders;
    this.listProducts = [];
    this.lang=localStorage.getItem('code');
  }
  getProducts() {
    this.psService.getAllProducts().subscribe(
      (success) => {
        this.listProducts = success;

      },
      (error) => {
        console.log(error);
      })
  }
  atrProduit:any;
  ngOnInit(): void {
    this.getProducts();

    this.atrProduit = [
      { field: 'refProduit', header: 'Reference' ,width: '16rem'},
      { field:  'typePS', header: 'type',width: '9rem' },
      { field: 'designation', header: 'Designation' ,width: '9rem'} ,
      { field: 'pays', header: 'Pays',width: '9rem' }  ,
      { field: 'tarifUHT', header: 'Prix' ,width: '9rem'}   
    ];
  
  }

  onClickEdit(id: String) {
    const editUrl = ['gestion-produits/simple/edit-produit', id];
    this.router.navigate(editUrl);
  }

  onClickShow(id: String) {
    const detailUrl = ['gestion-produits/simple/details-produit', id];
    this.router.navigate(detailUrl);
  }

  setProduitToDelete(id: string) {
    this.produitToDelete = id;
  }

  onClickDelete() {
    this.psService.deleteProduitById(this.produitToDelete).subscribe(
      (success) => {
        this.removeGtFromList(success);
        this.removeTuvFromList(success);
        this.removeTsFromList(success);
        this.toastr.success('😄', 'Le produit a été supprimé avec succès', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
        this.getProducts();
      },
      (error) => {
        console.log(error);
        this.toastr.error('😞', "Le produit n'a pas été supprimé avec succès", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'


        });
      }
    );
  }

  removeTsFromList(ps: ProduitSimple) {
    ps.tarifSaisonnier.forEach(ts => {
      this.tsService.removeTarifSaisonnierProduct(ts).toPromise()
        .catch(error => console.log(error));
    });
  }

  removeTuvFromList(ps: ProduitSimple) {
    ps.tarifUV.forEach(tuv => {
      this.tuvService.removeTarifUnitVarProduct(tuv).toPromise()
        .catch(error => console.log(error));
    });

  }

  removeGtFromList(ps: ProduitSimple) {
    ps.grilleTarifaire.forEach(gt => {
      this.gtService.removeGrilleTarifaireProduct(gt).toPromise()
        .catch(error => console.log(error));
    });
  }
  addProduit() {
    const addUrl = ['gestion-produits/simple/add-produit'];
    this.router.navigate(addUrl);
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

  firstImage(images: Array<string>): string {
    for (const image of images) {
      if (image) {
        return environment.apiEndPoint+image
      }
    }
    return '';
  }

}
