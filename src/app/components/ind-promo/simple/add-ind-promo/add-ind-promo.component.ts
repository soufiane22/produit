import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IndPromo } from 'src/app/shared/model/produit-simple/ind-promo.model';
import { IndPromoService } from 'src/app/shared/service/produit-simple/ind-promo.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { AllowedDate } from 'src/app/shared/directives/allowed-date.directive';
import { generateReference } from 'src/app/shared/helpers/functions.helper';
import { advantageHeaders, listAdvantageType, listDistributeur, listEtatPricing, listEtatPublication, listTypeReduction, listZones } from 'src/app/shared/helpers/data.helper';
import { Advantage } from 'src/app/shared/model/produit-simple/advantage.model';

@Component({
  selector: 'app-add-ind-promo',
  templateUrl: './add-ind-promo.component.html',
  styleUrls: ['./add-ind-promo.component.scss']
})
export class AddIndPromoComponent implements OnInit {

  public indPromoForm: FormGroup;
  public indPromoToAdd = new IndPromo();

  // Dropdown distributeurs
  listDistributeurs: Array<string> = [];
  selectedDistributeurs: Array<string> = [];
  notSelectedDistributeurs: Array<string> = [];
  dropdownDistributeursSettings: any = {};
  closeDropdownDistributeursSelection = false;
  disabledDropdownDistributeurs = false;

  // Dropdown distributeurs
  listNature: Array<string> = [];
  selectedNature: Array<string> = [];
  dropdownNatureSettings: any = {};
  closeDropdownNatureSelection = false;
  disabledDropdownNature = false;

  // Dropdown distributeurs
  listAdvantageType: Array<string> = [];
  selectedAdvantageType: Array<string> = [];
  dropdownAdvantageTypeSettings: any = {};
  closeDropdownAdvantageTypeSelection = false;
  disabledDropdownAdvantageType = false;

  // Dropdown distributeurs
  listEtat: Array<string> = [];
  selectedEtat: Array<string> = [];
  dropdownEtatSettings: any = {};
  closeDropdownEtatSelection = false;
  disabledDropdownEtat = false;

  advantageHeaders: string[] = []

  interessement_advantages: Array<Advantage> = []
  interessement_advantage: Advantage = new Advantage();

  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private indPromoService: IndPromoService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {

    this.advantageHeaders = advantageHeaders;
    this.createNatureDropDown();
    this.createEtatDropDown();
    this.createAdvantageTypeDropDown();
    this.createIndPromoForm();
    this.ref_pricing_rule.setValue(generateReference('PR'));
  }

  ngOnInit(): void {

  }

  createNatureDropDown() {
    this.listNature = listTypeReduction;
    this.selectedNature = [];
    this.dropdownNatureSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownNatureSelection
    };
  }

  createAdvantageTypeDropDown() {
    this.listAdvantageType = listAdvantageType;
    this.selectedAdvantageType = [];
    this.dropdownAdvantageTypeSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownAdvantageTypeSelection
    };
  }

  createEtatDropDown() {
    this.listEtat = listEtatPricing;
    this.selectedEtat = [];
    this.dropdownEtatSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownEtatSelection
    };
  }



  createIndPromoForm() {
    this.indPromoForm = this.fb.group({
      ref_pricing_rule: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      reduction_type: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      reduction_valeur: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      interessement_global_value: this.fb.control({ value: 0, disabled: true }, [Validators.required]),
      advantage_type: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      advantage_designation: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      advantage_description: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      advantage_value: this.fb.control({ value: 0, disabled: false }, [Validators.required]),
      period_debut: this.fb.control({ value: this.today, disabled: false }, [Validators.required, AllowedDate]),
      period_fin: this.fb.control({ value: this.today, disabled: false }, [Validators.required, AllowedDate]),
      etat_pricing_rule: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      description: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      commentaire: this.fb.control({ value: '', disabled: false }, [Validators.required])
    });
  }


  addIndPromo() {
    if (this.indPromoForm.valid) {
      this.getValues();
      this.indPromoService.addIndPromo(this.indPromoToAdd).subscribe(
        (success) => {
          this.toastr.success("L'indication promo a été ajoutée avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const editUrl = ['ind-promo/simple/list-ind-promo'];
            this.router.navigate(editUrl);
          }, 2000);
        },
        (error) => {
          this.toastr.error("Erreur lors de l'ajout de l'indication promo", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      );
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
    this.indPromoToAdd.ref_pricing_rule = this.ref_pricing_rule.value;
    this.indPromoToAdd.reduction.type_r = this.reduction_type.value;
    this.indPromoToAdd.reduction.valeur_r = this.reduction_valeur.value;
    this.indPromoToAdd.interessement.global_value = this.interessement_global_value.value;
    this.indPromoToAdd.interessement.avantages = this.interessement_advantages;
    this.indPromoToAdd.period_debut = this.period_debut.value;
    this.indPromoToAdd.period_fin = this.period_fin.value;
    this.indPromoToAdd.description = this.description.value;
    this.indPromoToAdd.commentaire = this.commentaire.value;
  }

  clearValues() {
    this.indPromoForm.reset();
    this.indPromoToAdd = new IndPromo();
  }

  get ref_pricing_rule() {
    return this.indPromoForm.get('ref_pricing_rule');
  }


  get reduction_type() {
    return this.indPromoForm.get('reduction_type');
  }

  get reduction_valeur() {
    return this.indPromoForm.get('reduction_valeur');
  }

  get interessement_global_value() {
    return this.indPromoForm.get('interessement_global_value');
  }

  get advantage_type() {
    return this.indPromoForm.get('advantage_type');
  }

  get advantage_designation() {
    return this.indPromoForm.get('advantage_designation');
  }

  get advantage_description() {
    return this.indPromoForm.get('advantage_description');
  }

  get advantage_value() {
    return this.indPromoForm.get('advantage_value');
  }


  get period_debut() {
    return this.indPromoForm.get('period_debut');
  }

  get period_fin() {
    return this.indPromoForm.get('period_fin');
  }

  get etat_pricing_rule() {
    return this.indPromoForm.get('etat_pricing_rule');
  }

  get description() {
    return this.indPromoForm.get('description');
  }

  get commentaire() {
    return this.indPromoForm.get('commentaire');
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

  removeAdvantageFromInteressement(advantage: Advantage) {
    this.interessement_advantages = this.interessement_advantages.filter(x => x !== advantage);
  }

  addAdvantageToInteressement() {
    if (this.isAdvantageValid) {
      this.getAdvantageValue();
      console.log(this.interessement_advantage);
      this.interessement_advantages.push(this.interessement_advantage);
      const x = this.interessement_global_value.value + this.interessement_advantage.value;
      this.interessement_global_value.setValue(x);
    }
  }

  isAdvantageValid() {
    return this.advantage_description.valid && this.advantage_designation.valid && this.advantage_type.valid && this.advantage_value.valid;
  }

  getAdvantageValue() {
    this.interessement_advantage = new Advantage();
    this.interessement_advantage.description = this.advantage_description.value;
    this.interessement_advantage.designation = this.advantage_designation.value;
    this.interessement_advantage.type = this.advantage_type.value[0];
    this.interessement_advantage.value = this.advantage_value.value;
  }

}
