import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { TarifSaisonnier } from 'src/app/shared/model/produit-simple/tarif-saisonnier.model';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { TarifSaisonnierService } from 'src/app/shared/service/produit-simple/tarif-saisonnier.service';
import { DirtyComponent } from 'src/app/shared/guards/dirty-check.guard';
import { Observable } from 'rxjs';
import { listSaison, listCouleurSaison, listDistributeur, listZones, listCurrencie } from 'src/app/shared/helpers/data.helper';



@Component({
  selector: 'app-add-tarif-saisonnier',
  templateUrl: './add-tarif-saisonnier.component.html',
  styleUrls: ['./add-tarif-saisonnier.component.scss']
})
export class AddTarifSaisonnierComponent implements OnInit, DirtyComponent {

  public isDirty: boolean = false;
  myForm: FormGroup;
  model: NgbDateStruct;
  date: { year: number, month: number };
  tarifSaisonnier: TarifSaisonnier;

  // Dropdown saison
  listSaisons: Array<String> = [];
  selectedSaison: Array<String> = [];
  dropdownSaisonSettings: any = {};
  closeDropdownSaisonSelection = false;
  disabledDropdownSaison = false;

  // Dropdown couleur saison
  couleurSaisons: Array<String> = [];
  selectedCouleurSaison: Array<String> = [];
  dropdownCouleurSaisonsSettings: any = {};
  closeDropdownCouleurSaisonsSelection = false;
  disabledDropdownCouleurSaisons = false;

  // Dropdown monnaie
  disabledDropdownMonnaie = false;
  showFilterMonnaie = true;
  limitSelectionMonnaie = false;
  listMonnaies: Array<any> = [];
  selectedMonnaie: Array<any> = [];
  dropdownMonnaieSettings: any = {};

  // Dropdown listDistributeurs
  listDistributeurs: Array<string> = [];
  selectedDistributeurs: Array<string> = [];
  notSelectedDistributeurs: Array<string> = [];
  dropdownDistributeursSettings: any = {};
  closeDropdownDistributeursSelection = false;
  disabledDropdownDistributeurs = false;
  // Dropdown listZones
  disabledDropdownZone = false;
  showFilterZone = true;
  limitSelectionZone = false;
  listZones: Array<any> = [];
  selectedZones: Array<any> = [];
  notSelectedZones: Array<any> = [];
  dropdownZoneSettings: any = {};

  constructor(private router: Router, private fb: FormBuilder, private calendar: NgbCalendar, private toastr: ToastrService, private activatedRoute: ActivatedRoute,
    private produitService: ProduitSimpleService, private tarifSaisonnierService: TarifSaisonnierService) {
    this.tarifSaisonnier = new TarifSaisonnier();

    this.createSaisonDropdown();

    this.createCouleurSaisonDropdown();

    this.createMonnaieDropdown();

    this.createDistributeurDropdown();

    this.createZoneDropdown();

    this.createTarifSaisonnierForm();

    this.myForm.valueChanges.subscribe(e => this.isDirty = true);
  }

