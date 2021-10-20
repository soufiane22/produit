import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import { ToastrService } from 'ngx-toastr';
import { listTypeDistinction, listUniteDuree } from 'src/app/shared/helpers/data.helper';
import { Distinction } from 'src/app/shared/model/produit-simple/distinction.model';
import { DistinctionService } from 'src/app/shared/service/produit-simple/distinction.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-details-distinction',
  templateUrl: './details-distinction.component.html',
  styleUrls: ['./details-distinction.component.scss']
})
export class DetailsDistinctionComponent implements OnInit {

  public distForm: FormGroup;
  public distToShow = new Distinction();
  public config1: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
  // Dropdown types
  listTypes: Array<string> = [];
  selectedTypes: Array<string> = [];
  dropdownTypesSettings: any = {};
  closeDropdownTypesSelection = false;
  disabledDropdownTypes = false;

  // Dropdown types
  listUnites: Array<string> = [];
  selectedUnites: Array<string> = [];
  dropdownUnitesSettings: any = {};
  closeDropdownUnitesSelection = false;
  disabledDropdownUnites = false;

  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private distService: DistinctionService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.distService.findDistinctionById(success.id).subscribe(
          (success) => {
            this.distToShow = success;
            this.createTypesDropDown();
            this.createUnitesDropDown();
            this.createDistForm();
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

  createDistForm() {
    this.distForm = this.fb.group({
      logo: this.fb.control({value:this.distToShow.logo, disabled:true}),
      dateObtention: this.fb.control({value:this.distToShow.dateObtention, disabled:true}),
      typeD: this.fb.control({value:this.selectedTypes,disabled:true}),
      designation: this.fb.control({value:this.distToShow.designation,disabled:true}),
      duree: this.fb.control({value:this.distToShow.duree, disabled:true}),
      uniteDuree: this.fb.control({value:this.selectedUnites, disabled:true})
    });
  }

  createTypesDropDown() {
    this.listTypes = listTypeDistinction;
    this.selectedTypes = [this.distToShow.typeD];
    this.dropdownTypesSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownTypesSelection
    };
  }

  createUnitesDropDown() {
    this.listUnites = listUniteDuree;
    this.selectedUnites = [this.distToShow.uniteDuree];
    this.dropdownUnitesSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownUnitesSelection
    };
  }

  associatedProduct() {
    const detailUrl = ['gestion-produits/simple/details-produit', this.distToShow.produitService];
    this.router.navigate(detailUrl);
  }

  goToList() {
    const url = ["/distinction/simple/list-distinction"]
    this.router.navigate(url)
  }

  get logo(){
    return this.distForm.get('logo');
  }

}


