import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { generateReference } from 'src/app/shared/helpers/functions.helper';
import { IndStock } from 'src/app/shared/model/produit-simple/ind-stock.model';
import { IndStockService } from 'src/app/shared/service/produit-simple/ind-stock.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-add-ind-stock',
  templateUrl: './add-ind-stock.component.html',
  styleUrls: ['./add-ind-stock.component.scss']
})
export class AddIndStockComponent implements OnInit {
  public indStockForm: FormGroup;
  public indStockToAdd = new FormData();

  // Dropdown distributeurs
  listEtat: Array<string> = [];
  selectedEtat: Array<string> = [];
  dropdownEtatSettings: any = {};
  closeDropdownEtatSelection = false;
  disabledDropdownEtat = false;

  rfidUrl:string;
  rqrUrl:string;
  rcbUrl:string;


  constructor(private ngbCalendar: NgbCalendar,private dateAdapter: NgbDateAdapter<string>,private psService: ProduitSimpleService, private indStockService: IndStockService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {

    this.createEtatDropDown();
    this.createIndStockForm();
    this.refStock.setValue(generateReference('IndStock'));
  }

  ngOnInit(): void {

  }

  createEtatDropDown() {
    this.listEtat = ['Etat 1', 'Etat 2', 'Etat 3', 'Etat 4'];
    this.selectedEtat = [];
    this.dropdownEtatSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownEtatSelection
    };
  }

  createIndStockForm() {
    this.indStockForm = this.fb.group({
      refPartenaire: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      refStock: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      refRFIDStock: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      refQRStock: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      refCodeBarreStock: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      etatStock: this.fb.control({ value: this.selectedEtat, disabled: false }, [Validators.required]),
      indQteDispo: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      qteDisponible: this.fb.control({ value: '', disabled: false }, [Validators.required]),
    });
  }


  addIndStock() {
    if (this.indStockForm.valid) {
      this.getValues();
      this.indStockService.addIndStock(this.indStockToAdd).subscribe(
        (success)=>{
          this.toastr.success("L'indication stock a été ajoutée avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const editUrl = ['ind-stock/simple/list-ind-stock'];
            this.router.navigate(editUrl);
          }, 2000);
        },
        (error)=>{
          this.toastr.error("Erreur lors de l'ajout de l'indication stock", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      );
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
    this.indStockToAdd.append('etatStock',this.etatStock.value[0]);
    let iqd = new Boolean(this.indQteDispo.value === "Oui")
    this.indStockToAdd.append('indQteDispo',iqd.toString());
    this.indStockToAdd.append('qteDisponible',this.qteDisponible.value);
    this.indStockToAdd.append('refCodeBarreStock',this.refCodeBarreStock.value);
    this.indStockToAdd.append('refPartenaire',this.refPartenaire.value);
    this.indStockToAdd.append('refQRStock',this.refQRStock.value);
    this.indStockToAdd.append('refRFIDStock',this.refRFIDStock.value);
    this.indStockToAdd.append('refStock',this.refStock.value);
  }

  clearValues() {
    this.indStockForm.reset();
    this.indStockToAdd = new FormData();
  }

  get refPartenaire(){
    return this.indStockForm.get('refPartenaire');
  }

  get refStock(){
    return this.indStockForm.get('refStock');
  }

  get refRFIDStock(){
    return this.indStockForm.get('refRFIDStock');
  }

  get refQRStock(){
    return this.indStockForm.get('refQRStock');
  }

  get refCodeBarreStock(){
    return this.indStockForm.get('refCodeBarreStock');
  }

  get etatStock(){
    return this.indStockForm.get('etatStock');
  }

  get indQteDispo(){
    return this.indStockForm.get('indQteDispo');
  }

  get qteDisponible(){
    return this.indStockForm.get('qteDisponible');
  }


  readRfidUrl(event: any) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.rfidUrl = reader.result.toString();
      this.refRFIDStock.setValue(event.target.files[0]);
    }
  }

  readQrUrl(event: any) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.rqrUrl = reader.result.toString();
      this.refQRStock.setValue(event.target.files[0]);
    }
  }

  readCodeBarreUrl(event: any) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.rcbUrl = reader.result.toString();
      this.refCodeBarreStock.setValue(event.target.files[0]);
    }
  }

}