  createSaisonDropdown() {
    // Dropdown listSaisons
    this.listSaisons = listSaison;
    this.selectedSaison = [];
    this.dropdownSaisonSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownSaisonSelection
    };
  }

  createCouleurSaisonDropdown() {
    // Dropdown couleur listSaisons
    this.couleurSaisons = listCouleurSaison;
    this.selectedCouleurSaison = [];
    this.dropdownCouleurSaisonsSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownCouleurSaisonsSelection
    };
  }

  createDistributeurDropdown() {
    // Dropdown listDistributeurs
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

  createZoneDropdown() {
    // Dropdown listZones
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

  createMonnaieDropdown(){
    // Dropdown listMonnaies
    this.listMonnaies = listCurrencie;
    this.dropdownMonnaieSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: this.showFilterMonnaie
    };
  }

  createTarifSaisonnierForm() {
    // Form
    this.myForm = this.fb.group({
      labelTarif: ['', [Validators.required]],
      saison: this.fb.control({ value: this.selectedSaison, disabled: this.disabledDropdownSaison }, [Validators.required]),
      couleurSaison: this.fb.control({ value: this.selectedCouleurSaison, disabled: this.disabledDropdownCouleurSaisons }, [Validators.required]),
      monnaie: this.fb.control({ value: this.selectedMonnaie, disabled: this.disabledDropdownMonnaie }, [Validators.required]),
      appToAllZones: ['', [Validators.required]],
      dateDebut: ['', [Validators.required]],
      dateFin: ['', [Validators.required]],
      concernZones: this.fb.control({ value: this.selectedZones, disabled: this.disabledDropdownZone }, [Validators.required]),
      noConcernZones: this.fb.control({ value: this.notSelectedZones, disabled: this.disabledDropdownZone }, [Validators.required]),
      tarifUHT: ['', [Validators.required]],
      appToAllDistrs: ['', [Validators.required]],
      concernDistrs: this.fb.control({ value: this.selectedDistributeurs, disabled: this.disabledDropdownDistributeurs }, [Validators.required]),
      noConcernDistrs: this.fb.control({ value: this.notSelectedDistributeurs, disabled: this.disabledDropdownDistributeurs }, [Validators.required]),
    });
  }
  canDeactivate(): boolean | Observable<boolean> {
    return this.isDirty;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((success) => {
      this.produitService.findProductById(success.id).subscribe(
        (success) => {
          this.tarifSaisonnier.produitService = success;
        },
        (error) => {
          console.log(error);
        })
    },
      (error) => {
        console.log(error);
      })
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

  // Operations
  addTarifSaisonnier() {
    if (this.myForm.valid) {
      this.getValues();
      this.tarifSaisonnierService.addTarifSaisonnier(this.tarifSaisonnier).subscribe(
        (success) => {
          this.toastr.success("Le Tarif saisonnier été ajouté avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          this.produitService.addTarifSaisonnierToList(this.tarifSaisonnier.produitService._id, success._id).subscribe(
            (success) => {
              this.isDirty = false;
              setTimeout(() => {
                const editUrl = ['gestion-produits/simple/edit-produit', this.tarifSaisonnier.produitService._id];
                this.router.navigate(editUrl);
              }, 2000);

            },
            (error) => {
              console.log({ error: error });
              this.toastr.error("Le Tarif saisonnier n'a pas été ajouté", "🥵", {
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
          this.toastr.error("Le Tarif saisonnier n'a pas pu être ajouté avec succès", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        })

    } else {
      this.toastr.error("Veuillez bien remplir les champs du formulaire", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }

  }

  clearValues() {
    this.myForm.reset();
    this.tarifSaisonnier = new TarifSaisonnier();
    this.toastr.success("Le formulaire a été réinitialisé avec succès", "👌", {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    });
  }

  getValues() {
    this.tarifSaisonnier.couleurSaison = this.couleurSaison.value[0];
    this.tarifSaisonnier.saison = this.saison.value[0];
    this.tarifSaisonnier.monnaie = this.monnaie.value[0].item_text;
    this.tarifSaisonnier.labelTarif = this.labelTarif.value;
    this.tarifSaisonnier.tarifUHT = this.tarifUHT.value;
    this.tarifSaisonnier.dateDebut = new Date(this.dateDebut.value.year, this.dateDebut.value.month - 1, this.dateDebut.value.day);
    this.tarifSaisonnier.dateFin = new Date(this.dateFin.value.year, this.dateFin.value.month - 1, this.dateFin.value.day);
    this.tarifSaisonnier.appToAllDistrs = this.appToAllDistrs.value === "Oui";
    this.tarifSaisonnier.concernDistrs = this.concernDistrs.value;
    this.tarifSaisonnier.noConcernDistrs = this.noConcernDistrs.value;
    this.tarifSaisonnier.appToAllZones = this.appToAllZones.value === "Oui";
    this.tarifSaisonnier.concernZones = this.concernZones.value.map(x => x.item_text)
    this.tarifSaisonnier.noConcernZones = this.noConcernZones.value.map(x => x.item_text);
  }
  // Getters
  get dateDebut() {
    return this.myForm.get('dateDebut');
  }

  get dateFin() {
    return this.myForm.get('dateFin');
  }

  get labelTarif() {
    return this.myForm.get('labelTarif');
  }

  get saison() {
    return this.myForm.get('saison');
  }

  get tarifUHT() {
    return this.myForm.get('tarifUHT');
  }

  get monnaie() {
    return this.myForm.get('monnaie');
  }

  get couleurSaison() {
    return this.myForm.get('couleurSaison');
  }

  get appToAllDistrs() {
    return this.myForm.get('appToAllDistrs');
  }

  get concernDistrs() {
    return this.myForm.get('concernDistrs');
  }

  get noConcernDistrs(){
    return this.myForm.get('noConcernDistrs');
  }

  get appToAllZones() {
    return this.myForm.get('appToAllZones');
  }

  get concernZones() {
    return this.myForm.get('concernZones');
  }

  get noConcernZones(){
    return this.myForm.get('noConcernZones');
  }
}
