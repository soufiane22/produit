import { translationsDB } from './../../../../shared/tables/translations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AllowedDate } from 'src/app/shared/directives/allowed-date.directive';
import { generateReference } from 'src/app/shared/helpers/functions.helper';
import { GarAssur } from 'src/app/shared/model/produit-simple/gar-assur.model';
import { GarAssurService } from 'src/app/shared/service/produit-simple/gar-assur.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-add-gar-assur',
  templateUrl: './add-gar-assur.component.html',
  styleUrls: ['./add-gar-assur.component.scss']
})
export class AddGarAssurComponent implements OnInit {
  public garAssurForm: FormGroup;
  public garAssurToAdd = new FormData();
  public imageUrl:string;
  lang:any;
   // Dropdown unité taille
   listUDG: Array<string> = [];
   selectedUDG: Array<string> = [];
   dropdownUDGSettings: any = {};
   closeDropdownUDGSelection = false;
   disabledDropdownUDG = false;

   // Dropdown type
   listTGA: Array<string> = [];
   selectedTGA: Array<string> = [];
   dropdownTGASettings: any = {};
   closeDropdownTGASelection = false;
   disabledDropdownTGA = false;

    // Dropdown monnaie
   disabledDropdownMonnaie = false;
   showFilterMonnaie = true;
   limitSelectionMonnaie = false;
   listMonnaies: Array<any> = [];
   selectedMonnaie: Array<any> = [];
   dropdownMonnaieSettings: any = {};

  constructor(private ngbCalendar: NgbCalendar,
     private dateAdapter: NgbDateAdapter<string>,
      private psService: ProduitSimpleService,
      private garAssurService: GarAssurService,
       private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.createUDGDropDown();
    this.createTGADropDown();
    this.createMonnaieDropDown();
    this.createGarAssurForm();
    // Fill reference
    this.refGarAssur.setValue(generateReference('GarAssur'));
    this.lang=localStorage.getItem('code');

  }

  ngOnInit(): void {
  }
//   afuConfig = {
//     uploadAPI: {
//       url:"https://example-file-upload-api"
//     }
// };

  createGarAssurForm() {
    this.garAssurForm = this.fb.group({
      refGarAssur:this.fb.control({value:'', disabled:true}, [Validators.required]),
      typeGarAssur: this.fb.control({value:this.selectedTGA, disabled:false}, [Validators.required]),
      valid_de: this.fb.control({value:'', disabled:false}, [Validators.required, AllowedDate]),
      duree: this.fb.control({value:'', disabled:false}, [Validators.required]),
      uniteDureeGar: this.fb.control({value:this.selectedUDG, disabled:false}, [Validators.required]),
      valeurGar: this.fb.control({value:'', disabled:false}, [Validators.required]),
      monnaie: this.fb.control({value:this.selectedMonnaie, disabled:false}, [Validators.required]),
      // translations : this.fb.control({value:'', disabled:false}),
      descriptif: this.fb.control({value:'', disabled:false}, [Validators.required]),
      contratModel: this.fb.control({value:'', disabled:false}, [Validators.required])
    });
  }
  createMonnaieDropDown() {
    this.listMonnaies = [
      {
        item_id: 1,
        item_text: "MAD",
        image: "https://www.sciencekids.co.nz/images/pictures/flags96/Morocco.jpg",
      },
      {
        item_id: 2,
        item_text: "USD",
        image: "https://www.sciencekids.co.nz/images/pictures/flags96/United_States.jpg",
      },
      {
        item_id: 3,
        item_text: "EUR",
        image: "https://www.sciencekids.co.nz/images/pictures/flags96/France.jpg",
      },
      {
        item_id: 4,
        item_text: "GBP",
        image: "https://www.sciencekids.co.nz/images/pictures/flags96/United_Kingdom.jpg"
      }
    ];
    this.dropdownMonnaieSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: this.showFilterMonnaie
    };
  }

  get getMonnaies() {
    return this.listMonnaies.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  get typeGarAssur() {
    return this.garAssurForm.get('typeGarAssur');
  }

  get valid_de() {
    return this.garAssurForm.get('valid_de');
  }

  get duree() {
    return this.garAssurForm.get('duree');
  }

  get uniteDureeGar() {
    return this.garAssurForm.get('uniteDureeGar');
  }


  get valeurGar() {
    return this.garAssurForm.get('valeurGar');
  }

  get monnaie() {
    return this.garAssurForm.get('monnaie');
  }

  get descriptif() {
    return this.garAssurForm.get('descriptif');
  }
  // get translations(){
  //   return this.garAssurForm.get('translations');
  // }

  get contratModel() {
    return this.garAssurForm.get('contratModel');
  }

  get refGarAssur(){
    return this.garAssurForm.get('refGarAssur');
  }

  clearValues() {
    this.garAssurForm.reset();
    this.garAssurToAdd = new FormData();
  }

  createUDGDropDown() {
    this.listUDG = ['Jour', 'Mois', 'Année'];
    this.selectedUDG = [];
    this.dropdownUDGSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownUDGSelection
    };
  }

  createTGADropDown() {
    this.listTGA = ['Garantie', 'Extension garantie', 'Assurance', 'Assurance Complémentaire'];
    this.selectedTGA = [];
    this.dropdownTGASettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownTGASelection
    };
  }
  addGarAssur() {
    if (this.garAssurForm.valid) {
      this.getValues();
      console.log('garAssurToAdd',this.garAssurToAdd);

      this.garAssurService.addGarAssur(this.garAssurToAdd).subscribe(
        (success) => {

          const editUrl = ['gar-assur/simple/list-gar-assur'];
          this.router.navigate(editUrl);
          this.toastr.success("La garantie a été ajoutée avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });



        },
        (error) => {
          console.log(error);
          this.toastr.error("La garantie n'a pas pu être ajoutée avec succès", "🥵", {
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
   this.garAssurToAdd.append('refGarAssur',this.refGarAssur.value);
   this.garAssurToAdd.append('language',this.lang);
   this.garAssurToAdd.append('contratModel',this.contratModel.value);
   this.garAssurToAdd.append('__descriptif',this.descriptif.value);
   this.garAssurToAdd.append('duree',this.duree.value);
   this.garAssurToAdd.append('monnaie',this.monnaie.value.map(m=>m.item_text)[0]);
   this.garAssurToAdd.append('typeGarAssur',this.typeGarAssur.value[0]);
   this.garAssurToAdd.append('uniteDureeGar',this.uniteDureeGar.value[0]);
   this.garAssurToAdd.append('valeurGar',this.valeurGar.value);
   this.garAssurToAdd.append('valid_de',this.valid_de.value);

  }

   // Inbuilt
   readUrl(event: any) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }

    // Image upload
    var reader = new FileReader();
    console.log('file uploder',event.target.files[0]);
    const file = event.target.files[0]
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imageUrl=reader.result.toString();
      this.contratModel.setValue(event.target.files[0]);
    }
  }


}
