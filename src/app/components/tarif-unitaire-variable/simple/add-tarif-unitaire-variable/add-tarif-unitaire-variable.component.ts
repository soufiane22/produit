import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { listDistributeur, listZones, listCurrencie } from 'src/app/shared/helpers/data.helper';
import { GrilleTarifaire } from 'src/app/shared/model/produit-simple/grille-tarifaire.model';
import { TarifUnitVar } from 'src/app/shared/model/produit-simple/tarif-unit-var.model';
import { GrilleTarifaireService } from 'src/app/shared/service/produit-simple/grille-tarifaire.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { TarifUnitVarService } from 'src/app/shared/service/produit-simple/tarif-unitaire-variable.service';

@Component({
  selector: 'app-add-tarif-unitaire-variable',
  templateUrl: './add-tarif-unitaire-variable.component.html',
  styleUrls: ['./add-tarif-unitaire-variable.component.scss']
})
export class AddTarifUnitaireVariableComponent implements OnInit {

  public tarifUnitaireVariableForm: FormGroup;
  public tarifUnitaireVariableToAdd = new TarifUnitVar();
  // Dropdown monnaie
  disabledDropdownMonnaie = false;
  showFilterMonnaie = true;
  limitSelectionMonnaie = false;
  listMonnaies: Array<any> = [];
  selectedMonnaie: Array<any> = [];
  dropdownMonnaieSettings: any = {};

  // Dropdown distributeurs
  listDistributeurs: Array<string> = [];
  selectedDistributeurs: Array<string> = [];
  dropdownDistributeursSettings: any = {};
  closeDropdownDistributeursSelection = false;
  disabledDropdownDistributeurs = false;
  // Dropdown zones
  disabledDropdownZone = false;
  showFilterZone = true;
  limitSelectionZone = false;
  listZones: Array<any> = [];
  selectedZones: Array<any> = [];
  dropdownZoneSettings: any = {};

  constructor(private psService: ProduitSimpleService,private tuvService: TarifUnitVarService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.createTarifUnitaireVariableForm();
    this.createDistribDropDown();
    this.createZoneDropDown();
    this.createMonnaieDropDown();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.tarifUnitaireVariableToAdd.produitService = success.id;
      },
      (error) => {
        console.log(error);
        const listUrl = ['gestion-produits/simple/list-produit'];
        this.router.navigate(listUrl);
      })
  }

  createDistribDropDown() {
    this.listDistributeurs = listDistributeur;
    this.selectedDistributeurs = [];
    this.dropdownDistributeursSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownDistributeursSelection
    };
  }

  createZoneDropDown() {
    this.listZones = listZones;
    this.dropdownZoneSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: this.showFilterZone
    };
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

  createTarifUnitaireVariableForm() {
    this.tarifUnitaireVariableForm = this.fb.group({
      tarifUHT: ['', [Validators.required]],
      commentaire: ['', [Validators.required]],
      description: ['', [Validators.required]],
      monnaie: [this.selectedMonnaie, [Validators.required]],
      appToAllDistrs: ['', [Validators.required]],
      concernDistrs: [this.selectedDistributeurs, [Validators.required]],
      appToAllZones: ['', [Validators.required]],
      concernZones: [this.selectedZones, [Validators.required]],
    });
  }

  get getMonnaies() {
    return this.listMonnaies.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  get getZones() {
    return this.listZones.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  addGrilleTarifaire() {
    if (this.tarifUnitaireVariableForm.valid) {
      this.getValues();
      this.tuvService.addTarifUnitVar(this.tarifUnitaireVariableToAdd).subscribe(
        (success) => {
          this.toastr.success("Le tarif unitaire variable a été ajoutée avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          this.psService.addTarifUnitaireVariableToList(this.tarifUnitaireVariableToAdd.produitService, success._id).subscribe(
            (success) => {
              setTimeout(() => {
                const editUrl = ['gestion-produits/simple/edit-produit', this.tarifUnitaireVariableToAdd.produitService];
                this.router.navigate(editUrl);
              }, 2000);

            },
            (error) => {
              console.log({ error: error });
              this.toastr.error("Le tarif unitaire variable n'a pas été ajoutée", "🥵", {
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

  getValues() {
    this.tarifUnitaireVariableToAdd.description = this.tarifUnitaireVariableForm.value.description;
    this.tarifUnitaireVariableToAdd.commentaire = this.tarifUnitaireVariableForm.value.commentaire;
    this.tarifUnitaireVariableToAdd.monnaie = this.monnaie.value[0].item_text;
    this.tarifUnitaireVariableToAdd.tarifUHT = this.tarifUnitaireVariableForm.value.tarifUHT;
    this.tarifUnitaireVariableToAdd.concernDistrs = this.concernDistrs.value.map(x => x);
    this.tarifUnitaireVariableToAdd.concernZones = this.concernZones.value.map(x => x.item_text);
    this.tarifUnitaireVariableToAdd.noConcernDistrs = this.listDistributeurs.filter(x => !this.tarifUnitaireVariableToAdd.concernDistrs.includes(x))
    let tmp = this.listZones.filter(x => !this.tarifUnitaireVariableToAdd.concernZones.includes(x.item_text));
    this.tarifUnitaireVariableToAdd.noConcernZones = tmp.map(x => x.item_text);
    this.tarifUnitaireVariableToAdd.appToAllDistrs = this.appToAllDistrs.value === "Oui";
    this.tarifUnitaireVariableToAdd.appToAllZones = this.appToAllZones.value === "Oui";
  }

  clearValues() {
    this.tarifUnitaireVariableForm.reset();
    this.tarifUnitaireVariableToAdd = new GrilleTarifaire();
    this.toastr.success("Le formulaire a été réinitialisé avec succès", "👌", {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    });

  }

  get description() {
    return this.tarifUnitaireVariableForm.get('description');
  }

  get tarifUHT() {
    return this.tarifUnitaireVariableForm.get('tarifUHT');
  }

  get commentaire() {
    return this.tarifUnitaireVariableForm.get('commentaire');
  }

  get monnaie() {
    return this.tarifUnitaireVariableForm.get('monnaie');
  }

  get appToAllDistrs() {
    return this.tarifUnitaireVariableForm.get('appToAllDistrs');
  }

  get concernDistrs() {
    return this.tarifUnitaireVariableForm.get('concernDistrs');
  }

  get appToAllZones() {
    return this.tarifUnitaireVariableForm.get('appToAllZones');
  }

  get concernZones() {
    return this.tarifUnitaireVariableForm.get('concernZones');
  }



}
