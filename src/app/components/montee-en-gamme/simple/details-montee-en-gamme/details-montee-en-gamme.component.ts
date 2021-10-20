import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MonteeEnGamme } from 'src/app/shared/model/produit-simple/montee-en-gamme.model';
import { MonteeEnGammeService } from 'src/app/shared/service/produit-simple/montee-en-gamme.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-details-montee-en-gamme',
  templateUrl: './details-montee-en-gamme.component.html',
  styleUrls: ['./details-montee-en-gamme.component.scss']
})
export class DetailsMonteeEnGammeComponent implements OnInit {
  public megForm: FormGroup;
  public megToShow = new MonteeEnGamme();

  // Dropdown types
  listTypes: Array<string> = [];
  selectedTypes: Array<string> = [];
  dropdownTypesSettings: any = {};
  closeDropdownTypesSelection = false;
  disabledDropdownTypes = false;


  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private megService: MonteeEnGammeService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.megService.findMonteeEnGammeById(success.id).subscribe(
          (success) => {
            this.megToShow = success;
            this.createTypesDropDown();
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
    this.megForm = this.fb.group({
      iconeSymbol: this.fb.control({value:this.megToShow.iconeSymbol, disabled:true}),
      typeMonteeEnGamme: this.fb.control({value:this.selectedTypes, disabled:true}),
      description: this.fb.control({value:this.megToShow.description, disabled:true}),
    });
  }

  createTypesDropDown() {
    this.listTypes = ['Nationale', 'Régionale', 'Internationale'];
    this.selectedTypes = [this.megToShow.typeMonteeEnGamme];
    this.dropdownTypesSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownTypesSelection
    };
  }


  get iconeSymbol() {
    return this.megForm.get('iconeSymbol');
  }

  associatedProduct() {
    const detailUrl = ['gestion-produits/simple/details-produit', this.megToShow.produitService];
    this.router.navigate(detailUrl);
  }

  goToList() {
    const url = ["/distinction/simple/list-distinction"]
    this.router.navigate(url)
  }
}
