import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { listCouleurSaison, listCurrencie, listDistributeur, listSaison, listZones } from 'src/app/shared/helpers/data.helper';
import { TarifSaisonnierService } from 'src/app/shared/service/produit-simple/tarif-saisonnier.service';

@Component({
  selector: 'app-details-tarif-saisonnier',
  templateUrl: './details-tarif-saisonnier.component.html',
  styleUrls: ['./details-tarif-saisonnier.component.scss']
})
export class DetailsTarifSaisonnierComponent implements OnInit {
  public selectedTs = {
    _id: '',
    labelTarif: '',
    saison: [],
    couleurSaison: [],
    monnaie: [],
    tarifUHT: '',
    dateDebut: { year: 0, month: 0, day: 0 },
    dateFin: { year: 0, month: 0, day: 0 },
    appToAllDistrs: '',
    concernDistrs: [],
    appToAllZones: '',
    concernZones: [],
    produitService: ''
  };
  // Dropdown saison
  saisons: Array<String> = [];
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
  showFilterMonnaie = false;
  limitSelectionMonnaie = false;
  monnaies: Array<any> = [];
  selectedMonnaie: Array<any> = [];
  dropdownMonnaieSettings: any = {};

  // Dropdown distributeurs
  distributeurs: Array<string> = [];
  selectedDistributeurs: Array<string> = [];
  dropdownDistributeursSettings: any = {};
  closeDropdownDistributeursSelection = false;
  disabledDropdownDistributeurs = false;
  // Dropdown zones
  disabledDropdownZone = false;
  showFilterZone = false;
  limitSelectionZone = false;
  zones: Array<any> = [];
  selectedZones: Array<any> = [];
  dropdownZoneSettings: any = {};
  listSaison: String[];
  listCouleurSaison: String[];
  listCurrencie: any[];
  listDistributeur: string[];
  listZones: any[];

  constructor(private router: Router, private tarifSaisonnierService: TarifSaisonnierService, private activatedRoute: ActivatedRoute) {

  }

  createCouleurSaisonDropdown() {
    // Dropdown couleur saisons
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

  createSaisonDropdonwn() {
    // Dropdown saisons
    this.saisons = listSaison;
    this.selectedSaison = [];
    this.dropdownSaisonSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownSaisonSelection
    };
  }

  createMonnaieDropdown() {
    // Dropdown monnaies
    this.monnaies = listCurrencie;
    this.dropdownMonnaieSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: this.showFilterMonnaie
    };
  }

  createDistributeurDropdown() {
    // Dropdown distributeurs
    this.distributeurs = listDistributeur;
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
    // Dropdown zones
    this.zones = listZones;
    this.dropdownZoneSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: this.showFilterZone
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.tarifSaisonnierService.findTarifSaisonnierById(success.id).subscribe(
          (success) => {
            this.createCouleurSaisonDropdown();
            this.createSaisonDropdonwn();
            this.createZoneDropdown();
            this.createMonnaieDropdown();
            this.createDistributeurDropdown();
            this.createZoneDropdown();
            this.selectedTs._id = success._id;
            this.selectedTs.labelTarif = success.labelTarif;
            this.selectedTs.tarifUHT = success.tarifUHT.toString();
            this.selectedTs.saison = [success.saison];
            this.selectedTs.couleurSaison = [success.couleurSaison];
            this.selectedTs.monnaie = this.monnaies.filter(item => item.item_text == success.monnaie);
            this.selectedTs.appToAllDistrs = success.appToAllDistrs ? "Oui" : "Non";
            this.selectedTs.appToAllZones = success.appToAllZones ? "Oui" : "Non";
            this.selectedTs.concernDistrs = this.distributeurs.filter(item => success.concernDistrs.includes(item));
            this.selectedTs.concernZones = this.zones.filter(item => success.concernZones.includes(item.item_text));
            this.selectedTs.produitService = success.produitService;
            let dateDebut = new Date(success.dateDebut)
            this.selectedTs.dateDebut = {
              year: dateDebut.getFullYear(),
              month: dateDebut.getMonth() + 1,
              day: dateDebut.getDate()
            }

            let dateFin = new Date(success.dateFin)
            this.selectedTs.dateFin = {
              year: dateFin.getFullYear(),
              month: dateFin.getMonth() + 1,
              day: dateFin.getDate()
            }
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

  // Monnaies dropdown
  get getMonnaies() {
    return this.monnaies.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  // Zones dropdown
  get getZones() {
    return this.zones.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  // Operations
  associatedProduct() {
    const detailUrl = ['gestion-produits/simple/details-produit', this.selectedTs.produitService];
    this.router.navigate(detailUrl);
  }

  goToList() {
    const url = ["/tarif-saisonnier/simple/list-tarif-saisonnier"]
    this.router.navigate(url)
  }


}
