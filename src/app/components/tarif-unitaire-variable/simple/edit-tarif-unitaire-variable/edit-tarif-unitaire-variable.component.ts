import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { listDistributeur, listZones, listCurrencie } from 'src/app/shared/helpers/data.helper';
import { TarifUnitVar } from 'src/app/shared/model/produit-simple/tarif-unit-var.model';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { TarifUnitVarService } from 'src/app/shared/service/produit-simple/tarif-unitaire-variable.service';

@Component({
  selector: 'app-edit-tarif-unitaire-variable',
  templateUrl: './edit-tarif-unitaire-variable.component.html',
  styleUrls: ['./edit-tarif-unitaire-variable.component.scss']
})
export class EditTarifUnitaireVariableComponent implements OnInit {
  public tuvForm: FormGroup;
  public tuvProduitForm: FormGroup;
  public tuvToEdit = new TarifUnitVar();
  public tuvProduit: any;
  // Dropdown monnaie
  disabledDropdownMonnaie = false;
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
  disabledDropdownProduit = false;
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

  constructor(private psService: ProduitSimpleService, private tuvService: TarifUnitVarService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.tuvToEdit.produitService = success.id;
        this.tuvService.findTarifUnitVarById(success.id).subscribe(
          (success) => {
            this.tuvToEdit = success;
            this.createDistribDropDown();
            this.createProduitDropdown();
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
    this.selectedDistributeurs = this.tuvToEdit.concernDistrs;
    this.dropdownDistributeursSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownDistributeursSelection
    };
  }

  createProduitDropdown() {
    // Dropdown produit
    this.psService.getAllProducts().subscribe(
      (success) => {
        this.listProduits = success.map(p => p.refProduit);
        this.selectedProduit = success.filter(p => p._id === this.tuvToEdit
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
    this.selectedZones = this.listZones.filter(x => this.tuvToEdit.concernZones.includes(x.item_text));
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
    this.selectedMonnaie = this.listMonnaies.filter(x => this.tuvToEdit.monnaie === x.item_text);
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
    let x = this.tuvToEdit.appToAllDistrs ? "Oui" : "Non"
    let y = this.tuvToEdit.appToAllZones ? "Oui" : "Non"
    this.tuvForm = this.fb.group({
      tarifUHT: [this.tuvToEdit.tarifUHT, [Validators.required]],
      commentaire: [this.tuvToEdit.commentaire, [Validators.required]],
      description: [this.tuvToEdit.description, [Validators.required]],
      monnaie: [this.selectedMonnaie, [Validators.required]],
      appToAllDistrs: [x, [Validators.required]],
      concernDistrs: [this.selectedDistributeurs, [Validators.required]],
      appToAllZones: [y, [Validators.required]],
      concernZones: [this.selectedZones, [Validators.required]],
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

  editTarifUnitaireVariable() {
    if (this.tuvForm.valid) {
      this.getValues();
      this.tuvService.editTarifUnitVar(this.tuvToEdit).subscribe(
        (success) => {
          this.toastr.success("Le tarif unitaire variable a été modifié avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const listUrl = ['tarif-unitaire-variable/simple/list-tarif-unitaire-variable'];
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

  async onclickAddToTuv() {
    if (this.tuvProduitForm.valid) {
      await this.getTuvFormValues();
      if (this.tuvToEdit.produitService){
        this.psService.deleteTarifUnitaireVariableFromList(this.tuvToEdit.produitService, this.tuvToEdit._id).subscribe(
          (success) => {
            this.tuvService.addTarifUnitVarProduit(this.tuvToEdit._id, this.tuvProduit).subscribe(
              (success) => {
                this.psService.addTarifUnitaireVariableToList(this.tuvProduit, this.tuvToEdit._id).subscribe(
                  (success) => {
                    this.toastr.success("Le produit a été avec succès au tarif unitaire variable", "👌", {
                      timeOut: 2000,
                      progressBar: true,
                      progressAnimation: 'increasing',
                      positionClass: 'toast-top-right'
                    });
                    setTimeout(() => {
                      const listUrl = ['tarif-unitaire-variable/simple/list-tarif-unitaire-variable'];
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
      }else{
        this.tuvService.addTarifUnitVarProduit(this.tuvToEdit._id, this.tuvProduit).subscribe(
          (success) => {
            this.psService.addTarifUnitaireVariableToList(this.tuvProduit, this.tuvToEdit._id).subscribe(
              (success) => {
                this.toastr.success("Le produit a été avec succès au tarif unitaire variable", "👌", {
                  timeOut: 2000,
                  progressBar: true,
                  progressAnimation: 'increasing',
                  positionClass: 'toast-top-right'
                });
                setTimeout(() => {
                  const listUrl = ['tarif-unitaire-variable/simple/list-tarif-unitaire-variable'];
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
  async getTuvFormValues() {
    await this.psService.getAllProducts().toPromise()
      .then(success => {
        this.tuvProduit = success.filter(p => p.refProduit === this.produitService.value[0]).map(p => p._id)[0];
      })
      .catch(error => {
        console.log(error);
      })
  }
  getValues() {
    this.tuvToEdit.description = this.tuvForm.value.description;
    this.tuvToEdit.commentaire = this.tuvForm.value.commentaire;
    this.tuvToEdit.monnaie = this.monnaie.value[0].item_text;
    this.tuvToEdit.tarifUHT = this.tuvForm.value.tarifUHT;
    this.tuvToEdit.concernDistrs = this.concernDistrs.value.map(x => x);
    this.tuvToEdit.concernZones = this.concernZones.value.map(x => x.item_text);
    this.tuvToEdit.noConcernDistrs = this.listDistributeurs.filter(x => !this.tuvToEdit.concernDistrs.includes(x))
    let tmp = this.listZones.filter(x => !this.tuvToEdit.concernZones.includes(x.item_text));
    this.tuvToEdit.noConcernZones = tmp.map(x => x.item_text);
    this.tuvToEdit.appToAllDistrs = this.appToAllDistrs.value === "Oui";
    this.tuvToEdit.appToAllZones = this.appToAllZones.value === "Oui";
  }

  clearValues() {
    this.tuvForm.reset();
    this.description.setValue(this.tuvToEdit.description);
    this.commentaire.setValue(this.tuvToEdit.commentaire);
    this.tarifUHT.setValue(this.tuvToEdit.tarifUHT);
    const x = this.tuvToEdit.appToAllDistrs ? "Oui" : "Non";
    this.appToAllDistrs.setValue(x);
    const y = this.tuvToEdit.appToAllZones ? "Oui" : "Non";
    this.appToAllZones.setValue(y);
    this.concernZones.setValue(this.selectedZones);
    this.concernDistrs.setValue(this.selectedDistributeurs);
    this.monnaie.setValue(this.selectedMonnaie);

    this.tuvProduitForm.reset();
    this.produitService.setValue(this.selectedProduit);
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




}
