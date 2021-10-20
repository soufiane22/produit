import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AllowedDate } from 'src/app/shared/directives/allowed-date.directive';
import { Annotation } from 'src/app/shared/model/produit-simple/annotation.model';
import { AnnotationService } from 'src/app/shared/service/produit-simple/annotation.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-add-annotation',
  templateUrl: './add-annotation.component.html',
  styleUrls: ['./add-annotation.component.scss']
})
export class AddAnnotationComponent implements OnInit {
  public annotationForm: FormGroup;
  public annotationToAdd = new Annotation();
  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private annoService: AnnotationService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.createAnnotationForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.annotationToAdd.produitService = success.id;
      },
      (error) => {
        console.log(error);
        const listUrl = ['gestion-produits/simple/list-produit'];
        this.router.navigate(listUrl);
      })
  }

  createAnnotationForm() {
    this.annotationForm = this.fb.group({
      date: [this.today, [Validators.required, AllowedDate]],
      email: ['', [Validators.required, Validators.email]],
      commentaire: ['', [Validators.required]],
      note: ['', [Validators.required]]
    });
  }

  get date() {
    return this.annotationForm.get('date');
  }

  get email() {
    return this.annotationForm.get('email');
  }

  get commentaire() {
    return this.annotationForm.get('commentaire');
  }

  get note() {
    return this.annotationForm.get('note');
  }


  clearValues() {
    this.annotationForm.reset();
    this.annotationToAdd = new Annotation();
  }

  addAnnotation() {
    if (this.annotationForm.valid) {
      this.getValues();
      console.log(this.annotationToAdd);
      this.annoService.addAnnotation(this.annotationToAdd).subscribe(
        (success) => {
          this.psService.addAnnotationToList(this.annotationToAdd.produitService, success._id).subscribe(
            (success) => {
              this.toastr.success("L'annotation a été ajoutée avec succès", "👌", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
              setTimeout(() => {
                const editUrl = ['gestion-produits/simple/edit-produit', this.annotationToAdd.produitService];
                this.router.navigate(editUrl);
              }, 2000);

            },
            (error) => {
              console.log({ error: error });
              this.toastr.error("L'annotation n'a pas été ajoutée au produit", "🥵", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
            }
          );
        },
        (error) => {
          console.log(error);
          this.toastr.error("L'annotation  n'a pas pu être ajouté avec succès", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        })
    } else {
      this.toastr.error("Merci de bien vouloir remplir tous les champs du formulaire", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }

  getValues() {
    this.annotationToAdd.commentaire = this.commentaire.value;
    this.annotationToAdd.date = this.date.value;
    this.annotationToAdd.email = this.email.value;
    this.annotationToAdd.note = this.note.value;
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

}
