import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { InstClassif } from 'src/app/shared/model/produit-simple/inst-classif.model';
import { InstClassificationService } from 'src/app/shared/service/produit-simple/inst-classification.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-details-inst-classif',
  templateUrl: './details-inst-classif.component.html',
  styleUrls: ['./details-inst-classif.component.scss']
})
export class DetailsInstClassifComponent implements OnInit {

  public instClassifForm: FormGroup;
  public instClassifToShow = new InstClassif();

  // Dropdown types
  listTypes: Array<string> = [];
  selectedTypes: Array<string> = [];
  dropdownTypesSettings: any = {};
  closeDropdownTypesSelection = false;
  disabledDropdownTypes = false;

  idProduct:string='';
  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private instClassifService: InstClassificationService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
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
        this.instClassifService.findInstClassifById(success.id).subscribe(
          (success) => {
            this.instClassifToShow = success;
            this.createInstClassifForm();
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

  createInstClassifForm() {
    this.instClassifForm = this.fb.group({
      ref_classif_valeur: this.fb.control({value:'',disabled:true}),
      label_texte:  this.fb.control({value:'', disabled:true}),
      domaine:  this.fb.control({value:'', disabled:true}),
      valeur: this.fb.control({value:'', disabled:true})
    });
  }

  get ref_classif_valeur() {
    return this.instClassifForm.get('ref_classif_valeur');
  }

  get label_texte() {
    return this.instClassifForm.get('label_texte');
  }

  get domaine() {
    return this.instClassifForm.get('domaine');
  }

  get valeur() {
    return this.instClassifForm.get('valeur');
  }

  initFormValues() {
    this.ref_classif_valeur.setValue(this.instClassifToShow.ref_classif_valeur);
    this.label_texte.setValue(this.instClassifToShow.label_texte);
    this.domaine.setValue(this.instClassifToShow.domaine);
    this.valeur.setValue(this.instClassifToShow.valeur);
  }

  associatedProduct() {
    const detailUrl = ['gestion-produits/simple/edit-produit', this.idProduct];
    this.router.navigate(detailUrl);
  }

  goToList() {
    const url = ["/inst-classif/simple/list-inst-classif"]
    this.router.navigate(url)
  }

}
