import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { listCouleurSaison, listCurrencie, listDistributeur, listZones } from 'src/app/shared/helpers/data.helper';
import { TarifSaisonnier } from 'src/app/shared/model/produit-simple/tarif-saisonnier.model';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { TarifSaisonnierService } from 'src/app/shared/service/produit-simple/tarif-saisonnier.service';

@Component({
  selector: 'app-edit-tarif-saisonnier',
  templateUrl: './edit-tarif-saisonnier.component.html',
  styleUrls: ['./edit-tarif-saisonnier.component.scss']
})
export class EditTarifSaisonnierComponent implements OnInit {
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

  public tsProduit: any;

  public tsToEdit: TarifSaisonnier;

  // Dropdown produit
  produits: Array<string> = [];
  selectedProduit: Array<string> = [];
  dropdownProduitSettings: any = {};
  closeDropdownProduitSelection = false;
  disabledDropdownProduit = false;

  // Dropdown saison
  saisons: Array<string> = [];
  selectedSaison: Array<string> = [];
  dropdownSaisonSettings: any = {};
  closeDropdownSaisonSelection = false;
  disabledDropdownSaison = false;

  // Dropdown couleur saison
  couleurSaisons: Array<string> = [];
  selectedCouleurSaison: Array<string> = [];
  dropdownCouleurSaisonsSettings: any = {};
  closeDropdownCouleurSaisonsSelection = false;
  disabledDropdownCouleurSaisons = false;

  // Dropdown monnaie
  disabledDropdownMonnaie = false;
  showFilterMonnaie = true;
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
  showFilterZone = true;
  limitSelectionZone = false;
  zones: Array<any> = [];
  selectedZones: Array<any> = [];
  dropdownZoneSettings: any = {};
  listSaison: string[];

  constructor(private produitService: ProduitSimpleService, private router: Router, private tarifSaisonnierService: TarifSaisonnierService, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.tsToEdit = new TarifSaisonnier();
    // Dropdown produit
    this.dropdownProduitSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownProduitSelection
    };
    // Dropdown saisons
    this.saisons = this.listSaison;
    this.selectedSaison = [];
    this.dropdownSaisonSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownSaisonSelection
    };

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
    this.resetAllValues();

  }

  resetAllValues() {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.tarifSaisonnierService.findTarifSaisonnierById(success.id).subscribe(
          (success) => {
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

            this.produitService.getAllProducts().subscribe(
              (success) => {
                this.produits = success.map(p => p.refProduit);
                this.selectedProduit = success.filter(p => p._id === this.selectedTs.produitService).map(p => p.refProduit);
              },
              (error) => {
                console.log(error);
              })

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
  onclickEdit(myForm: NgForm) {
    if (myForm.valid) {
      this.getValues();
      this.tarifSaisonnierService.editTarifSaisonnier(this.tsToEdit).subscribe(
        (success) => {
          this.toastr.success("Le Tarif saisonnier été modifier avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const listUrl = ['tarif-saisonnier/simple/list-tarif-saisonnier'];
            this.router.navigate(listUrl);
          }, 2000);
        },
        (error) => {
          console.log(error);
        });

    } else {
      this.toastr.error("Merci de bien vouloir remplir les champs du formulaire", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }

  }

  onclickDiscard() {
    this.resetAllValues();

  }

  async onclickAddToTs(tspForm: NgForm) {
    if (tspForm.valid) {
      await this.getTspValues();
      if (this.selectedTs.produitService){
        this.produitService.deleteTarifSaisonnierFromList(this.selectedTs.produitService, this.selectedTs._id).subscribe(
          (success)=>{
            this.tarifSaisonnierService.addTarifSaisonnierProduit(this.selectedTs._id, this.tsProduit).subscribe(
              (success) => {
                this.produitService.addTarifSaisonnierToList(this.tsProduit, this.selectedTs._id).subscribe(
                  (success) => {
                    this.toastr.success("Le produit a été avec succès au tarif saisonnier", "👌", {
                      timeOut: 2000,
                      progressBar: true,
                      progressAnimation: 'increasing',
                      positionClass: 'toast-top-right'
                    });
                    setTimeout(() => {
                      const listUrl = ['tarif-saisonnier/simple/list-tarif-saisonnier'];
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
          (error)=>{
            console.log(error);
          }
        )
      }else{
        this.tarifSaisonnierService.addTarifSaisonnierProduit(this.selectedTs._id, this.tsProduit).subscribe(
          (success) => {
            this.produitService.addTarifSaisonnierToList(this.tsProduit, this.selectedTs._id).subscribe(
              (success) => {
                this.toastr.success("Le produit a été avec succès au tarif saisonnier", "👌", {
                  timeOut: 2000,
                  progressBar: true,
                  progressAnimation: 'increasing',
                  positionClass: 'toast-top-right'
                });
                setTimeout(() => {
                  const listUrl = ['tarif-saisonnier/simple/list-tarif-saisonnier'];
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

  getValues() {
    this.tsToEdit._id = this.selectedTs._id;
    this.tsToEdit.labelTarif = this.selectedTs.labelTarif;
    this.tsToEdit.tarifUHT = Number.parseFloat(this.selectedTs.tarifUHT);
    this.tsToEdit.monnaie = this.selectedTs.monnaie[0].item_text;
    this.tsToEdit.saison = this.selectedTs.saison[0];
    this.tsToEdit.couleurSaison = this.selectedTs.couleurSaison[0];
    this.tsToEdit.appToAllDistrs = this.selectedTs.appToAllDistrs == "Oui";
    this.tsToEdit.concernDistrs = this.selectedTs.concernDistrs;
    this.tsToEdit.appToAllZones = this.selectedTs.appToAllZones == "Oui";
    this.tsToEdit.concernZones = this.selectedTs.concernZones.map(x => x.item_text);
    this.tsToEdit.produitService = this.selectedTs.produitService;
    this.tsToEdit.dateDebut = new Date(this.selectedTs.dateDebut.year, this.selectedTs.dateDebut.month - 1, this.selectedTs.dateDebut.day);
    this.tsToEdit.dateFin = new Date(this.selectedTs.dateFin.year, this.selectedTs.dateFin.month - 1, this.selectedTs.dateFin.day);

  }

  async getTspValues(){
      await this.produitService.getAllProducts().toPromise()
      .then(success=>{
        this.tsProduit = success.filter(p => p.refProduit === this.selectedProduit[0]).map(p => p._id)[0];
      })
      .catch(error=>console.log(error));
  }


}
