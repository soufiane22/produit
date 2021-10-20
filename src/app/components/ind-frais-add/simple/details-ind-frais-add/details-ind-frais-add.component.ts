import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { listNatureCoutAdd } from 'src/app/shared/helpers/data.helper';
import { IndFraisAdd } from 'src/app/shared/model/produit-simple/ind-frais-add.model';
import { IndFraisAddService } from 'src/app/shared/service/produit-simple/ind-frais-add.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-details-ind-frais-add',
  templateUrl: './details-ind-frais-add.component.html',
  styleUrls: ['./details-ind-frais-add.component.scss']
})
export class DetailsIndFraisAddComponent implements OnInit {

  public indFraisAddForm: FormGroup;
  public indFraisAdd = new IndFraisAdd();

  // Dropdown nature
  listNature: Array<string> = [];
  selectedNature: Array<string> = [];
  dropdownNatureSettings: any = {};
  closeDropdownNatureSelection = false;
  disabledDropdownNature = false;

  idProduct: string = '';

  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private indFraisAddService: IndFraisAddService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (success) => {
        this.idProduct = success.idProduct;
      },
      (error) => {
        console.log(error);
      })
    this.activatedRoute.params.subscribe(
      (success) => {
        this.indFraisAddService.findIndFraisAddById(success.id).subscribe(
          (success) => {
            this.indFraisAdd = success;
            this.createNatureDropDown();
            this.createIndFraisAddForm();
            this.initFormValues();
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



  createNatureDropDown() {
    this.listNature = listNatureCoutAdd;
    this.selectedNature = [this.indFraisAdd.natureCoutAdd];
    this.dropdownNatureSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownNatureSelection
    };
  }


  createIndFraisAddForm() {
    this.indFraisAddForm = this.fb.group({
      refFrais: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      natureCoutAdd: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      valeurCoutAdd: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      description: this.fb.control({ value: '', disabled: true }, [Validators.required])
    });
  }

  initFormValues() {
    this.refFrais.setValue(this.indFraisAdd.refFrais);
    this.natureCoutAdd.setValue(this.selectedNature);
    this.valeurCoutAdd.setValue(this.indFraisAdd.valeurCoutAdd);
    this.description.setValue(this.indFraisAdd.description);
  }

  goToProduct() {
    const editUrl = ["/gestion-produits/simple/edit-produit", this.idProduct];
    this.router.navigate(editUrl);
  }

  goToList() {
    const editUrl = ['ind-frais-add/simple/list-ind-frais-add'];
    this.router.navigate(editUrl);
  }

  get refFrais() {
    return this.indFraisAddForm.get('refFrais');
  }

  get natureCoutAdd() {
    return this.indFraisAddForm.get('natureCoutAdd');
  }

  get valeurCoutAdd() {
    return this.indFraisAddForm.get('valeurCoutAdd');
  }

  get description() {
    return this.indFraisAddForm.get('description');
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }
}
