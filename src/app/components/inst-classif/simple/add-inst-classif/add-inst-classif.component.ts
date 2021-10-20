import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { generateReference } from 'src/app/shared/helpers/functions.helper';
import { InstClassif } from 'src/app/shared/model/produit-simple/inst-classif.model';
import { Classification } from 'src/app/shared/model/taxonomie-classification/classification.model';
import { InstClassificationService } from 'src/app/shared/service/produit-simple/inst-classification.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { ClassificationService } from 'src/app/shared/service/taxonomie-classification/classification.service';

@Component({
  selector: 'app-add-inst-classif',
  templateUrl: './add-inst-classif.component.html',
  styleUrls: ['./add-inst-classif.component.scss']
})
export class AddInstClassifComponent implements OnInit {
  public instClassifForm: FormGroup;
  public instClassifToAdd = new InstClassif();
  public productId: string;
  public url = {
    img: "assets/images/user.png",
  };
  public classification: Classification = new Classification();
  // Dropdown Valeur
  disabledDropdownValeur = false;
  showFilterValeur = true;
  limitSelectionValeur = false;
  listValeur: Array<any> = [];
  selectedValeur: Array<any> = [];
  dropdownValeurSettings: any = {};

  constructor(private classificationService: ClassificationService, private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private instClassifService: InstClassificationService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.productId = success.id;
        this.activatedRoute.queryParams.subscribe(
          (success) => {
            this.classificationService.getClassificationById(success.classificationId).subscribe(
              (success) => {
                this.classification = success;
                this.createValeurDropDown();
                this.createInstClassifForm();
                this.initFormValues();
              },
              (error) => {
                console.log(error);
              }
            )
          },
          (error) => {
            console.log(error);
          })
      },
      (error) => {
        console.log(error);
        const listUrl = ['gestion-produits/simple/list-produit'];
        this.router.navigate(listUrl);
      })
  }

  createValeurDropDown() {
    this.psService.findProductById(this.productId).subscribe(
      (success) => {
        this.listValeur = [];
        let affectedValues = success.instClassifs.map(x => x.ref_classif_valeur);
        this.classification.classif_valeurs.map(x => {
          if (!affectedValues.includes(x.ref_classif_valeur)) {
            let tmp = {
              ref: x.ref_classif_valeur,
              val_texte: x.val_texte
            }
            this.listValeur.push(tmp);
          }
        });
        this.selectedValeur = []
        this.dropdownValeurSettings = {
          singleSelection: true,
          idField: 'ref',
          textField: 'val_texte',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          allowSearchFilter: this.showFilterValeur
        };
      },
      (error) => {
        console.log(error);
      }
    )
  }

  createInstClassifForm() {
    this.instClassifForm = this.fb.group({
      ref_classif_valeur: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      label_texte: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      domaine: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      valeur: this.fb.control({ value: '', disabled: false }, [Validators.required])
    });
  }

  initFormValues() {
    this.ref_classif_valeur.setValue(this.classification.ref_classif_valeur);
    this.label_texte.setValue(this.classification.label_texte);
    this.domaine.setValue(this.classification.domaine.domaine);
    this.valeur.setValue(this.selectedValeur);
  }

  get ref_classif_valeur() {
    return this.instClassifForm.get('ref_classif_valeur');
  }

  get label_texte() {
    return this.instClassifForm.get('label_texte');
  }

  get domaine() {
    return this.instClassifForm.get('domaine');
  }

  get valeur() {
    return this.instClassifForm.get('valeur');
  }

  clearValues() {
    this.instClassifForm.reset();
    this.instClassifToAdd = new InstClassif();
  }

  addInstClassif() {
    if (this.instClassifForm.valid) {
      this.getValues();
      this.instClassifService.addInstClassif(this.instClassifToAdd).subscribe(
        (success) => {
          this.psService.addInstClassifsToList(this.productId, success._id).subscribe(
            (success) => {
              this.toastr.success("L'instant classification a été ajoutée avec succès", "👌", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
              setTimeout(() => {
                const editUrl = ['gestion-produits/simple/edit-produit', this.productId];
                this.router.navigate(editUrl);
              }, 2000);

            },
            (error) => {
              console.log({ error: error });
              this.toastr.error("L'instant classification n'a pas été ajoutée au produit", "🥵", {
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
          this.toastr.error("L'instant classification n'a pas pu être ajoutée avec succès", "🥵", {
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
    this.instClassifToAdd.ref_classif_valeur = this.ref_classif_valeur.value;
    this.instClassifToAdd.label_texte = this.label_texte.value;
    this.instClassifToAdd.domaine = this.domaine.value;
    this.instClassifToAdd.valeur = this.valeur.value[0].val_texte;
  }

  onValeurSelect(item: any) {
    this.ref_classif_valeur.setValue(item.ref);
  }
}
