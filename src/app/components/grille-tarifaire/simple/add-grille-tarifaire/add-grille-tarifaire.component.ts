import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lessThanValidator } from 'src/app/shared/directives/less-than.directive';
import { listDistributeur, listZones, listCurrencie } from 'src/app/shared/helpers/data.helper';

import { GrilleTarifaire } from 'src/app/shared/model/produit-simple/grille-tarifaire.model';
import { GrilleTarifaireService } from 'src/app/shared/service/produit-simple/grille-tarifaire.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-add-grille-tarifaire',
  templateUrl: './add-grille-tarifaire.component.html',
  styleUrls: ['./add-grille-tarifaire.component.scss']
})

export class AddGrilleTarifaireComponent implements OnInit {

  public grilleTarifaireForm: FormGroup;
  public grilleTarifaireToAdd = new GrilleTarifaire();
  // Dropdown monnaie
  disabledDropdownMonnaie = false;
  showFilterMonnaie = true;
  limitSelectionMonnaie = false;
  listMonnaies: Array<any> = [];
  selectedMonnaie: Array<any> = [];
  dropdownMonnaieSettings: any = {};

  productId:string='';


  constructor(private psService: ProduitSimpleService,private gtService: GrilleTarifaireService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.createGrilleTarifaireForm();
    this.createMonnaieDropDown();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.productId = success.id;
      },
      (error) => {
        console.log(error);
        const listUrl = ['gestion-produits/simple/list-produit'];
        this.router.navigate(listUrl);
      })
  }

  createMonnaieDropDown() {
    this.listMonnaies = listCurrencie;
    this.dropdownMonnaieSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: this.showFilterMonnaie
    };
  }

  createGrilleTarifaireForm() {
    this.grilleTarifaireForm = this.fb.group({
      qte_inf: [1, [Validators.required, Validators.min(1), Validators.pattern('[0-9]+')]],
      qte_sup: [2, [Validators.required, Validators.min(1),  Validators.pattern('[0-9]+')]],
      tarif_unitaire_ht: ['', [Validators.required]],
      valeur: ['', [Validators.required]],
      ref_grille: ['', [Validators.required]],
      monnaie: [this.selectedMonnaie, [Validators.required]],
    },{validators: lessThanValidator});
  }

  get getMonnaies() {
    return this.listMonnaies.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  addGrilleTarifaire() {
    if (this.grilleTarifaireForm.valid) {
      this.getValues();
      this.gtService.addGrilleTarifaire(this.grilleTarifaireToAdd).subscribe(
        (success) => {
          this.toastr.success("La grille tarifaire a été ajoutée avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          this.psService.addGrilleTarifaireToList(this.productId, success._id).subscribe(
            (success) => {
              setTimeout(() => {
                const editUrl = ['gestion-produits/simple/edit-produit', this.productId];
                this.router.navigate(editUrl);
              }, 2000);

            },
            (error) => {
              console.log({ error: error });
              this.toastr.error("La grille tarifaire n'a pas été ajoutée", "🥵", {
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
          this.toastr.error("La grille tarifaire  n'a pas pu être ajouté avec succès", "🥵", {
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
    this.grilleTarifaireToAdd.qte_inf = this.grilleTarifaireForm.value.qte_inf;
    this.grilleTarifaireToAdd.qte_sup = this.grilleTarifaireForm.value.qte_sup;
    this.grilleTarifaireToAdd.ref_grille = this.grilleTarifaireForm.value.ref_grille;
    this.grilleTarifaireToAdd.monnaie = this.monnaie.value[0].item_text;
    this.grilleTarifaireToAdd.valeur = this.grilleTarifaireForm.value.valeur;
    this.grilleTarifaireToAdd.tarif_unitaire_ht = this.grilleTarifaireForm.value.tarif_unitaire_ht;
  }

  clearValues() {
    this.grilleTarifaireForm.reset();
    this.grilleTarifaireToAdd = new GrilleTarifaire();
    this.toastr.success("Le formulaire a été réinitialisé avec succès", "👌", {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    });

  }

  get qte_inf() {
    return this.grilleTarifaireForm.get('qte_inf');
  }

  get qte_sup() {
    return this.grilleTarifaireForm.get('qte_sup');
  }

  get tarif_unitaire_ht() {
    return this.grilleTarifaireForm.get('tarif_unitaire_ht');
  }

  get valeur() {
    return this.grilleTarifaireForm.get('valeur');
  }

  get ref_grille() {
    return this.grilleTarifaireForm.get('ref_grille');
  }

  get monnaie() {
    return this.grilleTarifaireForm.get('monnaie');
  }

  get appToAllDistrs() {
    return this.grilleTarifaireForm.get('appToAllDistrs');
  }

  get concernDistrs() {
    return this.grilleTarifaireForm.get('concernDistrs');
  }

  get appToAllZones() {
    return this.grilleTarifaireForm.get('appToAllZones');
  }

  get concernZones() {
    return this.grilleTarifaireForm.get('concernZones');
  }

  increment(type: string) {
    if (type === 'inf') {
      this.grilleTarifaireForm.get('qte_inf').setValue(this.qte_inf.value + 1);
    } else {
      this.grilleTarifaireForm.get('qte_sup').setValue(this.qte_sup.value + 1);
    }
  }

  decrement(type: string) {
    if (type === 'inf') {
      this.grilleTarifaireForm.get('qte_inf').setValue(this.qte_inf.value - 1);
    } else {
      this.grilleTarifaireForm.get('qte_sup').setValue(this.qte_sup.value - 1);
    }
  }

}
