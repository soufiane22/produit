import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { InstClassif } from 'src/app/shared/model/produit-simple/inst-classif.model';
import { InstClassificationService } from 'src/app/shared/service/produit-simple/inst-classification.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-inst-classif',
  templateUrl: './edit-inst-classif.component.html',
  styleUrls: ['./edit-inst-classif.component.scss']
})
export class EditInstClassifComponent implements OnInit {
  public instClassifForm: FormGroup;
  public instClassifProduitForm: FormGroup;
  public instClassifToEdit = new InstClassif();
  public instClassif = new InstClassif();
  public instClassifProduit: any;
  public url = {
    img: "assets/images/user.png",
  };
  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private instClassifService: InstClassificationService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.instClassifService.findInstClassifById(success.id).subscribe(
          (success) => {
            this.instClassif = success;
            this.createInstClassifForm();
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

  createInstClassifForm() {
    this.instClassifForm = this.fb.group({
      ref_classif_valeur: [this.instClassif.ref_classif_valeur, [Validators.required]],
      label_texte: [this.instClassif.label_texte, [Validators.required]],
      domaine: [this.instClassif.domaine, [Validators.required]],
      valeur: [this.instClassif.valeur, [Validators.required]]
    });
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
    this.label_texte.setValue(this.instClassif.label_texte);
    this.ref_classif_valeur.setValue(this.instClassif.ref_classif_valeur);

    this.instClassifProduitForm.reset();
  }

  editInstClassif() {
    if (this.instClassifForm.valid) {
      this.getValues();
      this.instClassifService.editInstClassif(this.instClassif._id, this.instClassifToEdit).subscribe(
        (success) => {
          this.toastr.success("L'instance classification a été modifié avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const listUrl = ['inst-classif/simple/list-inst-classif'];
            this.router.navigate(listUrl);
          }, 2000);
        },
        (error) => {
          console.log(error);
          this.toastr.error("L'instance classification  n'a pas pu être ajouté avec succès", "🥵", {
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
    this.instClassifToEdit.ref_classif_valeur=this.ref_classif_valeur.value;
    this.instClassifToEdit.label_texte=this.label_texte.value;
  }


}
