import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { listFormatDoc, listTypeContenuMmedia, listUniteTaille } from 'src/app/shared/helpers/data.helper';
import { ContMmedia } from 'src/app/shared/model/produit-simple/cont-mmedia.model';
import { ContMmediaService } from 'src/app/shared/service/produit-simple/cont-mmedia.service';
import { GarAssurService } from 'src/app/shared/service/produit-simple/gar-assur.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-cont-mmedia',
  templateUrl: './details-cont-mmedia.component.html',
  styleUrls: ['./details-cont-mmedia.component.scss']
})
export class DetailsContMmediaComponent implements OnInit {
  tuztuz: Boolean = true
  public contMmediaForm: FormGroup;
  public cmmProductForm: FormGroup;
  public cmmGarAssurForm: FormGroup;
  public contMmediaToEdit = new FormData();
  public contMmedia = new ContMmedia();
  public imgUpdated: boolean = false;

  // Dropdown types
  listTCont: Array<string> = [];
  selectedTCont: Array<string> = [];
  dropdownTContSettings: any = {};
  closeDropdownTContSelection = false;
  disabledDropdownTCont = false;

  // Dropdown format document
  listFDoc: Array<string> = [];
  selectedFDoc: Array<string> = [];
  dropdownFDocSettings: any = {};
  closeDropdownFDocSelection = false;
  disabledDropdownFDoc = false;

  // Dropdown unité taille
  listUTaille: Array<string> = [];
  selectedUTaille: Array<string> = [];
  dropdownUTailleSettings: any = {};
  closeDropdownUTailleSelection = false;
  disabledDropdownUTaille = false;

  // Dropdown produits
  listProduits: Array<any> = [];
  selectedProduit: Array<any> = [];
  dropdownProduitSettings: any = {};
  closeDropdownProduitSelection = false;
  disabledDropdownProduit = false;

  // Dropdown garAssur
  listGarAssurs: Array<any> = [];
  selectedGarAssur: Array<any> = [];
  dropdownGarAssurSettings: any = {};
  closeDropdownGarAssurSelection = false;
  disabledDropdownGarAssur = false;

  imageUrl: string;
  sizeInOctet: number;

  constructor(
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService,
    private garAssurService: GarAssurService, private contMmediaService: ContMmediaService,
    private router: Router, private fb: FormBuilder, private toastr: ToastrService,
    public translateService: TranslateService,
    private activatedRoute: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.contMmediaService.findContMmediaById(success.id).subscribe(
          async (success) => {
            this.contMmedia = success;
            this.traduire(this.contMmedia.relation)
            this.contMmedia.relation=this.key

            this.imageUrl = environment.apiEndPoint + this.contMmedia.urlDoc

            this.createTContDropDown();
            this.createUTailleDropDown();
            this.createFDocDropDown();
            this.createContMmediaForm();

            this.createProduitDropDown();

            this.createGarAssurDropDown();

            this.getSizeInOctet()
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
        const listUrl = ['cont-mmedia/simple/list-cont-mmedia'];
        this.router.navigate(listUrl);
      })
  }
key
  traduire(item){
    this.translateService.get(item).subscribe(
      data => {
        this.key = data
        console.log('data traduire',data);

      }
    )
  }

  createContMmediaForm() {
    let x = this.contMmedia.provenanceInterne ? "Oui" : "Non";
    this.contMmediaForm = this.fb.group({
      refContenu: this.fb.control({ value: this.contMmedia.refContenu, disabled: true }, [Validators.required]),
      typeContenu: this.fb.control({ value: this.selectedTCont, disabled: true }, [Validators.required]),
      titreDoc: this.fb.control({ value: this.contMmedia.titreDoc, disabled: true }, [Validators.required]),
      formatDoc: this.fb.control({ value: this.selectedFDoc, disabled: true }, [Validators.required]),
      tailleDoc: this.fb.control({ value: this.contMmedia.tailleDoc, disabled: true }, [Validators.required]),
      uniteTaille: this.fb.control({ value: this.selectedUTaille, disabled: true }, [Validators.required]),
      urlDoc: this.fb.control({ value: this.imageUrl, disabled: true }, [Validators.required]),
      provenanceInterne: this.fb.control({ value: x, disabled: true }, [Validators.required]),
      relation: this.fb.control({ value:this.contMmedia.relation, disabled: true }, [Validators.required])
    });

  }

