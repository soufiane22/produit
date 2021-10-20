import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { listDistributeur, listZones, listCurrencie } from 'src/app/shared/helpers/data.helper';
import { TarifUnitVar } from 'src/app/shared/model/produit-simple/tarif-unit-var.model';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { TarifUnitVarService } from 'src/app/shared/service/produit-simple/tarif-unitaire-variable.service';

@Component({
  selector: 'app-details-tarif-unitaire-variable',
  templateUrl: './details-tarif-unitaire-variable.component.html',
  styleUrls: ['./details-tarif-unitaire-variable.component.scss']
})
export class DetailsTarifUnitaireVariableComponent implements OnInit {

  public tuvForm: FormGroup;
  public tuvProduitForm: FormGroup;
  public tuvToShow = new TarifUnitVar();
  public tuvProduit: any;
  // Dropdown monnaie
  disabledDropdownMonnaie = true;
  showFilterMonnaie = true;
  limitSelectionMonnaie = false;
  listMonnaies: Array<any> = [];
  selectedMonnaie: Array<any> = [];
  dropdownMonnaieSettings: any = {};
  // Dropdown produits
  listProduits: Array<string> = [];
  selectedProduit: Array<string> = [];
  dropdownProduitSettings: any = {};
  closeDropdownProduitSelection = false;
  disabledDropdownProduit = true;
  // Dropdown distributeurs
  listDistributeurs: Array<string> = [];
  selectedDistributeurs: Array<string> = [];
  dropdownDistributeursSettings: any = {};
  closeDropdownDistributeursSelection = false;
  disabledDropdownDistributeurs = true;


  // Dropdown zones
  disabledDropdownZone = true;
  showFilterZone = true;
  limitSelectionZone = false;
  listZones: Array<any> = [];
  selectedZones: Array<any> = [];
  dropdownZoneSettings: any = {};

  constructor(private psService: ProduitSimpleService, private tuvService: TarifUnitVarService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.tuvService.findTarifUnitVarById(success.id).subscribe(
          (success) => {
            this.tuvToShow = success;
            this.createDistribDropDown();
            this.createPaysDropDown();
            this.createZoneDropDown();
            this.createMonnaieDropDown();
            this.createTarifUnitaireVariableForm();
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

  createDistribDropDown() {
    this.listDistributeurs = listDistributeur;
    this.selectedDistributeurs = this.tuvToShow.concernDistrs;
    this.dropdownDistributeursSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownDistributeursSelection
    };
  }

  createPaysDropDown() {
    // Dropdown produit
    this.psService.getAllProducts().subscribe(
      (success) => {
        this.listProduits = success.map(p => p.refProduit);
        this.selectedProduit = success.filter(p => p._id === this.tuvToShow
          .produitService).map(p => p.refProduit);
        this.createTuvProduitForm();
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
  createZoneDropDown() {
    this.listZones = listZones;
    this.selectedZones = this.listZones.filter(x => this.tuvToShow.concernZones.includes(x.item_text));
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
    this.selectedMonnaie = this.listMonnaies.filter(x => this.tuvToShow.monnaie === x.item_text);
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
    let x = this.tuvToShow.appToAllDistrs ? "Oui" : "Non"
    let y = this.tuvToShow.appToAllZones ? "Oui" : "Non"
    this.tuvForm = this.fb.group({
      tarifUHT: this.fb.control({value:this.tuvToShow.tarifUHT, disabled:true}),
      commentaire: this.fb.control({value:this.tuvToShow.commentaire, disabled:true}),
      description: this.fb.control({value:this.tuvToShow.description, disabled:this.disabledDropdownMonnaie}),
      monnaie: this.fb.control({value:this.selectedMonnaie, disabled:true}),
      appToAllDistrs: this.fb.control({value:x, disabled:true}),
      concernDistrs: this.fb.control({value:this.selectedDistributeurs, disabled:this.disabledDropdownDistributeurs}),
      appToAllZones: this.fb.control({value:y, disabled:true}),
      concernZones: this.fb.control({value:this.selectedZones, disabled:this.disabledDropdownZone}),
    });
  }

  createTuvProduitForm() {
    this.tuvProduitForm = this.fb.group({
      produitService: [this.selectedProduit, [Validators.required]]
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



  get produitService() {
    return this.tuvProduitForm.get('produitService');
  }

  get description() {
    return this.tuvForm.get('description');
  }

  get tarifUHT() {
    return this.tuvForm.get('tarifUHT');
  }

  get commentaire() {
    return this.tuvForm.get('commentaire');
  }

  get monnaie() {
    return this.tuvForm.get('monnaie');
  }

  get appToAllDistrs() {
    return this.tuvForm.get('appToAllDistrs');
  }

  get concernDistrs() {
    return this.tuvForm.get('concernDistrs');
  }

  get appToAllZones() {
    return this.tuvForm.get('appToAllZones');
  }

  get concernZones() {
    return this.tuvForm.get('concernZones');
  }
  associatedProduct() {
    const detailUrl = ['gestion-produits/simple/details-produit', this.tuvToShow.produitService];
    this.router.navigate(detailUrl);
  }

  goToList() {
    const url = ["/tarif-unitaire-variable/simple/list-tarif-unitaire-variable"]
    this.router.navigate(url)
  }


}
