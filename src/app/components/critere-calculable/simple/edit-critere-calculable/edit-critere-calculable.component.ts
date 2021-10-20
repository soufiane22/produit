import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { listGroupeCritereCalculable, listUniteDuree } from 'src/app/shared/helpers/data.helper';
import { CritereCalculable } from 'src/app/shared/model/produit-simple/critere-calculable.model';
import { CritereCalculableService } from 'src/app/shared/service/produit-simple/critere-calculable.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-edit-critere-calculable',
  templateUrl: './edit-critere-calculable.component.html',
  styleUrls: ['./edit-critere-calculable.component.scss']
})
export class EditCritereCalculableComponent implements OnInit {

  public critCalcForm: FormGroup;
  public critCalcProduitForm: FormGroup;
  public critCalcToEdit = new CritereCalculable();
  public critCalcProduit: any;

  // Dropdown produits
  listProduits: Array<string> = [];
  selectedProduit: Array<string> = [];
  dropdownProduitSettings: any = {};
  closeDropdownProduitSelection = false;
  disabledDropdownProduit = false;

  // Dropdown types
  listGroupes: Array<string> = [];
  selectedGroupes: Array<string> = [];
  dropdownGroupesSettings: any = {};
  closeDropdownGroupesSelection = false;
  disabledDropdownGroupes = false;

  // Dropdown types
  listUnites: Array<string> = [];
  selectedUnites: Array<string> = [];
  dropdownUnitesSettings: any = {};
  closeDropdownUnitesSelection = false;
  disabledDropdownUnites = false;
  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private critCalcService: CritereCalculableService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.critCalcService.findCritereCalculableById(success.id).subscribe(
          (success) => {
            this.critCalcToEdit = success;
            this.createGroupesDropDown();
            this.createUnitesDropDown();
            this.createCritCalcForm();
            this.createProduitDropDown();

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

  createCritCalcForm() {
    this.critCalcForm = this.fb.group({
      groupeCritere: [this.selectedGroupes, [Validators.required]],
      refCritere: [this.critCalcToEdit.refCritere, [Validators.required]],
      label: [this.critCalcToEdit.label, [Validators.required]],
      valeur: [this.critCalcToEdit.valeur, [Validators.required]],
      uniteValeur: [this.selectedUnites, [Validators.required]]
    });
  }
  createGroupesDropDown() {
    this.listGroupes = listGroupeCritereCalculable;
    this.selectedGroupes = [this.critCalcToEdit.groupeCritere];
    this.dropdownGroupesSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownGroupesSelection
    };
  }

  createUnitesDropDown() {
    this.listUnites = listUniteDuree;
    this.selectedUnites = [this.critCalcToEdit.uniteValeur];
    this.dropdownUnitesSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownUnitesSelection
    };
  }


  get groupeCritere() {
    return this.critCalcForm.get('groupeCritere');
  }

  get refCritere() {
    return this.critCalcForm.get('refCritere');
  }

  get label() {
    return this.critCalcForm.get('label');
  }

  get valeur() {
    return this.critCalcForm.get('valeur');
  }

  get uniteValeur() {
    return this.critCalcForm.get('uniteValeur');
  }


  createDistProduitForm() {
    this.critCalcProduitForm = this.fb.group({
      produitService: [this.selectedProduit, [Validators.required]]
    });
  }

  get produitService() {
    return this.critCalcProduitForm.get('produitService');
  }
  createProduitDropDown() {
    // Dropdown produit
    this.psService.getAllProducts().subscribe(
      (success) => {
        this.listProduits = success.map(p => p.refProduit);
        this.selectedProduit = success.filter(p => p._id === this.critCalcToEdit
          .produitService).map(p => p.refProduit);
        this.createDistProduitForm();
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

  clearValues() {
    this.critCalcForm.reset();
    this.valeur.setValue(this.critCalcToEdit.valeur);
    this.uniteValeur.setValue(this.selectedUnites);
    this.label.setValue(this.critCalcToEdit.label);
    this.groupeCritere.setValue(this.selectedGroupes);
    this.refCritere.setValue(this.critCalcToEdit.refCritere);

    this.critCalcProduitForm.reset();
    this.produitService.setValue(this.selectedProduit);
  }

  editCritCalc() {
    if (this.critCalcForm.valid) {
      this.getValues();
      this.critCalcService.editCritereCalculable(this.critCalcToEdit).subscribe(
        (success) => {
          this.toastr.success("Le critère calculable a été modifié avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const listUrl = ['critere-calculable/simple/list-critere-calculable'];
            this.router.navigate(listUrl);
          }, 2000);
        },
        (error) => {
          console.log(error);
          this.toastr.error("Le critère calculable  n'a pas pu être ajouté avec succès", "🥵", {
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

  async onclickAddToCritCalc() {
    if (this.critCalcForm.valid) {
      await this.getCritCalcFormValues();
      if (this.critCalcToEdit.produitService) {
        this.psService.deleteCriteresCalculablesFromList(this.critCalcToEdit.produitService, this.critCalcToEdit._id).subscribe(
          (success) => {
            this.critCalcService.addCritereCalculableProduit(this.critCalcToEdit._id, this.critCalcProduit).subscribe(
              (success) => {
                this.psService.addCriteresCalculablesToList(this.critCalcProduit, this.critCalcToEdit._id).subscribe(
                  (success) => {
                    this.toastr.success("Le produit a été avec succès au critère calculable", "👌", {
                      timeOut: 2000,
                      progressBar: true,
                      progressAnimation: 'increasing',
                      positionClass: 'toast-top-right'
                    });
                    setTimeout(() => {
                      const listUrl = ['critere-calculable/simple/list-critere-calculable'];
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
      } else {
        this.critCalcService.addCritereCalculableProduit(this.critCalcToEdit._id, this.critCalcProduit).subscribe(
          (success) => {
            this.psService.addCriteresCalculablesToList(this.critCalcProduit, this.critCalcToEdit._id).subscribe(
              (success) => {
                this.toastr.success("Le produit a été avec succès au critère calculable", "👌", {
                  timeOut: 2000,
                  progressBar: true,
                  progressAnimation: 'increasing',
                  positionClass: 'toast-top-right'
                });
                setTimeout(() => {
                  const listUrl = ['critere-calculable/simple/list-critere-calculable'];
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
  async getCritCalcFormValues() {
    await this.psService.getAllProducts().toPromise()
      .then(success => {
        this.critCalcProduit = success.filter(p => p.refProduit === this.produitService.value[0]).map(p => p._id)[0];
      })
      .catch(error => {
        console.log(error);
      })
  }

  getValues() {
    this.critCalcToEdit.groupeCritere = this.groupeCritere.value[0];
    this.critCalcToEdit.label = this.label.value;
    this.critCalcToEdit.refCritere = this.refCritere.value;
    this.critCalcToEdit.uniteValeur = this.uniteValeur.value[0];
    this.critCalcToEdit.valeur = this.valeur.value;
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

}
