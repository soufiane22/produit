import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AllowedDate } from 'src/app/shared/directives/allowed-date.directive';
import { listUniteDuree, listTypeGarAssur, listCurrencie } from 'src/app/shared/helpers/data.helper';
import { GarAssur } from 'src/app/shared/model/produit-simple/gar-assur.model';
import { ContMmediaService } from 'src/app/shared/service/produit-simple/cont-mmedia.service';
import { GarAssurService } from 'src/app/shared/service/produit-simple/gar-assur.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { environment } from 'src/environments/environment';
import { contMmediaHeaders} from 'src/app/shared/helpers/data.helper';
import { element } from 'protractor';
@Component({
  selector: 'app-details-gar-assur',
  templateUrl: './details-gar-assur.component.html',
  styleUrls: ['./details-gar-assur.component.scss']
})
export class DetailsGarAssurComponent implements OnInit {

  public garAssurForm: FormGroup;
  public garAssurToEdit = new FormData();

  public garAssurProductForm: FormGroup;
  public garAssurContMmediaForm: FormGroup;

  public garAssur:GarAssur;
  contMmediaHeaders = contMmediaHeaders
  listContMmedias=[]
  id_produit


  // Dropdown unité taille
  listUDG: Array<string> = [];
  selectedUDG: Array<string> = [];
  dropdownUDGSettings: any = {};
  closeDropdownUDGSelection = false;
  disabledDropdownUDG = false;

  // Dropdown type
  listTGA: Array<string> = [];
  selectedTGA: Array<string> = [];
  dropdownTGASettings: any = {};
  closeDropdownTGASelection = false;
  disabledDropdownTGA = false;

  // Dropdown monnaie
  disabledDropdownMonnaie = false;
  showFilterMonnaie = true;
  limitSelectionMonnaie = false;
  listMonnaies: Array<any> = [];
  selectedMonnaie: Array<any> = [];
  dropdownMonnaieSettings: any = {};

  // Dropdown produits
  listProduits: Array<any> = [];
  selectedProduit: Array<any> = [];
  dropdownProduitSettings: any = {};
  closeDropdownProduitSelection = false;
  disabledDropdownProduit = false;

  // Dropdown garAssur
  listContMmedia: Array<any> = [];
  selectedContMmedia: Array<any> = [];
  dropdownContMmediaSettings: any = {};
  closeDropdownContMmediaSelection = false;
  disabledDropdownGarAssur = false;

