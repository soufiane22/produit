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
  selector: 'app-add-critere-calculable',
  templateUrl: './add-critere-calculable.component.html',
  styleUrls: ['./add-critere-calculable.component.scss']
})
export class AddCritereCalculableComponent implements OnInit {
  public critCalcForm: FormGroup;
  public critCalcToAdd = new CritereCalculable();


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

  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private critCalService: CritereCalculableService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.createGroupesDropDown();
    this.createUnitesDropDown();
    this.createCritCalcForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.critCalcToAdd.produitService = success.id;
      },
      (error) => {
        console.log(error);
        const listUrl = ['gestion-produits/simple/list-produit'];
        this.router.navigate(listUrl);
      })
  }

  createCritCalcForm() {
    this.critCalcForm = this.fb.group({
      groupeCritere: ['', [Validators.required]],
      refCritere: [this.selectedGroupes, [Validators.required]],
      label: ['', [Validators.required]],
      valeur: ['', [Validators.required]],
      uniteValeur: [this.selectedUnites, [Validators.required]]
    });
  }

  createGroupesDropDown() {
    this.listGroupes = listGroupeCritereCalculable;
    this.selectedGroupes = [];
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
    this.selectedUnites = [];
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


  clearValues() {
    this.critCalcForm.reset();
    this.critCalcToAdd = new CritereCalculable();
  }

  addCritCalc() {
    if (this.critCalcForm.valid) {
      this.getValues();
      this.critCalService.addCritereCalculable(this.critCalcToAdd).subscribe(
        (success) => {
          this.psService.addCriteresCalculablesToList(this.critCalcToAdd.produitService, success._id).subscribe(
            (success) => {
              this.toastr.success("Le critère calculable a été ajoutée avec succès", "👌", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
              setTimeout(() => {
                const editUrl = ['gestion-produits/simple/edit-produit', this.critCalcToAdd.produitService];
                this.router.navigate(editUrl);
              }, 2000);

            },
            (error) => {

              console.log({ error: error });
              this.toastr.error("Le critère calculable n'a pas été ajoutée au produit", "🥵", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
            }
          );
        },
        (error) => {
          console.log('critCalcToAdd',this.critCalcToAdd);
          console.log(error);
          this.toastr.error("Le critère calculable n'a pas pu être ajoutée avec succès", "🥵", {
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
    this.critCalcToAdd.groupeCritere = this.groupeCritere.value[0];
    this.critCalcToAdd.label = this.label.value;
    this.critCalcToAdd.refCritere = this.refCritere.value;
    this.critCalcToAdd.uniteValeur = this.uniteValeur.value[0];
    this.critCalcToAdd.valeur = this.valeur.value;
  }


}
