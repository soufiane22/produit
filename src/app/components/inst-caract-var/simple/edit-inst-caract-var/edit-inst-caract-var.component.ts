import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AllowedDate } from 'src/app/shared/directives/allowed-date.directive';
import { listGroupeCaract, listUniteCaract, listTypeCoutAdd } from 'src/app/shared/helpers/data.helper';
import { InstCaractVar } from 'src/app/shared/model/produit-simple/inst-caract-var.model';
import { ExpeditionService } from 'src/app/shared/service/produit-simple/expedition.service';
import { IndFraisAddService } from 'src/app/shared/service/produit-simple/ind-frais-add.service';
import { IndPromoService } from 'src/app/shared/service/produit-simple/ind-promo.service';
import { IndStockService } from 'src/app/shared/service/produit-simple/ind-stock.service';
import { InstCaractVarService } from 'src/app/shared/service/produit-simple/inst-caract-var.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-edit-inst-caract-var',
  templateUrl: './edit-inst-caract-var.component.html',
  styleUrls: ['./edit-inst-caract-var.component.scss']
})
export class EditInstCaractVarComponent implements OnInit {

  public instCarVarForm: FormGroup;
  public instCarVarProduitForm: FormGroup;
  public instCarVarIndPromoForm: FormGroup;
  public instCarVarIndFraisAddForm: FormGroup;
  public instCarVarIndStockForm: FormGroup;
  public instCarVarExpForm: FormGroup;
  public instCarVarToEdit = new InstCaractVar();
  public instCarVar: InstCaractVar;
  public instCarVarProduit: any;
  public instCarVarIndStock: any[];
  public instCarVarExp: any[];
  public instCarVarIndFraisAdd: any[];
  public instCarVarIndPromo: any[];

  // Dropdown groupe
  listGroupe: Array<String> = [];
  selectedGroupe: Array<String> = [];
  dropdownGroupeSettings: any = {};
  closeDropdownGroupeSelection = false;
  disabledDropdownGroupe = false;

  // Dropdown unite
  listUnite: Array<String> = [];
  selectedUnite: Array<String> = [];
  dropdownUniteSettings: any = {};
  closeDropdownUniteSelection = false;
  disabledDropdownUnite = false;

  // Dropdown type
  listType: Array<String> = [];
  selectedType: Array<String> = [];
  dropdownTypeSettings: any = {};
  closeDropdownTypeSelection = false;
  disabledDropdownType = false;

  // Dropdown produits
  listProduits: Array<any> = [];
  selectedProduit: Array<any> = [];
  dropdownProduitSettings: any = {};
  closeDropdownProduitSelection = false;
  disabledDropdownProduit = false;

  // Dropdown indPromo
  listIndPromo: Array<any> = [];
  selectedIndPromo: Array<any> = [];
  dropdownIndPromoSettings: any = {};
  closeDropdownIndPromoSelection = false;
  disabledDropdownIndPromo = false;
  // Dropdown indFraisAdd
  listIndFraisAdd: Array<any> = [];
  selectedIndFraisAdd: Array<any> = [];
  dropdownIndFraisAddSettings: any = {};
  closeDropdownIndFraisAddSelection = false;
  disabledDropdownIndFraisAdd = false;
  // Dropdown indStock
  listIndStock: Array<any> = [];
  selectedIndStock: Array<any> = [];
  dropdownIndStockSettings: any = {};
  closeDropdownIndStockSelection = false;
  disabledDropdownIndStock = false;
  // Dropdown expedition
  listExp: Array<any> = [];
  selectedExp: Array<any> = [];
  dropdownExpSettings: any = {};
  closeDropdownExpSelection = false;
  disabledDropdownExp = false;

  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private instCarVarService: InstCaractVarService, private indPromoService: IndPromoService, private indFraisAddService: IndFraisAddService, private indStockService: IndStockService, private expService: ExpeditionService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.instCarVarService.findInstCaractVarById(success.id).subscribe(
          (success) => {
            this.instCarVar = success;
            this.createUniteDropdown();
            this.createGroupeDropdown();
            this.createTypeDropdown();
            this.createProduitDropDown();
            this.createIndPromoDropDown();
            this.createIndStockDropDown();
            this.createIndFraisAddDropDown();
            this.createExpDropDown();
            this.createInstCaractVarIndPromoForm();
            this.createInstCaractVarExpForm();
            this.createInstCaractVarIndFraisAddForm();
            this.createInstCaractVarIndStockForm();
            this.createInstCaractVarForm();
            this.clearValues();
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

  createGroupeDropdown() {
    this.listGroupe = listGroupeCaract;
    this.selectedGroupe = [this.instCarVar.groupe];
    this.dropdownGroupeSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownGroupeSelection
    };
  }

  createUniteDropdown() {
    this.listUnite = listUniteCaract;
    this.selectedUnite = [this.instCarVar.unite];
    this.dropdownUniteSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownUniteSelection
    };
  }

