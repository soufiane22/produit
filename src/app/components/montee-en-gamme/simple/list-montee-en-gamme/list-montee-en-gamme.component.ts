import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { megHeaders } from 'src/app/shared/helpers/data.helper';
import { MonteeEnGammeService } from 'src/app/shared/service/produit-simple/montee-en-gamme.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-montee-en-gamme',
  templateUrl: './list-montee-en-gamme.component.html',
  styleUrls: ['./list-montee-en-gamme.component.scss']
})
export class ListMonteeEnGammeComponent implements OnInit {

  public megHeaders: Array<string>;
  public listMegs: Array<any>;
  public closeResult: string;
  public megToDelete: string;
  constructor(private router: Router, private modalService: NgbModal, private megService: MonteeEnGammeService, private toastr: ToastrService, private produitService: ProduitSimpleService) {
    this.megHeaders = megHeaders;
   }


   ngOnInit(): void {
    this.getAllMegs();
  }

  getAllMegs() {
    this.megService.getAllMonteeEnGammes().subscribe(
      (success) => {
        this.listMegs = success.map(x=>{
          x.iconeSymbol = environment.apiEndPoint + x.iconeSymbol;
          return x;
        });
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
  onClickEditMeg(id: string) {
    const editUrl = ['montee-en-gamme/simple/edit-montee-en-gamme', id];
    this.router.navigate(editUrl);
  }

  onClickShowMeg(id: string) {
    const detailUrl = ['montee-en-gamme/simple/details-montee-en-gamme', id];
    this.router.navigate(detailUrl);
  }

  setMegToDelete(id: string) {
    this.megToDelete = id;
  }

  onClickDeleteMeg() {
    this.megService.deleteMonteeEnGammeById(this.megToDelete).subscribe(
      (success) => {
        if (success.produitService){
          this.produitService.deleteMonteeEnGammeFromList(success.produitService,success._id).subscribe(
            (success)=>{
            },
            (error)=>{
              console.log(error);
            }
          );
        }
        this.toastr.success("La montée en gamme a été supprimée avec succès", '😄', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'

        });

        this.getAllMegs()
      },
      (error) => {
        console.log(error);
        this.toastr.error("La montée en gamme n'a pas été supprimé avec succès", "😞", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    );
  }

}
