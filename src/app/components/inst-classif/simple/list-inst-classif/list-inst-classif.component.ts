import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { instClassifHeaders } from 'src/app/shared/helpers/data.helper';
import { InstClassificationService } from 'src/app/shared/service/produit-simple/inst-classification.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-inst-classif',
  templateUrl: './list-inst-classif.component.html',
  styleUrls: ['./list-inst-classif.component.scss']
})
export class ListInstClassifComponent implements OnInit {
  public instClassifHeaders: Array<string>;
  public listInstClassifs: Array<any>;
  public closeResult: string;
  public instClassifToDelete: string;
  constructor(private router: Router, private modalService: NgbModal, private instClassifService: InstClassificationService, private toastr: ToastrService, private produitService: ProduitSimpleService) {
    this.instClassifHeaders = instClassifHeaders;
   }


   ngOnInit(): void {
    this.getAllInstClassifs();
  }

  getAllInstClassifs() {
    this.instClassifService.getAllInstClassifs().subscribe(
      (success) => {
        this.listInstClassifs = success
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
  onClickEditInstClassif(id: string) {
    const editUrl = ['inst-classif/simple/edit-inst-classif', id];
    this.router.navigate(editUrl);
  }

  onClickShowInstClassif(id: string) {
    const detailUrl = ['inst-classif/simple/details-inst-classif', id];
    this.router.navigate(detailUrl);
  }

  setInstClassifToDelete(id: string) {
    this.instClassifToDelete = id;
  }

  onClickDeleteInstClassif() {
    this.instClassifService.deleteInstClassifById(this.instClassifToDelete).subscribe(
      (success) => {
        this.toastr.success("L'instance classificationa été supprimée avec succès", '😄', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'

        });

        this.getAllInstClassifs()
      },
      (error) => {
        console.log(error);
        this.toastr.error("L'instance classificationn'a pas été supprimé avec succès", "😞", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    );
  }
}
