import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { indFraisAddHeaders } from 'src/app/shared/helpers/data.helper';
import { GrilleTarifaireService } from 'src/app/shared/service/produit-simple/grille-tarifaire.service';
import { IndFraisAddService } from 'src/app/shared/service/produit-simple/ind-frais-add.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-list-ind-frais-add',
  templateUrl: './list-ind-frais-add.component.html',
  styleUrls: ['./list-ind-frais-add.component.scss']
})
export class ListIndFraisAddComponent implements OnInit {

  public indFraisAddHeaders: Array<string>;
  public listIndFraisAdd: Array<any>;
  public closeResult: string;
  public indFraisAddToDelete: string;
  constructor(private router: Router, private modalService: NgbModal, private indFraisAddService: IndFraisAddService, private toastr: ToastrService, private produitService: ProduitSimpleService) {
    this.indFraisAddHeaders = indFraisAddHeaders;
  }


  ngOnInit(): void {
    this.getAllIndFraisAdds();
  }

  getAllIndFraisAdds() {
    this.indFraisAddService.getAllIndFraisAdds().subscribe(
      (success) => {
        this.listIndFraisAdd = success;
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
  onClickShowIndFraisAdd(id: String) {
    const detailUrl = ['ind-frais-add/simple/details-ind-frais-add', id];
    this.router.navigate(detailUrl);
  }

  onClickEditIndFraisAdd(id: String) {
    const editUrl = ['ind-frais-add/simple/edit-ind-frais-add', id];
    this.router.navigate(editUrl);
  }

  setIndFraisAddToDelete(id: string) {
    this.indFraisAddToDelete = id;
  }

  onClickDeleteIndFraisAdd() {
    this.indFraisAddService.deleteIndFraisAddById(this.indFraisAddToDelete).subscribe(
      (success) => {
        this.produitService.getAllProducts().subscribe(
          (products) => {
            products.map(x => {
              if (x.indicationFraisAdd.includes(this.indFraisAddToDelete)) {
                this.produitService.deleteIndFraisAddFromList(x._id, this.indFraisAddToDelete).toPromise()
                  .catch(e => console.log(e));
                this.getAllIndFraisAdds();
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
