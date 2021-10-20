import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { listGroupeCaract, listUniteCaract, listTypeCoutAdd } from 'src/app/shared/helpers/data.helper';
import { generateReference } from 'src/app/shared/helpers/functions.helper';
import { InstCaractVar } from 'src/app/shared/model/produit-simple/inst-caract-var.model';

import { InstCaractVarService } from 'src/app/shared/service/produit-simple/inst-caract-var.service';


@Component({
  selector: 'app-add-inst-caract-var',
  templateUrl: './add-inst-caract-var.component.html',
  styleUrls: ['./add-inst-caract-var.component.scss']
})
export class AddInstCaractVarComponent implements OnInit {

  public instCaractVarForm: FormGroup;
  public instCaractVarToAdd = new InstCaractVar();

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



  constructor(private router: Router, private fb: FormBuilder, private calendar: NgbCalendar, private toastr: ToastrService, private activatedRoute: ActivatedRoute, private instCaractVarService: InstCaractVarService) {
    this.createUniteDropdown();
    this.createGroupeDropdown();
    this.createTypeDropdown();
    this.createInsCaractVarForm();
    this.refInstCaractVar.setValue(generateReference('InstCarVar'));
  }
  ngOnInit(): void {
  }
  createGroupeDropdown() {
    this.listGroupe = listGroupeCaract;
    this.selectedGroupe = [];
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
    this.selectedUnite = [];
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
    this.selectedType = [];
    this.dropdownTypeSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownTypeSelection
    };
  }

  createInsCaractVarForm() {
    this.instCaractVarForm = this.fb.group({
      refInstCaractVar: this.fb.control({ value: '', disabled:true }, [Validators.required]),
      affUniqPriv: this.fb.control({ value: '' , disabled:false}, [Validators.required]),
      groupe: this.fb.control({ value: this.selectedGroupe , disabled:false}, [Validators.required]),
      label: this.fb.control({ value: '' , disabled:false}, [Validators.required]),
      valeur: this.fb.control({ value: '' , disabled:false}, [Validators.required]),
      unite: this.fb.control({ value: this.selectedUnite , disabled:false}, [Validators.required]),
      ordre: this.fb.control({ value: '' , disabled:false}, [Validators.required]),
      coutAdd: this.fb.control({ value: '' , disabled:false}, [Validators.required]),
      typeCoutAdd: this.fb.control({ value: this.selectedType , disabled:false}, [Validators.required]),
      valeurCoutAdd: this.fb.control({ value: '' , disabled:false}, [Validators.required]),
      prix: this.fb.control({ value: '' , disabled:false}, [Validators.required])
    });

  }

  get refInstCaractVar(){
    return this.instCaractVarForm.get('refInstCaractVar');
  }

  get affUniqPriv(){
    return this.instCaractVarForm.get('affUniqPriv');
  }

  get groupe(){
    return this.instCaractVarForm.get('groupe');
  }

  get label(){
    return this.instCaractVarForm.get('label');
  }

  get valeur(){
    return this.instCaractVarForm.get('valeur');
  }

  get unite(){
    return this.instCaractVarForm.get('unite');
  }

  get ordre(){
    return this.instCaractVarForm.get('ordre');
  }

  get coutAdd(){
    return this.instCaractVarForm.get('coutAdd');
  }

  get typeCoutAdd(){
    return this.instCaractVarForm.get('typeCoutAdd');
  }

  get valeurCoutAdd(){
    return this.instCaractVarForm.get('valeurCoutAdd');
  }

  get prix(){
    return this.instCaractVarForm.get('prix');
  }




  // Operations
  addInstCaractVar() {
    if (this.instCaractVarForm.valid) {
      this.getValues();
      this.instCaractVarService.addInstCaractVar(this.instCaractVarToAdd).subscribe(
        (success)=>{
          this.toastr.success("L'instance caractéristique variante a été ajoutée avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const editUrl = ['inst-caract-var/simple/list-inst-caract-var'];
            this.router.navigate(editUrl);
          }, 2000);
        },
        (error)=>{
          console.log(error);
          this.toastr.error("Error lors de l'ajout de l'instance caractéristique variante", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      );
      
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
    this.instCaractVarForm.reset();
    this.instCaractVarToAdd = new InstCaractVar();
  }

  getValues() {
   this.instCaractVarToAdd.label = this.label.value;
   this.instCaractVarToAdd.ordre = this.ordre.value;
   this.instCaractVarToAdd.prix = this.prix.value;
   this.instCaractVarToAdd.unite = this.unite.value[0];
   this.instCaractVarToAdd.groupe = this.groupe.value[0];
   this.instCaractVarToAdd.typeCoutAdd = this.typeCoutAdd.value[0];
   this.instCaractVarToAdd.valeur =this.valeur.value;
   this.instCaractVarToAdd.valeurCoutAdd = this.valeurCoutAdd.value;
   this.instCaractVarToAdd.affUniqPriv = this.affUniqPriv.value === "Oui";
   this.instCaractVarToAdd.coutAdd = this.coutAdd.value === "Oui";
   this.instCaractVarToAdd.refInstCaractVar = this.refInstCaractVar.value;
  }
 
}
