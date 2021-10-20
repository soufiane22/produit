import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { annoHeaders } from 'src/app/shared/helpers/data.helper';
import { AnnotationService } from 'src/app/shared/service/produit-simple/annotation.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-list-annotations',
  templateUrl: './list-annotations.component.html',
  styleUrls: ['./list-annotations.component.scss']
})
export class ListAnnotationsComponent implements OnInit {

  public annoHeaders: Array<String>;
  public listAnnotations: Array<any>;
  public closeResult: string;
  public annoToDelete: string;
  constructor(private router: Router, private modalService: NgbModal, private annoService: AnnotationService, private toastr: ToastrService, private produitService: ProduitSimpleService) {
    this.annoHeaders = annoHeaders;
   }


   ngOnInit(): void {
    this.getAllAnnotations();
  }

  getAllAnnotations() {
    this.annoService.getAllAnnotations().subscribe(
      (success) => {
        this.listAnnotations = success;
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
  onClickEditAnno(id: string) {
    const editUrl = ['annotation/simple/edit-annotation', id];
    this.router.navigate(editUrl);
  }

  onClickShowAnno(id: string) {
    const detailUrl = ['annotation/simple/details-annotation', id];
    this.router.navigate(detailUrl);
  }

  setAnnoToDelete(id: string) {
    this.annoToDelete = id;
  }

  onClickDeleteAnno() {
    this.annoService.deleteAnnotationById(this.annoToDelete).subscribe(
      (success) => {
        if (success.produitService){
          this.produitService.deleteAnnotationFromList(success.produitService,success._id).subscribe(
            (success)=>{
            },
            (error)=>{
              console.log(error);
            }
          );
        }
        this.toastr.success("L'annotation a été supprimée avec succès", '😄', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'

        });

        this.getAllAnnotations()
      },
      (error) => {
        console.log(error);
        this.toastr.error("L'annotation n'a pas été supprimé avec succès", "😞", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    );
  }

}
