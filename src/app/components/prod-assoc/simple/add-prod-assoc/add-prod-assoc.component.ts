import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProduitAssocie } from 'src/app/shared/model/produit-simple/produit-associe.model';
import { ProdAssocService } from 'src/app/shared/service/produit-simple/prod-assoc.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-add-prod-assoc',
  templateUrl: './add-prod-assoc.component.html',
  styleUrls: ['./add-prod-assoc.component.scss'],
})
export class AddProdAssocComponent implements OnInit {
  public prodAssocForm: FormGroup;
  public prodAssocToAdd = new ProduitAssocie();

  // Dropdown Prod1
  listProd1: Array<any> = [];
  selectedProd1: Array<any> = [];
  dropdownProd1Settings: any = {};
  closeDropdownProd1Selection = false;
  disabledDropdownProd1 = false;

  // Dropdown Prod1
  listProd2: Array<any> = [];
  selectedProd2: Array<any> = [];
  dropdownProd2Settings: any = {};
  closeDropdownProd2Selection = false;
  disabledDropdownProd2 = false;

  // Dropdown Type Produit
  listTAssoc: Array<string> = [];
  selectedTAssoc: Array<string> = [];
  dropdownTAssocSettings: any = {};
  closeDropdownTAssocSelection = false;
  disabledDropdownTAssoc = false;

  constructor(
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private psService: ProduitSimpleService,
    private prodAssocService: ProdAssocService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.createProd1DropDown();
    this.createProd2DropDown();
    this.createTAssocDropDown();
    this.createProdCompForm();
  }

  ngOnInit(): void {}

  createProdCompForm() {
    this.prodAssocForm = this.fb.group({
      typeAssociation: this.fb.control(
        { value: this.selectedTAssoc, disabled: false },
        [Validators.required]
      ),
      produitService1: this.fb.control(
        { value: this.selectedProd1, disabled: false },
        [Validators.required]
      ),
      produitService2: this.fb.control(
        { value: this.selectedProd2, disabled: false },
        [Validators.required]
      ),
    });
  }

  get typeAssociation() {
    return this.prodAssocForm.get('typeAssociation');
  }

  get produitService1() {
    return this.prodAssocForm.get('produitService1');
  }

  get produitService2() {
    return this.prodAssocForm.get('produitService2');
  }

  clearValues() {
    this.prodAssocForm.reset();
    this.prodAssocToAdd = new ProduitAssocie();
  }

  createProd1DropDown() {
    this.psService.getAllProducts().subscribe(
      (success) => {
        this.listProd1 = success.map((x) => {
          let obj = { _id: '', refProduit: '' };
          obj._id = x._id;
          obj.refProduit = x.refProduit;
          return obj;
        });
        this.selectedProd1 = [];
        this.dropdownProd1Settings = {
          singleSelection: true,
          idField: '_id',
          textField: 'refProduit',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          closeDropDownOnSelection: this.closeDropdownProd1Selection,
        };
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createProd2DropDown() {
    this.psService.getAllProducts().subscribe(
      (success) => {
        this.listProd2 = success.map((x) => {
          let obj = { _id: '', refProduit: '' };
          obj._id = x._id;
          obj.refProduit = x.refProduit;
          return obj;
        });
        this.selectedProd2 = [];
        this.dropdownProd2Settings = {
          singleSelection: true,
          idField: '_id',
          textField: 'refProduit',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          closeDropDownOnSelection: this.closeDropdownProd2Selection,
        };
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createTAssocDropDown() {
    this.listTAssoc = ['TAssoc 1', 'TAssoc 2', 'TAssoc3'];
    this.selectedTAssoc = [];
    this.dropdownTAssocSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownTAssocSelection,
    };
  }

  addProdComp() {
    if (this.prodAssocForm.valid) {
      this.getValues();
      this.prodAssocService.addProduitAssocie(this.prodAssocToAdd).subscribe(
        (success) => {
          this.toastr.success(
            'Le produit associé a été ajoutée avec succès',
            '👌',
            {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            }
          );
          setTimeout(() => {
            const editUrl = ['prod-assoc/simple/list-prod-assoc'];
            this.router.navigate(editUrl);
          }, 2000);
        },
        (error) => {
          console.log(error);
          this.toastr.error(
            "Le produit associé n'a pas pu être ajoutée avec succès",
            '🥵',
            {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            }
          );
        }
      );
    } else {
      this.toastr.error(
        'Merci de bien vouloir remplir tous les champs du formulaire',
        '🥵',
        {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        }
      );
    }
  }

  getValues() {
    this.prodAssocToAdd.typeAssociation = this.typeAssociation.value[0];
    this.prodAssocToAdd.produitService1 = this.produitService1.value[0]._id;
    this.prodAssocToAdd.produitService2 = this.produitService2.value[0]._id;
  }
}
