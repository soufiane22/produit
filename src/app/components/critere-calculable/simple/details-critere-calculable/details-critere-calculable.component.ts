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
  selector: 'app-details-critere-calculable',
  templateUrl: './details-critere-calculable.component.html',
  styleUrls: ['./details-critere-calculable.component.scss']
})
export class DetailsCritereCalculableComponent implements OnInit {

  public critCalcForm: FormGroup;
  public critCalcToShow = new CritereCalculable();


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

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.critCalService.findCritereCalculableById(success.id).subscribe(
          (success) => {
            this.critCalcToShow = success;
            this.createGroupesDropDown();
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
    this.critCalcForm = this.fb.group({
      groupeCritere: this.fb.control({value:this.selectedGroupes, disabled:true}),
      refCritere:  this.fb.control({value:this.critCalcToShow.refCritere, disabled:true}),
      label:  this.fb.control({value:this.critCalcToShow.label, disabled:true}),
      valeur:  this.fb.control({value:this.critCalcToShow.valeur, disabled:true}),
      uniteValeur:  this.fb.control({value:this.selectedUnites,disabled:true})
    });
  }

  createGroupesDropDown() {
    this.listGroupes = listGroupeCritereCalculable;
    this.selectedGroupes = [this.critCalcToShow.groupeCritere];
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
    this.selectedUnites = [this.critCalcToShow.uniteValeur];
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
    const detailUrl = ['gestion-produits/simple/details-produit', this.critCalcToShow.produitService];
    this.router.navigate(detailUrl);
  }

  goToList() {
    const url = ["/critere-calculable/simple/list-critere-calculable"]
    this.router.navigate(url)
  }

}