  createTypeDropdown() {
    this.listType = listTypeCoutAdd;
    this.selectedType = [this.instCarVar.typeCoutAdd];
    this.dropdownTypeSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownTypeSelection
    };
  }
  createInstCaractVarForm() {
    this.instCarVarForm = this.fb.group({
      refInstCaractVar: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      affUniqPriv: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      groupe: this.fb.control({ value: this.selectedGroupe, disabled: false }, [Validators.required]),
      label: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      valeur: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      unite: this.fb.control({ value: this.selectedUnite, disabled: false }, [Validators.required]),
      ordre: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      coutAdd: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      typeCoutAdd: this.fb.control({ value: this.selectedType, disabled: false }, [Validators.required]),
      valeurCoutAdd: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      prix: this.fb.control({ value: '', disabled: false }, [Validators.required])
    });
  }

  createInstCaractVarProduitForm() {
    this.instCarVarProduitForm = this.fb.group({
      produitService: [this.selectedProduit, [Validators.required]]
    });
  }

  createInstCaractVarIndStockForm() {
    this.instCarVarIndStockForm = this.fb.group({
      indStock: [this.selectedIndStock, [Validators.required]]
    });
  }

  createInstCaractVarIndPromoForm() {
    this.instCarVarIndPromoForm = this.fb.group({
      indPromo: [this.selectedIndPromo, [Validators.required]]
    });
  }

  createInstCaractVarIndFraisAddForm() {
    this.instCarVarIndFraisAddForm = this.fb.group({
      indFraisAdd: [this.selectedIndFraisAdd, [Validators.required]]
    });
  }

  createInstCaractVarExpForm() {
    this.instCarVarExpForm = this.fb.group({
      expedition: [this.selectedExp, [Validators.required]]
    });
  }


  get expedition() {
    return this.instCarVarExpForm.get('expedition');
  }
  get indFraisAdd() {
    return this.instCarVarIndFraisAddForm.get('indFraisAdd');
  }

  get indStock() {
    return this.instCarVarIndStockForm.get('indStock');
  }

  get produitService() {
    return this.instCarVarProduitForm.get('produitService');
  }

  get indPromo() {
    return this.instCarVarIndPromoForm.get('indPromo');
  }

  createProduitDropDown() {
    // Dropdown produit
    this.psService.getAllProducts().subscribe(
      (success) => {
        this.listProduits = success.map(x => {
          let obj = { _id: '', refProduit: '' }
          obj._id = x._id;
          obj.refProduit = x.refProduit;
          return obj;
        });
        this.selectedProduit = success.filter(p => p._id === this.instCarVar.produitService).map(p => {
          let obj = { _id: '', refProduit: '' }
          obj.refProduit = p.refProduit;
          obj._id = p._id;
          return obj;
        });
        this.createInstCaractVarProduitForm();
        this.dropdownProduitSettings = {
          singleSelection: true,
          idField: '_id',
          textField: 'refProduit',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          closeDropDownOnSelection: this.closeDropdownProduitSelection
        };
      },
      (error) => {
        console.log(error);
      })

  }

  createIndPromoDropDown() {
    // Dropdown indPromo
    this.indPromoService.getAllIndPromos().subscribe(
      (success) => {
        this.listIndPromo = success.map(x => {
          let obj = { _id: '', ref_ind_promo: '' }
          obj._id = x._id;
          obj.ref_ind_promo = x.ref_pricing_rule;
          return obj;
        });
        this.selectedIndPromo = success.filter(p => this.instCarVar.indPromo.includes(p._id)).map(x => {
          let obj = { _id: '', ref_ind_promo: '' }
          obj._id = x._id;
          obj.ref_ind_promo = x.ref_pricing_rule;
          return obj;
        });
        this.dropdownIndPromoSettings = {
          singleSelection: false,
          idField: '_id',
          textField: 'ref_ind_promo',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          closeDropDownOnSelection: this.closeDropdownIndPromoSelection
        };
      },
      (error) => {
        console.log(error);
      })

  }

  createIndFraisAddDropDown() {
    // Dropdown indFraisAdd
    this.indFraisAddService.getAllIndFraisAdds().subscribe(
      (success) => {
        this.listIndFraisAdd = success.map(x => {
          let obj = { _id: '', refFrais: '' }
          obj._id = x._id;
          obj.refFrais = x.refFrais;
          return obj;
        });
        this.selectedIndFraisAdd = success.filter(p => this.instCarVar.indFraisAdd.includes(p._id)).map(x => {
          let obj = { _id: '', refFrais: '' }
          obj._id = x._id;
          obj.refFrais = x.refFrais;
          return obj;
        });
        this.dropdownIndFraisAddSettings = {
          singleSelection: false,
          idField: '_id',
          textField: 'refFrais',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          closeDropDownOnSelection: this.closeDropdownIndFraisAddSelection
        };
      },
      (error) => {
        console.log(error);
      })

  }

  createIndStockDropDown() {
    // Dropdown indFraisAdd
    this.indStockService.getAllIndStocks().subscribe(
      (success) => {

        this.listIndStock = success.map(x => {
          let obj = { _id: '', refStock: '' }
          obj._id = x._id;
          obj.refStock = x.refStock;
          return obj;
        });
        this.selectedIndStock = success.filter(p => this.instCarVar.indStock.includes(p._id)).map(x => {
          let obj = { _id: '', refStock: '' }
          obj._id = x._id;
          obj.refStock = x.refStock;
          return obj;
        });
        this.dropdownIndStockSettings = {
          singleSelection: false,
          idField: '_id',
          textField: 'refStock',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          closeDropDownOnSelection: this.closeDropdownExpSelection
        };
      },
      (error) => {
        console.log(error);
      })

  }

  createExpDropDown() {
    // Dropdown indFraisAdd
    this.expService.getAllExpeditions().subscribe(
      (success) => {
        this.listExp = success.map(x => {
          let obj = { _id: '', refExp: '' }
          obj._id = x._id;
          obj.refExp = x.refExp;
          return obj;
        });
        this.selectedExp = success.filter(p => this.instCarVar.expedition.includes(p._id)).map(x => {
          let obj = { _id: '', refExp: '' }
          obj._id = x._id;
          obj.refExp = x.refExp;
          return obj;
        });
        this.dropdownExpSettings = {
          singleSelection: false,
          idField: '_id',
          textField: 'refExp',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          closeDropDownOnSelection: this.closeDropdownExpSelection
        };
      },
      (error) => {
        console.log(error);
      })

  }




  get refInstCaractVar() {
    return this.instCarVarForm.get('refInstCaractVar');
  }

  get affUniqPriv() {
    return this.instCarVarForm.get('affUniqPriv');
  }

  get groupe() {
    return this.instCarVarForm.get('groupe');
  }

  get label() {
    return this.instCarVarForm.get('label');
  }

  get valeur() {
    return this.instCarVarForm.get('valeur');
  }

  get unite() {
    return this.instCarVarForm.get('unite');
  }

  get ordre() {
    return this.instCarVarForm.get('ordre');
  }

  get coutAdd() {
    return this.instCarVarForm.get('coutAdd');
  }

  get typeCoutAdd() {
    return this.instCarVarForm.get('typeCoutAdd');
  }

  get valeurCoutAdd() {
    return this.instCarVarForm.get('valeurCoutAdd');
  }

  get prix() {
    return this.instCarVarForm.get('prix');
  }



  clearValues() {
    this.instCarVarForm?.reset();
    this.refInstCaractVar.setValue(this.instCarVar.refInstCaractVar);
    let x = this.instCarVar.affUniqPriv ? "Oui" : "Non";
    this.affUniqPriv.setValue(x);
    this.groupe.setValue(this.selectedGroupe);
    this.label.setValue(this.instCarVar.label);
    this.valeur.setValue(this.instCarVar.valeur);
    this.unite.setValue(this.selectedUnite);
    this.ordre.setValue(this.instCarVar.ordre);
    let y = this.instCarVar.coutAdd ? "Oui" : "Non";
    this.coutAdd.setValue(y);
    this.typeCoutAdd.setValue(this.selectedType);
    this.valeurCoutAdd.setValue(this.instCarVar.valeurCoutAdd);
    this.prix.setValue(this.instCarVar.prix);
  }

  editInstCaractVar() {
    if (this.instCarVarForm.valid) {
      this.getValues();
      this.instCarVarService.editInstCaractVar(this.instCarVar._id,this.instCarVarToEdit).subscribe(
        (success) => {
          this.toastr.success("L'instCarVar a été modifié avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const listUrl = ['inst-caract-var/simple/list-inst-caract-var'];
            this.router.navigate(listUrl);
          }, 2000);
        },
        (error) => {
          console.log(error);
          this.toastr.error("L'instCarVar  n'a pas pu être modifié avec succès", "🥵", {
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
    this.instCarVarToEdit.label=this.label.value;
    this.instCarVarToEdit.ordre=this.ordre.value;
    this.instCarVarToEdit.prix=this.prix.value;
    this.instCarVarToEdit.unite=this.unite.value[0];
    this.instCarVarToEdit.groupe=this.groupe.value[0];
    this.instCarVarToEdit.typeCoutAdd=this.typeCoutAdd.value[0];
    this.instCarVarToEdit.valeur=this.valeur.value;
    this.instCarVarToEdit.valeurCoutAdd=this.valeurCoutAdd.value;
    this.instCarVarToEdit.affUniqPriv=this.affUniqPriv.value === "Oui";
    this.instCarVarToEdit.coutAdd=this.coutAdd.value === "Oui";
    this.instCarVarToEdit.refInstCaractVar=this.refInstCaractVar.value;
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

  editInstCarVarProduit() {
    if (this.instCarVarProduitForm.valid) {
      this.removeInstCarVarToProduct();
      this.addProductToInstCarVar();
      this.addInstCarVarToProduct();
      this.toastr.success("Le produit de l'instance caractéristique variable a été modifié avec succès", "👌", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
      setTimeout(() => {
        const editUrl = ['inst-caract-var/simple/list-inst-caract-var'];
        this.router.navigate(editUrl);
      }, 2000);
    } else {
      this.toastr.error("Merci de bien vouloir remplir tous les champs du formulaire", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }
  removeInstCarVarToProduct() {
    let idXi = this.instCarVar.produitService;
    let idXf = this.produitService.value[0]._id;
    if (idXi !== idXf) {
      this.psService.deleteInstCaractVarFromList(idXi, this.instCarVar._id).toPromise()
        .catch(error => console.log(error));
    }
  }
  addProductToInstCarVar() {
    let idXi = this.instCarVar.produitService;
    let idXf = this.produitService.value[0]._id;
    if (idXi !== idXf) {
      this.instCarVarService.addInstCaractVarProduit(this.instCarVar._id, idXf).toPromise()
        .catch(error => console.log(error))
    }
  }
  addInstCarVarToProduct() {
    let idXi = this.instCarVar.produitService;
    let idXf = this.produitService.value[0]._id;
    if (idXi !== idXf) {
      this.psService.addInstCaractVarToList(idXf, this.instCarVar._id).toPromise()
        .catch(error => console.log(error));
    }
  }


  editInstCarVarIndStock() {
    if (this.instCarVarIndStockForm.valid) {
      this.removeIndStocksToInstCarVar();
      this.addInstCarVarToIndStocks();
      this.addIndStocksToInstCarVar();
      this.toastr.success("L'indication stock de l'instance caractéristique variable a été modifié avec succès", "👌", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
      setTimeout(() => {
        const editUrl = ['inst-caract-var/simple/list-inst-caract-var'];
        this.router.navigate(editUrl);
      }, 2000);
    } else {
      this.toastr.error("Merci de bien vouloir remplir tous les champs du formulaire", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }

  }
  removeIndStocksToInstCarVar() {
    let idXi = this.instCarVar.indStock;
    let idXf = this.indStock.value.map(x => x._id);
    idXi.map(x => {
      if (!idXf.includes(x)) {
        this.instCarVarService.deleteIndStockFromList(x, this.instCarVar._id).toPromise()
          .catch(error => console.log(error));
      }
    })
  }
  addInstCarVarToIndStocks() {
    let idXi = this.instCarVar.indStock;
    let idXf = this.indStock.value.map(x => x._id);
    idXf.map(x => {
      if (!idXi.includes(x)) {
        this.indStockService.addIndStockInstCaractVar(x,this.instCarVar._id).toPromise()
          .catch(error => console.log(error))
      }
    })
  }
  addIndStocksToInstCarVar() {
    let idXi = this.instCarVar.indStock;
    let idXf = this.indStock.value.map(x => x._id);
    idXf.map(x => {
      if (!idXi.includes(x)) {
        this.instCarVarService.addIndFraisAddToList(this.instCarVar._id,x).toPromise()
          .catch(error => console.log(error));
      }
    })

  }
  editInstCarVarIndPromo() {
    if (this.instCarVarIndPromoForm.valid) {
      this.removeIndPromosToInstCarVar();
      this.addInstCarVarToIndPromos();
      this.addIndPromosToInstCarVar();
      this.toastr.success("L'indication stock de l'instance caractéristique variable a été modifié avec succès", "👌", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
      setTimeout(() => {
        const editUrl = ['inst-caract-var/simple/list-inst-caract-var'];
        this.router.navigate(editUrl);
      }, 2000);
    } else {
      this.toastr.error("Merci de bien vouloir remplir tous les champs du formulaire", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }
  removeIndPromosToInstCarVar() {
    let idXi = this.instCarVar.indPromo;
    let idXf = this.indPromo.value.map(x => x._id);
    idXi.map(x => {
      if (!idXf.includes(x)) {
        this.instCarVarService.deleteIndPromoFromList(x, this.instCarVar._id).toPromise()
          .catch(error => console.log(error));
      }
    })
  }
  addInstCarVarToIndPromos() {
    let idXi = this.instCarVar.indPromo;
    let idXf = this.indPromo.value.map(x => x._id);
    idXf.map(x => {
      if (!idXi.includes(x)) {
        this.indPromoService.addIndPromoInstCaractVar(x, this.instCarVar._id).toPromise()
          .catch(error => console.log(error));
      }
    })

  }
  addIndPromosToInstCarVar() {
    let idXi = this.instCarVar.indPromo;
    let idXf = this.indPromo.value.map(x => x._id);
    idXf.map(x => {
      if (!idXi.includes(x)) {
        this.instCarVarService.addIndPromoToList(this.instCarVar._id, x).toPromise()
          .catch(error => console.log(error))
      }
    })
  }


  editInstCarVarExp() {
    if (this.instCarVarExpForm.valid) {
      this.removeExpsToInstCarVar();
      this.addInstCarVarToExps();
      this.addExpsToInstCarVar();
      this.toastr.success("L'indication stock de l'instance caractéristique variable a été modifié avec succès", "👌", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
      setTimeout(() => {
        const editUrl = ['inst-caract-var/simple/list-inst-caract-var'];
        this.router.navigate(editUrl);
      }, 2000);
    } else {
      this.toastr.error("Merci de bien vouloir remplir tous les champs du formulaire", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }
  removeExpsToInstCarVar() {
    let idXi = this.instCarVar.expedition;
    let idXf = this.expedition.value.map(x => x._id);
    idXi.map(x => {
      if (!idXf.includes(x)) {
        this.instCarVarService.deleteExpeditionFromList(x, this.instCarVar._id).toPromise()
          .catch(error => console.log(error));
      }
    })
  }
  addExpsToInstCarVar() {
    let idXi = this.instCarVar.expedition;
    let idXf = this.expedition.value.map(x => x._id);
    idXf.map(x => {
      if (!idXi.includes(x)) {
        this.instCarVarService.addExpeditionToList(this.instCarVar._id, x).toPromise()
          .catch(error => console.log(error))
      }
    })
  }
  addInstCarVarToExps() {
    let idXi = this.instCarVar.expedition;
    let idXf = this.expedition.value.map(x => x._id);
    idXf.map(x => {
      if (!idXi.includes(x)) {
        this.expService.addExpeditionInstCaractVar(x, this.instCarVar._id).toPromise()
          .catch(error => console.log(error));
      }
    })

  }
  editInstCarVarIndFraisAdd() {
    if (this.instCarVarIndFraisAddForm.valid) {
      this.removeIndFraisAddsToInstCarVar();
      this.addIndFraisAddsToInstCarVar();
      this.addInstCarVarToIndFraisAdds();
      this.toastr.success("L'indication stock de l'instance caractéristique variable a été modifié avec succès", "👌", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
      setTimeout(() => {
        const editUrl = ['inst-caract-var/simple/list-inst-caract-var'];
        this.router.navigate(editUrl);
      }, 2000);
    } else {
      this.toastr.error("Merci de bien vouloir remplir tous les champs du formulaire", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }
  removeIndFraisAddsToInstCarVar() {
    let idXi = this.instCarVar.expedition;
    let idXf = this.expedition.value.map(x => x._id);
    idXi.map(x => {
      if (!idXf.includes(x)) {
        this.instCarVarService.deleteExpeditionFromList(x, this.instCarVar._id).toPromise()
          .catch(error => console.log(error));
      }
    })
  }
  addIndFraisAddsToInstCarVar() {
    let idXi = this.instCarVar.expedition;
    let idXf = this.expedition.value.map(x => x._id);
    idXf.map(x => {
      if (!idXi.includes(x)) {
        this.instCarVarService.addExpeditionToList(this.instCarVar._id, x).toPromise()
          .catch(error => console.log(error))
      }
    })
  }
  addInstCarVarToIndFraisAdds() {
    let idXi = this.instCarVar.expedition;
    let idXf = this.expedition.value.map(x => x._id);
    idXf.map(x => {
      if (!idXi.includes(x)) {
        this.expService.addExpeditionInstCaractVar(x, this.instCarVar._id).toPromise()
          .catch(error => console.log(error));
      }
    })

  }

}
