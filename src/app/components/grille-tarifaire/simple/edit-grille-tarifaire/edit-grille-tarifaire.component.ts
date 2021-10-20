import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lessThanValidator } from 'src/app/shared/directives/less-than.directive';
import { listDistributeur, listZones, listCurrencie } from 'src/app/shared/helpers/data.helper';
import { GrilleTarifaire } from 'src/app/shared/model/produit-simple/grille-tarifaire.model';
import { GrilleTarifaireService } from 'src/app/shared/service/produit-simple/grille-tarifaire.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-edit-grille-tarifaire',
  templateUrl: './edit-grille-tarifaire.component.html',
  styleUrls: ['./edit-grille-tarifaire.component.scss']
})
export class EditGrilleTarifaireComponent implements OnInit {
  public gtForm: FormGroup;
  public gtProduitForm: FormGroup;
  public gtToEdit = new GrilleTarifaire();
  public gtProduit: any;
  // Dropdown monnaie
  disabledDropdownMonnaie = false;
  showFilterMonnaie = true;
  limitSelectionMonnaie = false;
  listMonnaies: Array<any> = [];
  selectedMonnaie: Array<any> = [];
  dropdownMonnaieSettings: any = {};

  selectedProduit:string;
  constructor(private psService: ProduitSimpleService, private gtService: GrilleTarifaireService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.gtService.findGrilleTarifaireById(success.id).subscribe(
          (success) => {
            this.gtToEdit = success;
            this.createMonnaieDropDown();
            this.createTuvForm();
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

  createMonnaieDropDown() {
    this.listMonnaies = listCurrencie;
    this.selectedMonnaie = this.listMonnaies.filter(x => this.gtToEdit.monnaie === x.item_text);
    this.dropdownMonnaieSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: this.showFilterMonnaie
    };
  }

  createTuvForm() {
    this.gtForm = this.fb.group({
      ref_grille: [this.gtToEdit.ref_grille, [Validators.required]],
      qte_inf: [this.gtToEdit.qte_inf, [Validators.required, Validators.min(1), Validators.pattern('[0-9]+')]],
      qte_sup: [this.gtToEdit.qte_sup, [Validators.required, Validators.min(1), Validators.pattern('[0-9]+')]],
      tarif_unitaire_ht: [this.gtToEdit.tarif_unitaire_ht, [Validators.required]],
      valeur: [this.gtToEdit.valeur, [Validators.required]],
      monnaie: [this.selectedMonnaie, [Validators.required]]     
    }, { validators: lessThanValidator });
  }

  createTuvProduitForm() {
    this.gtProduitForm = this.fb.group({
      produit: [this.selectedProduit, [Validators.required]]
    });
  }

  get getMonnaies() {
    return this.listMonnaies.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }


  editGt() {
    if (this.gtForm.valid) {
      this.getValues();
      this.gtService.editGrilleTarifaire(this.gtToEdit).subscribe(
        (success) => {
          this.toastr.success("Le tarif unitaire variable a été modifié avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const listUrl = ['grille-tarifaire/simple/list-grille-tarifaire'];
            this.router.navigate(listUrl);
          }, 2000);
        },
        (error) => {
          console.log(error);
          this.toastr.error("Le tarif unitaire variable  n'a pas pu être ajouté avec succès", "🥵", {
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

  async onclickAddToGt() {
    if (this.gtProduitForm.valid) {
      await this.getGtFormValues();

    } else {
      this.toastr.error("Merci de bien vouloir choisir le produit", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }

  }
  async getGtFormValues() {
    await this.psService.getAllProducts().toPromise()
      .then(success => {
        this.gtProduit = success.filter(p => p.refProduit === this.produit.value[0]).map(p => p._id)[0];
      })
      .catch(error => {
        console.log(error);
      })
  }
  getValues() {
    this.gtToEdit.ref_grille = this.gtForm.value.ref_grille;
    this.gtToEdit.qte_inf = this.gtForm.value.qte_inf;
    this.gtToEdit.qte_sup = this.gtForm.value.qte_sup;
    this.gtToEdit.monnaie = this.monnaie.value[0].item_text;
    this.gtToEdit.valeur = this.gtForm.value.valeur;
    this.gtToEdit.tarif_unitaire_ht = this.gtForm.value.tarif_unitaire_ht;
  }


  clearValues() {
    this.gtForm.reset();
    this.qte_inf.setValue(this.gtToEdit.qte_inf);
    this.qte_sup.setValue(this.gtToEdit.qte_sup);
    this.ref_grille.setValue(this.gtToEdit.ref_grille);
    this.monnaie.setValue(this.selectedMonnaie);
    this.valeur.setValue(this.gtToEdit.valeur);
    this.tarif_unitaire_ht.setValue(this.gtToEdit.tarif_unitaire_ht);
    this.monnaie.setValue(this.selectedMonnaie);
  }

  get produit() {
    return this.gtProduitForm.get('produit');
  }

  get qte_inf() {
    return this.gtForm.get('qte_inf');
  }

  get qte_sup() {
    return this.gtForm.get('qte_sup');
  }

  get tarif_unitaire_ht() {
    return this.gtForm.get('tarif_unitaire_ht');
  }

  get valeur() {
    return this.gtForm.get('valeur');
  }

  get ref_grille() {
    return this.gtForm.get('ref_grille');
  }

  get monnaie() {
    return this.gtForm.get('monnaie');
  }

  get appToAllDistrs() {
    return this.gtForm.get('appToAllDistrs');
  }

  get concernDistrs() {
    return this.gtForm.get('concernDistrs');
  }

  get appToAllZones() {
    return this.gtForm.get('appToAllZones');
  }

  get concernZones() {
    return this.gtForm.get('concernZones');
  }

  increment(type: string) {
    if (type === 'inf') {
      this.gtForm.get('qte_inf').setValue(this.qte_inf.value + 1);
    } else {
      this.gtForm.get('qte_sup').setValue(this.qte_sup.value + 1);
    }
  }

  decrement(type: string) {
    if (type === 'inf') {
      this.gtForm.get('qte_inf').setValue(this.qte_inf.value - 1);
    } else {
      this.gtForm.get('qte_sup').setValue(this.qte_sup.value - 1);
    }
  }

}
