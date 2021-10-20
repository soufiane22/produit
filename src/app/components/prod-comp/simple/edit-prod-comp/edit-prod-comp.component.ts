import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProduitComposant } from 'src/app/shared/model/produit-simple/produit-composant.model';
import { ProdCompService } from 'src/app/shared/service/produit-simple/prod-comp.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-edit-prod-comp',
  templateUrl: './edit-prod-comp.component.html',
  styleUrls: ['./edit-prod-comp.component.scss']
})
export class EditProdCompComponent implements OnInit {
  public prodCompForm: FormGroup;
  public prodCompForm1 : FormGroup
  public prodComp = new ProduitComposant();

    // Dropdown ProdCnt
    listProdCnt: Array<any> = [];
    selectedProdCnt: String;
    dropdownProdCntSettings: any = {};
    closeDropdownProdCntSelection = false;
    disabledDropdownProdCnt = false;

    // Dropdown ProdCse
    listProdCse: Array<any> = [];
    selectedProdCse:String;
    dropdownProdCseSettings: any = {};
    closeDropdownProdCseSelection = false;
    disabledDropdownProdCse = false;

    // Dropdown Type Produit
    listTProd: Array<string> = [];
    selectedTProd:String;
    dropdownTProdSettings: any = {};
    closeDropdownTProdSelection = false;
    disabledDropdownTProd = false;

    // Dropdown ProdCnt
    listUq: Array<string> = [];
    selectedUq: String;
    dropdownUqSettings: any = {};
    closeDropdownUqSelection = false;
    disabledDropdownUq = false;
  constructor(
    private psService: ProduitSimpleService,
    private prodCompService: ProdCompService,
    private router: Router, public fb: FormBuilder,
    private toastr: ToastrService, private activatedRoute: ActivatedRoute
  ) {

  }
   obj2 = { _id: '', refProduit: '', nameProduit:'' };
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.prodCompService.findProduitComposantById(success.id).subscribe(
          (success) => {
             this.prodComp = success ;
             console.log('prodComp',this.prodComp.refProdCompose);
             this.obj2._id = this.prodComp.refProdCompose._id;
             this.obj2.refProduit = this.prodComp.refProdCompose.refProduit;
             this.obj2.nameProduit = this.prodComp.refProdCompose['translations']['0'].__designation;
             console.log('this.obj2',this.obj2)
             this.createUqDropDown();
             this.createProdCntDropDown();
             this.createProdCseDropDown();
             this.createTProdDropDown();
             this.createUqDropDown();
             this.createProdCompForm();
             this.refProdCompose.setValue(this.obj2);
             this.uniteQte.setValue(this.prodComp.uniteQte);
             console.log(' this.prodCompForm', this.prodCompForm.value);
          },
          (err) => { console.log(err);

          }
        )
      }
    )

    
  }

  createProdCompForm() {
    this.prodCompForm = this.fb.group({
      typeProduit: [this.selectedTProd, [Validators.required]],
      qteProduit: this.fb.control({ value:this.prodComp.qteProduit , disabled: false }, [Validators.required]),
      uniteQte: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      refProdComposant:  ['', [Validators.required]],
      refProdCompose: ['',[Validators.required]]
    });
    // prodComp.refProdComposant['translations']['0'].__designation  value:this.prodComp.refProdComposant['translations']['0']
  }

  createProdCompForm1(){
    this.prodCompForm1 = this.fb.group({
      refProdComposant: this.fb.control({ value: this.prodComp.refProdComposant['translations'][0].__designation, disabled: false }, [Validators.required])
    })
    this.refProdComposant.setValue(this.prodComp.refProdComposant['translations'][0].__designation)
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
    return this.prodCompForm1.get('refProdComposant');
  }


  get refProdCompose() {
    return this.prodCompForm.get('refProdCompose');
  }

  changeprodCompsnt(event){

  }

    createProdCntDropDown() {
      this.psService.getAllProducts().subscribe(
        (success) => {
          this.listProdCnt = success.map(x => {
            let obj = { _id: '', refProduit: '', nameProduit:'' }
            obj._id = x._id;
            obj.refProduit = x.refProduit;
            obj.nameProduit = x['translations']['0'].__designation;
            return obj;
          });
          console.log('this.listProdCnt',this.listProdCnt)
          this.dropdownProdCntSettings = {
            singleSelection: true,
            idField: '_id',
            textField: 'nameProduit',
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
            obj.nameProduit = x['translations']['0']?.__designation
            return obj;
          });
          this.selectedProdCse = this.prodComp.refProdCompose['translations']['0'].__designation;
          this.dropdownProdCseSettings = {
            singleSelection: true,
            idField: '_id',
            textField: 'nameProduit',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            closeDropDownOnSelection: this.closeDropdownProdCseSelection
          };
          this.createProdCompForm1()
        },
        (error) => {
          console.log(error);
        });

    }

    createUqDropDown() {
      this.listUq = ['Uq 1', 'Uq 2', 'Uq3'];
      this.selectedUq = this.prodComp.uniteQte;
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
      this.selectedTProd = this.prodComp.typeProduit;
      console.log('selectedTProd',this.selectedTProd);

      this.dropdownTProdSettings = {
        singleSelection: true,
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true,
        closeDropDownOnSelection: this.closeDropdownTProdSelection
      };

    }



    getValues() {
      this.prodComp.qteProduit = this.qteProduit.value;
      this.prodComp.typeProduit = this.typeProduit.value;
      this.prodComp.uniteQte = this.uniteQte.value;
      this.prodComp.refProdComposant = this.refProdComposant.value._id;
      this.prodComp.refProdCompose = this.refProdCompose.value._i

}

clearValues() {
  this.prodCompForm.reset();
  this.prodComp = new ProduitComposant();
}

editProdComp(){

}
}
