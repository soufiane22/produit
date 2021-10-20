import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AllowedDate } from 'src/app/shared/directives/allowed-date.directive';
import { Annotation } from 'src/app/shared/model/produit-simple/annotation.model';
import { AnnotationService } from 'src/app/shared/service/produit-simple/annotation.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-edit-annotation',
  templateUrl: './edit-annotation.component.html',
  styleUrls: ['./edit-annotation.component.scss']
})
export class EditAnnotationComponent implements OnInit {

  public annotationForm: FormGroup;
  public annoProduitForm: FormGroup;
  public annotationToEdit = new Annotation();
  public annoProduit: any;

  // Dropdown produits
  listProduits: Array<string> = [];
  selectedProduit: Array<string> = [];
  dropdownProduitSettings: any = {};
  closeDropdownProduitSelection = false;
  disabledDropdownProduit = false;
  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private annoService: AnnotationService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.annoService.findAnnotationById(success.id).subscribe(
          (success) => {
            this.annotationToEdit = success;
            this.createAnnotationForm();
            this.createProduitDropDown();
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
    this.annotationForm = this.fb.group({
      date: [this.annotationToEdit.date, [Validators.required, AllowedDate]],
      email: [this.annotationToEdit.email, [Validators.required, Validators.email]],
      commentaire: [this.annotationToEdit.commentaire, [Validators.required]],
      note: [this.annotationToEdit.note, [Validators.required]]
    });
  }

  createAnnoProduitForm() {
    this.annoProduitForm = this.fb.group({
      produitService: [this.selectedProduit, [Validators.required]]
    });
  }

  get produitService(){
    return this.annoProduitForm.get('produitService');
  }
  createProduitDropDown() {
    // Dropdown produit
    this.psService.getAllProducts().subscribe(
      (success) => {
        this.listProduits = success.map(p => p.refProduit);
        this.selectedProduit = success.filter(p => p._id === this.annotationToEdit
          .produitService).map(p => p.refProduit);
        this.createAnnoProduitForm();
        this.dropdownProduitSettings = {
          singleSelection: true,
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          allowSearchFilter: true,
          closeDropDownOnSelection: this.closeDropdownProduitSelection
        };
      },
      (error) => {
        console.log(error);
      })

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
    this.date.setValue(this.annotationToEdit.date);
    this.email.setValue(this.annotationToEdit.email);
    this.commentaire.setValue(this.annotationToEdit.commentaire);
    this.note.setValue(this.annotationToEdit.note);

    this.annoProduitForm.reset();
    this.produitService.setValue(this.selectedProduit);
  }

  editAnno() {
    if (this.annotationForm.valid) {
      this.getValues();
      this.annoService.editAnnotation(this.annotationToEdit).subscribe(
        (success) => {
          this.toastr.success("L'annotation a été modifié avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const listUrl = ['annotation/simple/list-annotation'];
            this.router.navigate(listUrl);
          }, 2000);
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

  async onclickAddToAnno() {
    if (this.annotationForm.valid) {
      await this.getAnnoFormValues();
      if (this.annotationToEdit.produitService) {
        this.psService.deleteAnnotationFromList(this.annotationToEdit.produitService, this.annotationToEdit._id).subscribe(
          (success) => {
            this.annoService.addAnnotationProduit(this.annotationToEdit._id, this.annoProduit).subscribe(
              (success) => {
                this.psService.addAnnotationToList(this.annoProduit, this.annotationToEdit._id).subscribe(
                  (success) => {
                    this.toastr.success("Le produit a été avec succès à l'annotation", "👌", {
                      timeOut: 2000,
                      progressBar: true,
                      progressAnimation: 'increasing',
                      positionClass: 'toast-top-right'
                    });
                    setTimeout(() => {
                      const listUrl = ['annotation/simple/list-annotation'];
                      this.router.navigate(listUrl);
                    }, 2000);
                  },
                  (error) => {
                    console.log(error);
                  }
                );

              },
              (error) => {
                console.log(error);
              }
            );
          },
          (error) => {
            console.log(error);
          }
        )
      } else {
        this.annoService.addAnnotationProduit(this.annotationToEdit._id, this.annoProduit).subscribe(
          (success) => {
            this.psService.addAnnotationToList(this.annoProduit, this.annotationToEdit._id).subscribe(
              (success) => {
                this.toastr.success("Le produit a été avec succès à l'annotation", "👌", {
                  timeOut: 2000,
                  progressBar: true,
                  progressAnimation: 'increasing',
                  positionClass: 'toast-top-right'
                });
                setTimeout(() => {
                  const listUrl = ['annotation/simple/list-annotation'];
                  this.router.navigate(listUrl);
                }, 2000);
              },
              (error) => {
                console.log(error);
              }
            );

          },
          (error) => {
            console.log(error);
          }
        );
      }
    } else {
      this.toastr.error("Merci de bien vouloir choisir le produit", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }

  }
  async getAnnoFormValues() {
    await this.psService.getAllProducts().toPromise()
      .then(success => {
        this.annoProduit = success.filter(p => p.refProduit === this.produitService.value[0]).map(p => p._id)[0];
      })
      .catch(error => {
        console.log(error);
      })
  }

  getValues() {
    this.annotationToEdit.commentaire = this.commentaire.value;
    this.annotationToEdit.date = this.date.value;
    this.annotationToEdit.email = this.email.value;
    this.annotationToEdit.note = this.note.value;
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

}
