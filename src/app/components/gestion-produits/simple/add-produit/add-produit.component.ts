import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { lessThanValidator } from 'src/app/shared/directives/less-than.directive';
import { DirtyComponent } from 'src/app/shared/guards/dirty-check.guard';
import { Observable } from 'rxjs';
import { generateReference } from 'src/app/shared/helpers/functions.helper';
import { listAffichageTarif, listEtatPublication, listPays, listTagProduit, listTypeProduit, listTypeTarif, listTypeVente, listUniteProduit } from 'src/app/shared/helpers/data.helper';


@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent implements OnInit, DirtyComponent {
  public produitToAdd: FormData = new FormData();
  public isDirty: boolean = false;
  public productForm: FormGroup;
  public productImgs = ["", "", "", "", ""];
  public url = [{
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  }
  ]
  public urlToShow = "assets/images/user.png";
  public urlCB = {
    img: "assets/images/user.png",
  };

  public urlQR = {
    img: "assets/images/user.png",
  };
  // Dropdown pays
  disabledDropdownPays = false;
  showFilterPays = true;
  limitSelectionPays = false;
  listPays: Array<any> = [];
  selectedPays: Array<any> = [];
  dropdownPaysSettings: any = {};

  // Dropdown Made In
  disabledDropdownMI = false;
  showFilterMI = true;
  limitSelectionMI = false;
  listMI: Array<any> = [];
  selectedMI: Array<any> = [];
  dropdownMISettings: any = {};

  // Dropdown type produit
  listTP: Array<string> = [];
  selectedTP: Array<string> = [];
  dropdownTPSettings: any = {};
  closeDropdownTPSelection = false;
  disabledDropdownTP = false;

  // Dropdown type vente
  listTV: Array<string> = [];
  selectedTV: Array<string> = [];
  dropdownTVSettings: any = {};
  closeDropdownTVSelection = false;
  disabledDropdownTV = false;

  // Dropdown unité produit
  listUP: Array<string> = [];
  selectedUP: Array<string> = [];
  dropdownUPSettings: any = {};
  closeDropdownUPSelection = false;
  disabledDropdownUP = false;

  // Dropdown type tarif
  listTT: Array<string> = [];
  selectedTT: Array<string> = [];
  dropdownTTSettings: any = {};
  closeDropdownTTSelection = false;
  disabledDropdownTT = false;

  // Dropdown etat publication
  listEP: Array<string> = [];
  selectedEP: Array<string> = [];
  dropdownEPSettings: any = {};
  closeDropdownEPSelection = false;
  disabledDropdownEP = false;

  // Dropdown Tag
  listTag: Array<string> = [];
  selectedTag: Array<string> = [];
  dropdownTagSettings: any = {};
  closeDropdownTagSelection = false;
  disabledDropdownTag = false;

  listAT = listAffichageTarif;
  listTypeProduit: string[];
  lang:any;
  
  constructor(private fb: FormBuilder, private psService: ProduitSimpleService,
    private toastr: ToastrService, private router: Router) {

    this.createPaysDropDown();
    this.createTPDropdown();
    this.createTVDropdown();
    this.createUPDropdown();
    this.createTTDropdown();
    this.createEPDropdown();
    this.createMIDropDown();
    this.createTagDropdown();
    this.createProductForm();
    this.refProduit.setValue(generateReference('ProdServ'));
    this.lang=localStorage.getItem('code');
  }
  canDeactivate(): boolean | Observable<boolean> {
    return this.isDirty;
  }
  createTPDropdown() {
    this.listTP = listTypeProduit;
    this.selectedTP = [];
    this.dropdownTPSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownTPSelection
    };
  }

  createTVDropdown() {
    this.listTV = listTypeVente;
    this.selectedTV = [];
    this.dropdownTVSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownTVSelection
    };
  }

  createTTDropdown() {
    this.listTT = listTypeTarif;
    this.selectedTT = [];
    this.dropdownTTSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownTTSelection
    };
  }

  createUPDropdown() {
    this.listUP = listUniteProduit;
    this.selectedUP = [];
    this.dropdownUPSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownUPSelection
    };
  }

  createEPDropdown() {
    this.listEP = listEtatPublication;
    this.selectedEP = [];
    this.dropdownEPSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownEPSelection
    };
  }


  createPaysDropDown() {
    this.listPays = listPays;
    this.selectedPays = []
    this.dropdownPaysSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: this.showFilterPays
    };
  }

  createTagDropdown() {
    this.listTag = listTagProduit;
    this.selectedTag = [];
    this.dropdownTagSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownTagSelection
    };
  }

  createMIDropDown() {
    this.listMI = listPays;
    this.selectedMI = [];
    this.dropdownMISettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: this.showFilterMI
    };
  }

  createProductForm() {
    this.productForm = this.fb.group({
      refProduit: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      refCB: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      refQR: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      typePS: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      nouveau: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      designation: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      slogan: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      madeIn: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      descriptif: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      resumeDescriptif: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      imgPD: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      tag: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      virtuel: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      telechargeable: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      urlExterne: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      msgBtnComExterne: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      affPublique: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      affTarif: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      venteSeule: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      typeVente: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      minCommande: this.fb.control({ value: 1, disabled: false }, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      maxCommande: this.fb.control({ value: 2, disabled: false }, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      uniteProduit: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      typeTarif: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      tarifUHT: this.fb.control({ value: '', disabled: false }, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      tVA: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      pays: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      tarVarParSaison: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      tarVarParZoneGeo: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      tarVarParDsbtr: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      tarVarParVrte: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      tarVarParQte: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      notation: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      affAvis: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      etatPub: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      msgAchat: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      ordreAff: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      gestStock: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      indEtatStock: this.fb.control({ value: '', disabled: false }, [Validators.required]),
    }, { validators: lessThanValidator })

  }
  get refProduit() {
    return this.productForm.get('refProduit');
  }

  get refCB() {
    return this.productForm.get('refCB');
  }

  get refQR() {
    return this.productForm.get('refQR');
  }

  get typePS() {
    return this.productForm.get('typePS');
  }

  get nouveau() {
    return this.productForm.get('nouveau');
  }

  get designation() {
    return this.productForm.get('designation');
  }

  get slogan() {
    return this.productForm.get('slogan');
  }

  get madeIn() {
    return this.productForm.get('madeIn');
  }

  get descriptif() {
    return this.productForm.get('descriptif');
  }

  get resumeDescriptif() {
    return this.productForm.get('resumeDescriptif');
  }

  get imgPD() {
    return this.productForm.get('imgPD');
  }

  get tag() {
    return this.productForm.get('tag');
  }

  get virtuel() {
    return this.productForm.get('virtuel');
  }

  get telechargeable() {
    return this.productForm.get('telechargeable');
  }

  get urlExterne() {
    return this.productForm.get('urlExterne');
  }

  get msgBtnComExterne() {
    return this.productForm.get('msgBtnComExterne');
  }

  get affPublique() {
    return this.productForm.get('affPublique');
  }

  get affTarif() {
    return this.productForm.get('affTarif');
  }

  get venteSeule() {
    return this.productForm.get('venteSeule');
  }

  get typeVente() {
    return this.productForm.get('typeVente');
  }

  get uniteProduit() {
    return this.productForm.get('uniteProduit');
  }

  get minCommande() {
    return this.productForm.get('minCommande');
  }

  get maxCommande() {
    return this.productForm.get('maxCommande');
  }

  get typeTarif() {
    return this.productForm.get('typeTarif');
  }

  get tarifUHT() {
    return this.productForm.get('tarifUHT');
  }

  get tVA() {
    return this.productForm.get('tVA');
  }

  get pays() {
    return this.productForm.get('pays');
  }

  get tarVarParSaison() {
    return this.productForm.get('tarVarParSaison');
  }

  get tarVarParZoneGeo() {
    return this.productForm.get('tarVarParZoneGeo');
  }

  get tarVarParDsbtr() {
    return this.productForm.get('tarVarParDsbtr');
  }

  get tarVarParVrte() {
    return this.productForm.get('tarVarParVrte');
  }

  get tarVarParQte() {
    return this.productForm.get('tarVarParQte');
  }

  get notation() {
    return this.productForm.get('notation');
  }

  get affAvis() {
    return this.productForm.get('affAvis');
  }

  get etatPub() {
    return this.productForm.get('etatPub');
  }

  get msgAchat() {
    return this.productForm.get('msgAchat');
  }

  get ordreAff() {
    return this.productForm.get('ordreAff');
  }

  get gestStock() {
    return this.productForm.get('gestStock');
  }

  get indEtatStock() {
    return this.productForm.get('indEtatStock');
  }

  increment(type: string) {
    if (type === 'min') {
      this.minCommande.setValue(this.minCommande.value - 1);
    } else {
      this.maxCommande.setValue(this.maxCommande.value + 1);
    }
  }

  decrement(type: string) {
    if (type === 'min') {
      this.minCommande.setValue(this.minCommande.value - 1);
    } else {
      this.maxCommande.setValue(this.maxCommande.value + 1);
    }
  }
  test = ''
  //FileUpload
  readUrl(event: any, i) {
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
      this.url[i].img = reader.result.toString();
      this.urlToShow = this.url[i].img;
      this.productImgs[i] = event.target.files[0]
      this.imgPD.setValue(this.productImgs);
    }
  }

  readUrlCB(event: any) {
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
      this.urlCB.img = reader.result.toString();
      this.refCB.setValue(event.target.files[0]);
    }
  }
  readUrlQR(event: any) {
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
      this.urlQR.img = reader.result.toString();
      this.refQR.setValue(event.target.files[0]);
    }
  }
  ngOnInit(): void {
    this.productForm.valueChanges.subscribe(e => this.isDirty = true);
  }

  addProduit() {
    if (this.productForm.valid) {
      this.getValues();
      this.psService.addProduct(this.produitToAdd).subscribe(
        (success) => {
          this.toastr.success("L'opération a réussi", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          this.isDirty = false;
          setTimeout(() => {
            const url = ["/gestion-produits/simple/list-produits"]
            this.router.navigate(url)
          }, 1500);
        },
        (error) => {
          console.log(error);
          this.toastr.error("L'opération a échoué", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      );
    } else {
      this.toastr.error("Merci de bien remplir tous les champs du formulaire", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }

  }

  getValues() {
    this.produitToAdd.append('refProduit', this.refProduit.value);
    this.produitToAdd.append('language', this.lang);
    this.produitToAdd.append('refCB', this.refCB.value);
    this.produitToAdd.append('refQR', this.refQR.value);
    this.produitToAdd.append('typePS', this.typePS.value[0]);
    let nv = new Boolean(this.nouveau.value == "Oui");
    this.produitToAdd.append('nouveau', nv.toString());
    this.produitToAdd.append('__designation', this.designation.value);
    this.produitToAdd.append('slogan', this.slogan.value);
    this.produitToAdd.append('madeIn', this.madeIn.value.map(v => v.item_text)[0]);
    this.produitToAdd.append('__descriptif', this.descriptif.value);
    this.produitToAdd.append('__resumeDescriptif', this.resumeDescriptif.value);
    
    // Array of image
    this.imgPD.value.forEach((e: File, i: number) => {
      if (e) {
        this.produitToAdd.append('imgPD' + i, e);
      }
    });
    this.tag.value.forEach(x => {
      this.produitToAdd.append('__producttag', x);
      console.log('value   ',x);

    });
    // multi select
    //this.produitToAdd.append('__producttag', JSON.stringify(this.tag));


    let vr = new Boolean(this.virtuel.value == "Oui");
    this.produitToAdd.append('virtuel', vr.toString());

    let tl = new Boolean(this.telechargeable.value == "Oui");
    this.produitToAdd.append('telechargeable', tl.toString());

    this.produitToAdd.append('urlExterne', this.urlExterne.value);
    this.produitToAdd.append('__msgBtnComExterne', this.msgBtnComExterne.value);

    let ap = new Boolean(this.affPublique.value == "Oui");
    this.produitToAdd.append('affPublique', ap.toString());

    this.produitToAdd.append('affTarif', this.affTarif.value);

    let vs = new Boolean(this.venteSeule.value == "Oui");
    this.produitToAdd.append('venteSeule', vs.toString());

    this.produitToAdd.append('typeVente', this.typeVente.value[0]);
    this.produitToAdd.append('uniteProduit', this.uniteProduit.value[0]);
    this.produitToAdd.append('minCommande', this.minCommande.value);
    this.produitToAdd.append('maxCommande', this.maxCommande.value);
    this.produitToAdd.append('typeTarif', this.typeTarif.value[0]);
    this.produitToAdd.append('tarifUHT', this.tarifUHT.value);
    this.produitToAdd.append('tVA', this.tVA.value);
    this.produitToAdd.append('pays', this.pays.value.map(v => v.item_text)[0]);

    let tvs = new Boolean(this.tarVarParSaison.value == "Oui");
    this.produitToAdd.append('tarVarParSaison', tvs.toString());

    let tvzg = new Boolean(this.tarVarParZoneGeo.value == "Oui");
    this.produitToAdd.append('tarVarParZoneGeo', tvzg.toString());

    let tvd = new Boolean(this.tarVarParDsbtr.value == "Oui");
    this.produitToAdd.append('tarVarParDsbtr', tvd.toString());

    let tvv = new Boolean(this.tarVarParVrte.value == "Oui");
    this.produitToAdd.append('tarVarParVrte', tvv.toString());

    let tvq = new Boolean(this.tarVarParQte.value == "Oui");
    this.produitToAdd.append('tarVarParQte', tvq.toString());

    this.produitToAdd.append('notation', this.notation.value);

    let aa = new Boolean(this.affAvis.value == "Oui");
    this.produitToAdd.append('affAvis', aa.toString());

    this.produitToAdd.append('etatPub', this.etatPub.value[0]);
    this.produitToAdd.append('__msgAchat', this.msgAchat.value);
    this.produitToAdd.append('ordreAff', this.ordreAff.value);

    let gs = new Boolean(this.gestStock.value == "Oui");
    this.produitToAdd.append('gestStock', gs.toString());

    let ies = new Boolean(this.indEtatStock.value == "Oui");
    this.produitToAdd.append('indEtatStock', ies.toString());
  }

  resetForm() {
    this.productForm.reset();
  }


  get getPays() {
    return this.listPays.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  get getMI() {
    return this.listMI.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }
}
