import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProduitComposant } from 'src/app/shared/model/produit-simple/produit-composant.model';
import { ProdCompService } from 'src/app/shared/service/produit-simple/prod-comp.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-add-prod-comp',
  templateUrl: './add-prod-comp.component.html',
  styleUrls: ['./add-prod-comp.component.scss']
})
export class AddProdCompComponent implements OnInit {
  public prodCompForm: FormGroup;
  public prodCompToAdd = new ProduitComposant();

  // Dropdown ProdCnt
  listProdCnt: Array<any> = [];
  selectedProdCnt: Array<any> = [];
  dropdownProdCntSettings: any = {};
  closeDropdownProdCntSelection = false;
  disabledDropdownProdCnt = false;

  // Dropdown ProdCnt
  listProdCse: Array<any> = [];
  selectedProdCse: Array<any> = [];
  dropdownProdCseSettings: any = {};
  closeDropdownProdCseSelection = false;
  disabledDropdownProdCse = false;

  // Dropdown Type Produit
  listTProd: Array<string> = [];
  selectedTProd: Array<string> = [];
  dropdownTProdSettings: any = {};
  closeDropdownTProdSelection = false;
  disabledDropdownTProd = false;

  // Dropdown ProdCnt
  listUq: Array<string> = [];
  selectedUq: Array<string> = [];
  dropdownUqSettings: any = {};
  closeDropdownUqSelection = false;
  disabledDropdownUq = false;




  constructor(
    private ngbCalendar: NgbCalendar,
     private dateAdapter: NgbDateAdapter<string>,
      private psService: ProduitSimpleService,
      private prodCompService: ProdCompService,
      private router: Router, private fb: FormBuilder,
      private toastr: ToastrService, private activatedRoute: ActivatedRoute) {

    this.createProdCntDropDown();
    this.createProdCseDropDown();
    this.createUqDropDown();
    this.createTProdDropDown();
    this.createProdCompForm();

  }

  ngOnInit(): void {
  }

  createProdCompForm() {
    this.prodCompForm = this.fb.group({
      typeProduit: this.fb.control({ value: this.selectedTProd, disabled: false }, [Validators.required]),
      qteProduit: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      uniteQte: this.fb.control({ value: this.selectedUq, disabled: false }, [Validators.required]),
      refProdComposant: this.fb.control({ value: this.selectedProdCnt, disabled: false }, [Validators.required]),
      refProdCompose: this.fb.control({ value: this.selectedProdCse, disabled: false }, [Validators.required]),
    });
  }


  get typeProduit() {
    return this.prodCompForm.get('typeProduit');
  }

  get qteProduit() {
    return this.prodCompForm.get('qteProduit');
  }

  get uniteQte() {
    return this.prodCompForm.get('uniteQte');
  }

  get refProdComposant() {
    return this.prodCompForm.get('refProdComposant');
  }


  get refProdCompose() {
    return this.prodCompForm.get('refProdCompose');
  }


  clearValues() {
    this.prodCompForm.reset();
    this.prodCompToAdd = new ProduitComposant();
  }

  createProdCntDropDown() {
    this.psService.getAllProducts().subscribe(
      (success) => {
        this.listProdCnt= success
        console.log('listProdCnt',this.listProdCnt);
        
        this.listProdCnt = success.map(x => {
          let obj = { _id: '', refProduit: '', nameProduit:'' }
          obj._id = x._id;
          obj.refProduit = x.refProduit;
          // obj.nameProduit = x['translations']['0'].__designation
          return obj;
      
          
        });
  
        
        this.selectedProdCnt = [];
        this.dropdownProdCntSettings = {
          singleSelection: true,
          idField: '_id',
          textField: 'refProduit',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          closeDropDownOnSelection: this.closeDropdownProdCntSelection
        };
      },
      (error) => {
        console.log(error);
      }
    );

  }

  createProdCseDropDown() {
    this.psService.getAllProducts().subscribe(
      (success) => {
        this.listProdCse = success.map(x => {
          let obj = { _id: '', refProduit: '',nameProduit:'' }
          obj._id = x._id;
          obj.refProduit = x.refProduit;
          // obj.nameProduit = x['translations']['0'].__designation
          return obj;
        });
        this.selectedProdCse = [];
        this.dropdownProdCseSettings = {
          singleSelection: true,
          idField: '_id',
          textField: 'refProduit',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          closeDropDownOnSelection: this.closeDropdownProdCseSelection
        };
      },
      (error) => {
        console.log(error);
      });

  }

  createUqDropDown() {
    this.listUq = ['Uq 1', 'Uq 2', 'Uq3'];
    this.selectedUq = [];
    this.dropdownUqSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownUqSelection
    };
  }

  createTProdDropDown() {
    this.listTProd = ['TProd 1', 'TProd 2', 'TProd3'];
    this.selectedTProd = [];
    this.dropdownTProdSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownTProdSelection
    };
  }

  addProdComp() {
    if (this.prodCompForm.valid) {
      this.getValues();
      console.log('produitCompForm',this.prodCompForm.value);
      this.prodCompService.addProduitComposant(this.prodCompToAdd).subscribe(
        (success) => {

          this.toastr.success("Le produit composant a été ajoutée avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const editUrl = ['prod-comp/simple/list-prod-comp'];
            this.router.navigate(editUrl);
          }, 2000);
        },
        (error) => {
          console.log(error);
          this.toastr.error("Le produit composant n'a pas pu être ajoutée avec succès", "🥵", {
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
      this.prodCompToAdd.qteProduit = this.qteProduit.value;
      this.prodCompToAdd.typeProduit = this.typeProduit.value[0];
      this.prodCompToAdd.uniteQte = this.uniteQte.value[0];
      this.prodCompToAdd.refProdComposant = this.refProdComposant.value[0]._id;
      this.prodCompToAdd.refProdCompose = this.refProdCompose.value[0]._id;
  }
}
