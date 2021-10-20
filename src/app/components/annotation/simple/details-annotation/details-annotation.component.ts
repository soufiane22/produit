import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AllowedDate } from 'src/app/shared/directives/allowed-date.directive';
import { Annotation } from 'src/app/shared/model/produit-simple/annotation.model';
import { GrilleTarifaire } from 'src/app/shared/model/produit-simple/grille-tarifaire.model';
import { AnnotationService } from 'src/app/shared/service/produit-simple/annotation.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-details-annotation',
  templateUrl: './details-annotation.component.html',
  styleUrls: ['./details-annotation.component.scss']
})
export class DetailsAnnotationComponent implements OnInit {

  public annoForm: FormGroup;
  public annoToShow = new Annotation();
  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private annoService: AnnotationService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.createAnnotationForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.annoService.findAnnotationById(success.id).subscribe(
          (success) => {
            this.annoToShow = success;
            this.createAnnotationForm();
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
        const listUrl = ['gestion-produits/simple/list-produit'];
        this.router.navigate(listUrl);
      })
  }

  createAnnotationForm() {
    this.annoForm = this.fb.group({
      date: this.fb.control({value:this.annoToShow.date, disabled:true}),
      email: this.fb.control({value:this.annoToShow.email,disabled:true}),
      commentaire: this.fb.control({value:this.annoToShow.commentaire,disabled:true}),
      note: this.fb.control({value:this.annoToShow.note,disabled:true})
    });
  }



  associatedProduct() {
    const detailUrl = ['gestion-produits/simple/details-produit', this.annoToShow.produitService];
    this.router.navigate(detailUrl);
  }

  goToList() {
    const url = ["/annotation/simple/list-annotation"]
    this.router.navigate(url)
  }


}