  imageUrl: string;
  imgUpdated: boolean = false;
  contrat_model_name:any
  constructor(private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private psService: ProduitSimpleService,
    private garAssurService: GarAssurService,
    private contMmediaService: ContMmediaService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public  translateService: TranslateService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit( ): void {

    this.activatedRoute.params.subscribe(
      (success) => {
        this.garAssurService.findGarAssurById(success.id).subscribe(
          async (success) => {
            this.garAssur = success;
            this.imageUrl = environment.apiEndPoint + this.garAssur.contratModel
            if(this.garAssur.contratModel){
              this.contrat_model_name = this.garAssur.contratModel.split('\\')
              this.contrat_model_name = this.contrat_model_name[2]
            }

            // console.log('contrat_model_name',this.contrat_model_name);
            console.log('garAsuur',this.garAssur);

              this.id_produit = this.garAssur.produitService?._id

            this.listContMmedias = this.garAssur.contenuMmedia
            this.listContMmedias.forEach(element => {
              this.traduire(element.relation)
              element.relation = this.key
              element.urlDoc =  environment.apiEndPoint + element.urlDoc
              // console.log('urlDoc',element.urlDoc )

            })

            this.createUDGDropDown();
            this.createTGADropDown();
            this.createMonnaieDropDown();
            this.createGarAssurForm();
            this.createProduitDropDown();
            this.createContMmediaDropDown();

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

  key
  traduire(item){
    this.translateService.get(item).subscribe(
      data => {
        this.key = data

      }
    )
  }

  createGarAssurForm() {
    this.garAssurForm = this.fb.group({
      refGarAssur:this.fb.control({value:this.garAssur.refGarAssur, disabled:true}, [Validators.required]),
      typeGarAssur: this.fb.control({value:this.selectedTGA, disabled:true}, [Validators.required]),
      valid_de: this.fb.control({value:this.garAssur.valid_de, disabled:true}, [Validators.required, AllowedDate]),
      duree: this.fb.control({value:this.garAssur.duree, disabled:true}, [Validators.required]),
      uniteDureeGar: this.fb.control({value:this.selectedUDG, disabled:true}, [Validators.required]),
      valeurGar: this.fb.control({value:this.garAssur.valeurGar, disabled:true}, [Validators.required]),
      monnaie: this.fb.control({value:this.selectedMonnaie, disabled:true}, [Validators.required]),
      __descriptif: this.fb.control({value:this.garAssur['translations'][0].__descriptif , disabled:true}, [Validators.required]),
      contratModel: this.fb.control({value:this.garAssur.contratModel, disabled:true}, [Validators.required]),

    });
  }
  createGarAssurProductForm() {
    this.garAssurProductForm = this.fb.group({
      produitService: this.fb.control({ value: this.garAssur.produitService['translations'][0].__designation, disabled: true }, [Validators.required])
    })
  }

  createGarAssurGarAssurForm() {
    this.garAssurContMmediaForm = this.fb.group({
      contenuMmedia: this.fb.control({ value: this.selectedContMmedia, disabled: true }, [Validators.required])
    })
  }

  get getMonnaies() {
    return this.listMonnaies.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  get typeGarAssur() {
    return this.garAssurForm.get('typeGarAssur');
  }

  get valid_de() {
    return this.garAssurForm.get('valid_de');
  }

  get duree() {
    return this.garAssurForm.get('duree');
  }

  get uniteDureeGar() {
    return this.garAssurForm.get('uniteDureeGar');
  }


  get valeurGar() {
    return this.garAssurForm.get('valeurGar');
  }

  get monnaie() {
    return this.garAssurForm.get('monnaie');
  }

  get __descriptif() {
    return this.garAssurForm.get('__descriptif');
  }

  get contratModel() {
    return this.garAssurForm.get('contratModel');
  }

  get refGarAssur() {
    return this.garAssurForm.get('refGarAssur');
  }

  get produitService() {
      return this.garAssurProductForm.get('produitService');

  }

  get contenuMmedia() {
    return this.garAssurContMmediaForm.get('contenuMmedia');
  }
  clearValues() {
    this.garAssurForm.reset();
    this.garAssur.contenuMmedia;
    this.imageUrl = environment.apiEndPoint + this.garAssur.contratModel
    this.__descriptif.setValue(this.garAssur['translations'][0].__descriptif);
    this.duree.setValue(this.garAssur.duree);
    this.monnaie.setValue(this.selectedMonnaie);
    this.produitService.setValue(this.selectedProduit);
    this.refGarAssur.setValue(this.garAssur.refGarAssur);
    this.typeGarAssur.setValue(this.selectedTGA);
    this.uniteDureeGar.setValue(this.selectedUDG);
    this.valeurGar.setValue(this.garAssur.valeurGar);
    this.valid_de.setValue(this.garAssur.valid_de);
  }

  go_to_product(){
console.log('id_product',this.id_produit);

 const link = ['gestion-produits/simple/details-produit/', this.id_produit]
 this.router.navigate(link)
  }

  createUDGDropDown() {
    this.listUDG = listUniteDuree;
    this.selectedUDG = [this.garAssur.uniteDureeGar];
    this.dropdownUDGSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownUDGSelection
    };
  }
  createTGADropDown() {
    this.listTGA = listTypeGarAssur;
    this.selectedTGA = [this.garAssur.typeGarAssur];
    this.dropdownTGASettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownTGASelection
    };
  }
  createMonnaieDropDown() {
    this.listMonnaies = listCurrencie;
    this.selectedMonnaie = this.listMonnaies.filter(x => this.garAssur.monnaie === x.item_text);
    this.dropdownMonnaieSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: this.showFilterMonnaie
    };
  }
  createProduitDropDown() {
    // Dropdown produit
    this.psService.getAllProducts().subscribe(
      (success) => {
        this.listProduits = success.map(x => {
          let obj = {_id: '', refProduit: '' }
          obj._id = x._id;
          obj.refProduit = x.refProduit;
          return obj;
        });
        this.selectedProduit = this.listProduits.filter(p => p._id === this.garAssur.produitService);

        this.dropdownProduitSettings = {
          singleSelection: true,
          idField: '_id',
          textField: 'refProduit',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          closeDropDownOnSelection: this.closeDropdownProduitSelection
        };
        this.createGarAssurProductForm();
      },
      (error) => {
        console.log(error);
      }
    );

  }
  createContMmediaDropDown() {
    // Dropdown produit
    this.contMmediaService.getAllContMmedias().subscribe(
      (success) => {
        let obj = { _id: '', refContenu: '' }
        this.listContMmedia = success.map(x => {
          obj._id = x._id;
          obj.refContenu = x.refContenu;
          return obj;
        });

        this.selectedContMmedia = success.filter(x => this.garAssur.contenuMmedia.includes(x._id)).map(p => {
          obj.refContenu = p.refContenu;
          obj._id = p._id;
          return obj;
        });
        this.dropdownContMmediaSettings = {
          singleSelection: true,
          idField: '_id',
          textField: 'refContenu',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          closeDropDownOnSelection: this.closeDropdownContMmediaSelection
        };
        this.createGarAssurGarAssurForm();
      },
      (error) => {
        console.log(error);
      }
    );
  }


  getValues() {
    this.garAssurToEdit.append('refGarAssur',this.refGarAssur.value);
    if (this.imgUpdated) {
      this.garAssurToEdit.append('contratModel', this.contratModel.value);
    } else {
      this.garAssurToEdit.append('contratModel', this.garAssur.contratModel);
    }
    this.garAssurToEdit.append('__descriptif',this.__descriptif.value);
    this.garAssurToEdit.append('duree',this.duree.value);
    this.garAssurToEdit.append('monnaie',this.monnaie.value.map(m=>m.item_text)[0]);
    this.garAssurToEdit.append('typeGarAssur',this.typeGarAssur.value[0]);
    this.garAssurToEdit.append('uniteDureeGar',this.uniteDureeGar.value[0]);
    this.garAssurToEdit.append('valeurGar',this.valeurGar.value);
    this.garAssurToEdit.append('valid_de',this.valid_de.value);

  }


    // Inbuilt
    readUrl(event: any) {
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
        this.imageUrl = reader.result.toString();
        this.contratModel.setValue(event.target.files[0]);
        this.imgUpdated = true;
      }
    }
    return(){
      const link=['gar-assur/simple/list-gar-assur']
      this.router.navigate(link)
    }


    openFile(url){
      window.open(url)

    }


}
