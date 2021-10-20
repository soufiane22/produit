import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { listCurrencie } from 'src/app/shared/helpers/data.helper';
import { GrilleTarifaire } from 'src/app/shared/model/produit-simple/grille-tarifaire.model';
import { GrilleTarifaireService } from 'src/app/shared/service/produit-simple/grille-tarifaire.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-details-grille-tarifaire',
  templateUrl: './details-grille-tarifaire.component.html',
  styleUrls: ['./details-grille-tarifaire.component.scss']
})
export class DetailsGrilleTarifaireComponent implements OnInit {
  public gtForm: FormGroup;
  public gtToShow = new GrilleTarifaire();
  // Dropdown monnaie
  disabledDropdownMonnaie = false;
  showFilterMonnaie = true;
  limitSelectionMonnaie = false;
  listMonnaies: Array<any> = [];
  selectedMonnaie: Array<any> = [];
  dropdownMonnaieSettings: any = {};

  idProduct: string = '';


  constructor(private psService: ProduitSimpleService, private gtService: GrilleTarifaireService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
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
        this.gtService.findGrilleTarifaireById(success.id).subscribe(
          (success) => {
            this.gtToShow = success;
            this.createMonnaieDropDown();
            this.createGtForm()
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


  createMonnaieDropDown() {
    this.listMonnaies = listCurrencie;
    this.selectedMonnaie = this.listMonnaies.filter(x => this.gtToShow.monnaie === x.item_text);
    this.dropdownMonnaieSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: this.showFilterMonnaie
    };
  }

  createGtForm() {
    this.gtForm = this.fb.group({
      ref_grille: this.fb.control({ value: this.gtToShow.ref_grille, disabled: true }),
      qte_inf: this.fb.control({ value: this.gtToShow.qte_inf, disabled: true }),
      qte_sup: this.fb.control({ value: this.gtToShow.qte_sup, disabled: true }),
      tarif_unitaire_ht: this.fb.control({ value: this.gtToShow.tarif_unitaire_ht, disabled: true }),
      valeur: this.fb.control({ value: this.gtToShow.valeur, disabled: true }),
      monnaie: this.fb.control({ value: this.selectedMonnaie, disabled: this.disabledDropdownMonnaie })
    });
  }

  get getMonnaies() {
    return this.listMonnaies.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }


  goToList() {
    const url = ["/grille-tarifaire/simple/list-grille-tarifaire"]
    this.router.navigate(url)
  }

  goToProduct() {
    const url = ["/gestion-produits/simple/edit-produit", this.idProduct];
    this.router.navigate(url)
  }

}
