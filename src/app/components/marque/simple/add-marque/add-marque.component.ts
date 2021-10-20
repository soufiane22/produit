import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AllowedDate } from 'src/app/shared/directives/allowed-date.directive';
import { Marque } from 'src/app/shared/model/produit-simple/marque.model';
import { MarqueService } from 'src/app/shared/service/produit-simple/marque.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-add-marque',
  templateUrl: './add-marque.component.html',
  styleUrls: ['./add-marque.component.scss']
})
export class AddMarqueComponent implements OnInit {
  public marqueForm: FormGroup;
  public marqueToAdd = new Marque();

  // Dropdown Marque
  listMarque: Array<string> = [];
  selectedMarque: Array<string> = [];
  dropdownMarqueSettings: any = {};
  closeDropdownMarqueSelection = false;
  disabledDropdownMarque = false;

  // Dropdown Modèle
  listModele: Array<string> = [];
  selectedModele: Array<string> = [];
  dropdownModeleSettings: any = {};
  closeDropdownModeleSelection = false;
  disabledDropdownModele = false;

  // Dropdown Modèle
  listSModele: Array<string> = [];
  selectedSModele: Array<string> = [];
  dropdownSModeleSettings: any = {};
  closeDropdownSModeleSelection = false;
  disabledDropdownSModele = false;

  // Dropdown Modèle
  listSSModele: Array<string> = [];
  selectedSSModele: Array<string> = [];
  dropdownSSModeleSettings: any = {};
  closeDropdownSSModeleSelection = false;
  disabledDropdownSSModele = false;



  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private marqueService: MarqueService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.createMarqueDropDown();
    this.createModeleDropDown();
    this.createSModeleDropDown();
    this.createSSModeleDropDown();
    this.createMarqueForm();

  }

  ngOnInit(): void {
  }

  createMarqueForm() {
    this.marqueForm = this.fb.group({
      refMarque: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      marque: this.fb.control({ value: this.selectedMarque, disabled: false }, [Validators.required]),
      model: this.fb.control({ value: this.selectedModele, disabled: false }, [Validators.required]),
      sModel: this.fb.control({ value: this.selectedSModele, disabled: false }, [Validators.required]),
      sSModel: this.fb.control({ value: this.selectedSSModele, disabled: false }, [Validators.required]),
      millissime: this.fb.control({ value: '', disabled: false }, [Validators.required, AllowedDate])
    });
  }


  get refMarque() {
    return this.marqueForm.get('refMarque');
  }

  get marque() {
    return this.marqueForm.get('marque');
  }

  get model() {
    return this.marqueForm.get('model');
  }

  get sModel() {
    return this.marqueForm.get('sModel');
  }


  get sSModel() {
    return this.marqueForm.get('sSModel');
  }

  get millissime() {
    return this.marqueForm.get('millissime');
  }

  clearValues() {
    this.marqueForm.reset();
    this.marqueToAdd = new Marque();
  }

  createMarqueDropDown() {
    this.listMarque = ['Marque 1', 'Marque 2', 'Marque3'];
    this.selectedMarque = [];
    this.dropdownMarqueSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownMarqueSelection
    };
  }

  createModeleDropDown() {
    this.listModele = ['Modele 1', 'Modele 2', 'Modele 3'];
    this.selectedModele = [];
    this.dropdownModeleSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownModeleSelection
    };
  }

  createSModeleDropDown() {
    this.listSModele = ['SModele 1', 'SModele 2', 'SModele 3'];
    this.selectedSModele = [];
    this.dropdownSModeleSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownSModeleSelection
    };
  }

  createSSModeleDropDown() {
    this.listSSModele = ['SSModele 1', 'SSModele 2', 'SSModele 3'];
    this.selectedSSModele = [];
    this.dropdownSSModeleSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownSSModeleSelection
    };
  }
  addMarque() {
    if (this.marqueForm.valid) {
      this.getValues();
      this.marqueService.addMarque(this.marqueToAdd).subscribe(
        (success) => {
          this.toastr.success("La marque a été ajoutée avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const editUrl = ['marque/simple/list-marque'];
            this.router.navigate(editUrl);
          }, 2000);
        },
        (error) => {
          console.log(error);
          this.toastr.error("La marque n'a pas pu être ajoutée avec succès", "🥵", {
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
    this.marqueToAdd.marque = this.marque.value[0];
    this.marqueToAdd.model = this.model.value[0];
    this.marqueToAdd.millissime = this.millissime.value;
    this.marqueToAdd.refMarque = this.refMarque.value;
    this.marqueToAdd.sModel = this.sModel.value[0];
    this.marqueToAdd.sSModel = this.sSModel.value[0];
  }

}