  createCmmProductForm() {
    this.cmmProductForm = this.fb.group({
      produitService: this.fb.control({ value: this.selectedProduit, disabled: true }, [Validators.required])
    })
  }

  createCmmGarAssurForm() {
    this.cmmGarAssurForm = this.fb.group({
      garAssur: this.fb.control({ value: this.selectedGarAssur, disabled: true }, [Validators.required])
    })
  }


  get refContenu() {
    return this.contMmediaForm.get('refContenu');
  }

  get typeContenu() {
    return this.contMmediaForm.get('typeContenu');
  }

  get titreDoc() {
    return this.contMmediaForm.get('titreDoc');
  }

  get formatDoc() {
    return this.contMmediaForm.get('formatDoc');
  }


  get tailleDoc() {
    return this.contMmediaForm.get('tailleDoc');
  }

  get uniteTaille() {
    return this.contMmediaForm.get('uniteTaille');
  }

  get urlDoc() {
    return this.contMmediaForm.get('urlDoc');
  }

  get provenanceInterne() {
    return this.contMmediaForm.get('provenanceInterne');
  }

  get relation() {
    return this.contMmediaForm.get('relation');
  }



  goToList() {
    const listUrl = ['cont-mmedia/simple/list-cont-mmedia'];
    this.router.navigate(listUrl);
  }


  createTContDropDown() {
    this.listTCont = listTypeContenuMmedia;
    this.selectedTCont = [this.contMmedia.typeContenu];
    this.dropdownTContSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownTContSelection
    };
  }

  createFDocDropDown() {
    this.listFDoc = listFormatDoc;
    this.selectedFDoc = [this.contMmedia.formatDoc];
    this.dropdownFDocSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownFDocSelection
    };
  }

  createUTailleDropDown() {
    this.listUTaille = listUniteTaille;
    this.selectedUTaille = [this.contMmedia.uniteTaille];
    this.dropdownUTailleSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownUTailleSelection
    };
  }

  createProduitDropDown() {
    // Dropdown produit
    this.psService.getAllProducts().subscribe(
      (success) => {
        this.listProduits = success.map(x => {
          let obj = { _id: '', refProduit: '' }
          obj._id = x._id;
          obj.refProduit = x.refProduit;
          return obj;
        });
        this.selectedProduit = success.filter(p => p._id === this.contMmedia.produitService).map(p => {
          let obj = { _id: '', refProduit: '' }
          obj.refProduit = p.refProduit;
          obj._id = p._id;
          return obj;
        });
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
        this.createCmmProductForm();
      },
      (error) => {
        console.log(error);
      }
    );

  }

  createGarAssurDropDown() {
    // Dropdown produit
    this.garAssurService.getAllGarAssurs().subscribe(
      (success) => {
        let obj = { _id: '', refGarAssur: '' }
        this.listGarAssurs = success.map(x => {
          obj._id = x._id;
          obj.refGarAssur = x.refGarAssur;
          return obj;
        });

        this.selectedGarAssur = success.filter(x => x._id === this.contMmedia.garAssur).map(p => {
          obj.refGarAssur = p.refGarAssur;
          obj._id = p._id;
          return obj;
        });
        this.dropdownGarAssurSettings = {
          singleSelection: true,
          idField: '_id',
          textField: 'refGarAssur',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          closeDropDownOnSelection: this.closeDropdownGarAssurSelection
        };
        this.createCmmGarAssurForm();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSizeInOctet() {
    let nTaille = 0;
    let unitSize = this.contMmedia.uniteTaille;
    let size = this.contMmedia.tailleDoc;
    switch (unitSize) {
      case "Octet (o)":
        nTaille = size;
        break;

      case "Kilo-octet (Ko)":
        nTaille = size * (1024)
        break;

      case "Mega-octet (Mo)":
        nTaille = size * (1024 * 1024)
        break;

      case "Giga-octet (Go)":
        nTaille = size * (1024 * 1024 * 1024)
        break;

      default:
        nTaille = size;
        break;
    }
    this.sizeInOctet = nTaille;
  }

  openFile(url){
    window.open(url)

  }

}
