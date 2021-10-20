import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { grilleHeaders } from 'src/app/shared/helpers/data.helper';
import { GrilleTarifaireService } from 'src/app/shared/service/produit-simple/grille-tarifaire.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-list-grille-tarifaire',
  templateUrl: './list-grille-tarifaire.component.html',
  styleUrls: ['./list-grille-tarifaire.component.scss']
})
export class ListGrilleTarifaireComponent implements OnInit {
  public gtHeaders: Array<string>;
  public listGrilleTarifaires: Array<any>;
  public closeResult: string;
  public gtToDelete: string;
  constructor(private router: Router, private modalService: NgbModal, private gtService: GrilleTarifaireService, private toastr: ToastrService, private produitService: ProduitSimpleService) {
    this.gtHeaders = grilleHeaders;
  }


  ngOnInit(): void {
    this.getAllGrilleTarifaires();
  }

  getAllGrilleTarifaires() {
    this.gtService.getAllGrilleTarifaires().subscribe(
      (success) => {
        this.listGrilleTarifaires = success;
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
  onClickShowGt(id: String) {
    const detailUrl = ['grille-tarifaire/simple/details-grille-tarifaire', id];
    this.router.navigate(detailUrl);
  }

  onClickEditGt(id: String) {
    const editUrl = ['grille-tarifaire/simple/edit-grille-tarifaire', id];
    this.router.navigate(editUrl);
  }

  setGtToDelete(id: string) {
    this.gtToDelete = id;
  }

  onClickDelete() {
    this.gtService.deleteGrilleTarifaireById(this.gtToDelete).subscribe(
      (success) => {
        this.produitService.getAllProducts().subscribe(
          (products) => {
            products.map(x => {
              if (x.grilleTarifaire.includes(this.gtToDelete)) {
                this.produitService.deleteGrilleTarifaireFromList(x._id, this.gtToDelete).toPromise()
                  .catch(e => console.log(e));
                this.getAllGrilleTarifaires();
              }
            })
          },
          (error) => {
            console.log(error);
          }
        )
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
