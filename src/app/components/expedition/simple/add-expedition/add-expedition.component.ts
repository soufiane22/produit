import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { listClasseLivraison } from 'src/app/shared/helpers/data.helper';
import { generateReference } from 'src/app/shared/helpers/functions.helper';
import { Expedition } from 'src/app/shared/model/produit-simple/expedition.model';
import { IndStock } from 'src/app/shared/model/produit-simple/ind-stock.model';
import { ExpeditionService } from 'src/app/shared/service/produit-simple/expedition.service';
import { IndStockService } from 'src/app/shared/service/produit-simple/ind-stock.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-add-expedition',
  templateUrl: './add-expedition.component.html',
  styleUrls: ['./add-expedition.component.scss']
})
export class AddExpeditionComponent implements OnInit {
  public expeditionForm: FormGroup;
  public expeditionToAdd = new Expedition();

  // Dropdown unité poids
  listUnitePoids: Array<string> = [];
  selectedUnitePoids: Array<string> = [];
  dropdownUnitePoidsSettings: any = {};
  closeDropdownUnitePoidsSelection = false;
  disabledDropdownUnitePoids = false;

  // Dropdown unité dimension
  listUniteDimension: Array<string> = [];
  selectedUniteDimension: Array<string> = [];
  dropdownUniteDimensionSettings: any = {};
  closeDropdownUniteDimensionSelection = false;
  disabledDropdownUniteDimension = false;

  // Dropdown classe livraison
  listClasseLivraison: Array<string> = [];
  selectedClasseLivraison: Array<string> = [];
  dropdownClasseLivraisonSettings: any = {};
  closeDropdownClasseLivraisonSelection = false;
  disabledDropdownClasseLivraison = false;


  constructor(private ngbCalendar: NgbCalendar,private dateAdapter: NgbDateAdapter<string>,private psService: ProduitSimpleService, private expeditionService: ExpeditionService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.createUniteDimensionDropdown();
    this.createUnitePoidsDropdown();
    this.createClasseLivraisonDropdown();
    this.createExpeditionForm();
    this.refExp.setValue(generateReference('Exp'));

  }

  ngOnInit(): void {

  }

  createUnitePoidsDropdown(){
    this.listUnitePoids = this.listUnitePoids;
    this.selectedUnitePoids = [];
    this.dropdownUnitePoidsSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownUnitePoidsSelection
    };
  }
  createUniteDimensionDropdown(){
    this.listUniteDimension = this.listUniteDimension;
    this.selectedUniteDimension = [];
    this.dropdownUniteDimensionSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownUniteDimensionSelection
    };
  }
  createClasseLivraisonDropdown(){
    this.listClasseLivraison = listClasseLivraison;
    this.selectedClasseLivraison = [];
    this.dropdownClasseLivraisonSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownClasseLivraisonSelection
    };
  }

  createExpeditionForm() {
    this.expeditionForm = this.fb.group({
      refExp: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      poids: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      unitePoids: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      largeur: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      hauteur: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      profondeur: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      uniteDimension: this.fb.control({ value: this.selectedUnitePoids, disabled: false }, [Validators.required]),
      classeLivraison: this.fb.control({ value: '', disabled: false }, [Validators.required]),
    });
  }


  addExpedition() {
    if (this.expeditionForm.valid) {
      this.getValues();
      this.expeditionService.addExpedition(this.expeditionToAdd).subscribe(
        (success)=>{
          this.toastr.success("L'expédition a été ajoutée avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const editUrl = ['expedition/simple/list-expedition'];
            this.router.navigate(editUrl);
          }, 2000);
        },
        (error)=>{
          this.toastr.error("Erreur lors de l'ajout de l'expédition", "🥵", {
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
    this.expeditionToAdd.classeLivraison = this.classeLivraison.value[0];
    this.expeditionToAdd.refExp = this.refExp.value;
    this.expeditionToAdd.hauteur = this.hauteur.value;
    this.expeditionToAdd.largeur = this.largeur.value;
    this.expeditionToAdd.poids = this.poids.value;
    this.expeditionToAdd.profondeur = this.profondeur.value;
    this.expeditionToAdd.uniteDimension = this.uniteDimension.value[0];
    this.expeditionToAdd.unitePoids = this.unitePoids.value[0];
  }

  clearValues() {
    this.expeditionForm.reset();
    this.expeditionToAdd = new Expedition();
  }

  get refExp(){
    return this.expeditionForm.get('refExp');
  }

  get poids(){
    return this.expeditionForm.get('poids');
  }

  get unitePoids(){
    return this.expeditionForm.get('unitePoids');
  }

  get largeur(){
    return this.expeditionForm.get('largeur');
  }

  get hauteur(){
    return this.expeditionForm.get('hauteur');
  }

  get profondeur(){
    return this.expeditionForm.get('profondeur');
  }

  get uniteDimension(){
    return this.expeditionForm.get('uniteDimension');
  }

  get classeLivraison(){
    return this.expeditionForm.get('classeLivraison');
  }

}
