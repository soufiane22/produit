import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProduitSimple } from 'src/app/shared/model/produit-simple/produit-simple.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TarifSaisonnierService } from 'src/app/shared/service/produit-simple/tarif-saisonnier.service';
import { GrilleTarifaireService } from 'src/app/shared/service/produit-simple/grille-tarifaire.service';
import { TarifUnitVarService } from 'src/app/shared/service/produit-simple/tarif-unitaire-variable.service';
import { DistinctionService } from 'src/app/shared/service/produit-simple/distinction.service';
import { MonteeEnGammeService } from 'src/app/shared/service/produit-simple/montee-en-gamme.service';
import { CritereCalculableService } from 'src/app/shared/service/produit-simple/critere-calculable.service';
import { InstCaracteristiqueService } from 'src/app/shared/service/produit-simple/inst-caracteristique.service';
import { InstClassificationService } from 'src/app/shared/service/produit-simple/inst-classification.service';
import { AnnotationService } from 'src/app/shared/service/produit-simple/annotation.service';
import { lessThanValidator } from 'src/app/shared/directives/less-than.directive';
import { annoHeaders, critCalcHeaders, distinctionHeaders, grilleHeaders, indFraisAddHeaders, indPromoHeaders, instCaractHeaders, instCaractHeadersV2, instClassifHeaders, instClassifHeadersV2, listAffichageTarif, listEtatPublication, listPays, listTagProduit, listTypeProduit, listTypeTarif, listTypeVente, listUniteProduit, megHeaders, tarifSaisonnierHeaders, tuvHeaders } from 'src/app/shared/helpers/data.helper';
import { IndFraisAdd } from 'src/app/shared/model/produit-simple/ind-frais-add.model';
import { IndPromo } from 'src/app/shared/model/produit-simple/ind-promo.model';
import { ProductService } from 'src/app/shared/service/pricing-rule/product.service';
import { InstClassif } from 'src/app/shared/model/produit-simple/inst-classif.model';
import { ClassificationService } from 'src/app/shared/service/taxonomie-classification/classification.service';
import { Classification } from 'src/app/shared/model/taxonomie-classification/classification.model';
import { Caracteristique } from 'src/app/shared/model/taxonomie-classification/caracteristique.model';
import { CaracteristiqueService } from 'src/app/shared/service/taxonomie-caracteristique/caracteristique.service';

import { Expedition } from 'src/app/shared/model/produit-simple/expedition.model';
import { ExpeditionService } from 'src/app/shared/service/produit-simple/expedition.service';
import { listClasseLivraison } from 'src/app/shared/helpers/data.helper';
import { listUniteDimension } from 'src/app/shared/helpers/data.helper';
import { listUnitePoids } from 'src/app/shared/helpers/data.helper';
import { generateReference } from 'src/app/shared/helpers/functions.helper';


@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.scss']
})

export class EditProduitComponent implements OnInit {
  public expeditionForm: FormGroup;
  public expeditionProduitForm: FormGroup;
  public expeditionToEdit = new Expedition();
  public expeditionProduit: any;

  // Dropdown produits
  listProduits: Array<string> = [];
  selectedProduit: Array<string> = [];
  dropdownProduitSettings: any = {};
  closeDropdownProduitSelection = false;
  disabledDropdownProduit = false;

  public produitToEdit: FormData = new FormData();
  public product: ProduitSimple;
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
  public productImgUpdated = [false, false, false, false, false];
  public urlToShow = "assets/images/user.png";
  public urlCB = {
    img: "assets/images/user.png",
  };
  public cbImgUpdated = false;
  public urlQR = {
    img: "assets/images/user.png",
  };
  public qrImgUpdated = false;
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
  public listTarifSaisonniers: Array<any>;
  public listGrillesTarifaires: Array<any>;
  public listTarifsUnitairesVariables: Array<any>;
  public listDistinctions: Array<any>;
  public listMonteeEnGammes: Array<any>;
  public listInstClassifications: Array<any>;
  public listInstCaracteristiques: Array<any>;
  public listAnnotations: Array<any>;
  public listCritereCalculables: Array<any>;
  public listIndFraisAdd: Array<IndFraisAdd>;
  public listIndPromo: Array<IndPromo>;

  public notAffectedInstanceCaracteristiques: Array<Caracteristique> = [];
  public notAffectedInstanceClassifications: Array<Classification> = [];

  public itemToRemoveFromList: string;
  public closeResult: string;
  public tsHeaders: Array<string>;
  public tuvHeaders: Array<string>;
  public gtHeaders: Array<string>;
  public distinctionHeaders: Array<String>;
  public monteeEnGammeHeaders: Array<String>;
  public instCaracteristiqueHeaders: Array<String>;
  public instCaracteristiqueHeadersV2: Array<String>;
  public instClassificationHeaders: Array<String>;
  public instClassificationHeadersV2: Array<String>;
  public annotationsHeaders: Array<String>;
  public criteresCalculablesHeaders: Array<String>;
  public indFraisAddHeaders: Array<string>;
  public indPromoHeaders: Array<string>;
  listAffichageTarif: any;
  listTypeProduit: string[];
  listTypeVente: string[];
  listTypeTarif: string[];
  listUniteProduit: string[];
  listEtatPublication: string[];
  listTagProduit: string[];
  
  lang:any;

  constructor(private caracteristiqueService: CaracteristiqueService, private expService: ExpeditionService, private classificationService: ClassificationService, private pricingRuleProductService: ProductService, private distService: DistinctionService, private megService: MonteeEnGammeService, private critCalcService: CritereCalculableService, private instCaractService: InstCaracteristiqueService
    , private gtService: GrilleTarifaireService, private tuvService: TarifUnitVarService, private modalService: NgbModal, private fb: FormBuilder, private instClassifService: InstClassificationService,
    private activatedRoute: ActivatedRoute, private produitService: ProduitSimpleService, private tsService: TarifSaisonnierService, private toastr: ToastrService, private router: Router, private annotationService: AnnotationService) {


    this.setTablesHeaders();
    this.lang=localStorage.getItem('code');

  }

  setTablesHeaders() {
    this.tsHeaders = tarifSaisonnierHeaders;
    this.gtHeaders = grilleHeaders;
    this.tuvHeaders = tuvHeaders;
    this.distinctionHeaders = distinctionHeaders;
    this.annotationsHeaders = annoHeaders;
    this.monteeEnGammeHeaders = megHeaders;
    this.criteresCalculablesHeaders = critCalcHeaders;
    this.instCaracteristiqueHeadersV2 = instCaractHeadersV2;
    this.instClassificationHeaders = instClassifHeaders;
    this.instClassificationHeadersV2 = instClassifHeadersV2;
    this.instCaracteristiqueHeaders = instCaractHeaders;
    this.indFraisAddHeaders = indFraisAddHeaders;
    this.indPromoHeaders = indPromoHeaders;
  }

  createTPDropdown() {
    this.listTP = listTypeProduit;
    this.selectedTP = [this.product.typePS];
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
    this.selectedTV = [this.product.typeVente];
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
    this.selectedTT = [this.product.typeTarif];
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
    this.selectedUP = [this.product.uniteProduit];
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
    this.selectedEP = [this.product.etatPub];
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
    this.selectedPays = this.listPays.filter(x => x.item_text === this.product.pays);
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
    this.selectedTag = this.product['translations'][0].__producttag;
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
    this.selectedMI = this.listMI.filter(x => x.item_text === this.product.madeIn)
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
      __designation: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      slogan: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      madeIn: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      __descriptif: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      __resumeDescriptif: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      imgPD: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      __producttag: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      virtuel: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      telechargeable: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      urlExterne: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      __msgBtnComExterne: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      affPublique: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      affTarif: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      venteSeule: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      typeVente: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      minCommande: this.fb.control({ value: '', disabled: false }, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      maxCommande: this.fb.control({ value: '', disabled: false }, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
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
      __msgAchat: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      ordreAff: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      gestStock: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      indEtatStock: this.fb.control({ value: '', disabled: false }, [Validators.required]),
    }, { validators: lessThanValidator })

  }
  atrAnnotation: any;
  atrDistinction: any;
  produitid: any;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.produitid = success.id;
      }, (error) => {
        console.log(error);
        const listUrl = ['gestion-produits/simple/list-produit'];
        this.router.navigate(listUrl);
      });
    this.expService.getExpeditionByproduit(this.produitid).subscribe(
      (success) => {
        this.expeditionToEdit = success;
        this.createexpeditionForm0();

        if (this.expeditionToEdit == null) {
          this.expeditionToEdit = new Expedition();
          this.expeditionToEdit.produitService = this.produitid;
          this.refExp.setValue(generateReference('Exp'));
        } else {
          this.createexpeditionForm();
        }
        this.createUniteDimensionDropdown();
        this.createUnitePoidsDropdown();
        this.createClasseLivraisonDropdown();

      },
      (error) => {
        console.log(error);
      },

    )

    this.atrDistinction = [
      { field: 'typeD', header: 'Type', width: '6rem' },
      { field: '__designation', header: '__designation', width: '12rem' },
      { field: 'dateObtention', header: 'Date Obtention', width: '10rem' },
      { field: 'duree', header: 'Durée', width: '7rem' },
      { field: 'uniteDuree', header: 'Unité Durée', width: '9rem' }
    ];
    this.atrAnnotation = [
      { field: 'date', header: 'Date' },
      { field: 'email', header: 'Email' },
      { field: 'commentaire', header: 'Commentaire' },
      { field: 'note', header: 'Note' }
    ];
    this.activatedRoute.params.subscribe(
      (success) => {
        this.produitService.findProductById(success.id).subscribe(
          (success) => {
            this.product = success;
            console.log('success   :',this.product['translations'][0].__designation)
            this.createPaysDropDown();
            this.createTPDropdown();
            this.createTVDropdown();
            this.createUPDropdown();
            this.createTTDropdown();
            this.createEPDropdown();
            this.createMIDropDown();
            this.createTagDropdown();
            this.createProductForm();
            this.resetAllValues();
            this.listAnnotations = this.product.annotations;
            this.listCritereCalculables = this.product.criteresCalculables;
            this.listDistinctions = this.product.distinction.map(x => {
              x.logo = environment.apiEndPoint + x.logo;
              return x;
            });
            this.listGrillesTarifaires = this.product.grilleTarifaire;
            this.listInstCaracteristiques = this.product.instCaracterists;
            this.listInstClassifications = this.product.instClassifs;
            this.listMonteeEnGammes = this.product.monteeEnGamme.map(x => {
              x.iconeSymbol = environment.apiEndPoint + x.iconeSymbol;
              return x;
            });
            this.listTarifSaisonniers = this.product.tarifSaisonnier;
            this.listTarifsUnitairesVariables = this.product.tarifUV;
            this.listIndFraisAdd = this.product.indicationFraisAdd;
            this.listIndPromo = this.product.indicationPromo;
            this.getNotAffectedInstClassification();
            this.getNotAffectedInstCaracteristique();
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    )


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

  get __designation() {
    return this.productForm.get('__designation');
  }

  get slogan() {
    return this.productForm.get('slogan');
  }

  get madeIn() {
    return this.productForm.get('madeIn');
  }

  get __descriptif() {
    return this.productForm.get('__descriptif');
  }

  get __resumeDescriptif() {
    return this.productForm.get('__resumeDescriptif');
  }

  get imgPD() {
    return this.productForm.get('imgPD');
  }

  get __producttag() {
    return this.productForm.get('__producttag');
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

  get __msgBtnComExterne() {
    return this.productForm.get('__msgBtnComExterne');
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

  get __msgAchat() {
    return this.productForm.get('__msgAchat');
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
      this.productImgUpdated[i] = true;
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
      this.cbImgUpdated = true;
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
      this.qrImgUpdated = true;
    }
  }

  getValues() {
    this.produitToEdit.append('refProduit', this.refProduit.value);
    this.produitToEdit.append('language', this.lang);
    if (this.cbImgUpdated) {
      this.produitToEdit.append('refCB', this.refCB.value);
    } else {
      this.produitToEdit.append('refCB', this.product.refCB);
    }

    if (this.qrImgUpdated) {
      this.produitToEdit.append('refQR', this.refQR.value);
    } else {
      this.produitToEdit.append('refQR', this.product.refQR);
    }

    this.produitToEdit.append('typePS', this.typePS.value[0]);
    let nv = new Boolean(this.nouveau.value == "Oui");
    this.produitToEdit.append('nouveau', nv.toString());
    this.produitToEdit.append('__designation', this.__designation.value);
    this.produitToEdit.append('slogan', this.slogan.value);
    this.produitToEdit.append('madeIn', this.madeIn.value.map(v => v.item_text)[0]);
    this.produitToEdit.append('__descriptif', this.__descriptif.value);
    this.produitToEdit.append('__resumeDescriptif', this.__resumeDescriptif.value);
    // Array of image
    this.imgPD.value.forEach((e: File, i: number) => {
      if (this.productImgUpdated[i]) {
        if (e) {
          this.produitToEdit.append('imgPD' + i, e);
          this.produitToEdit.append('imgPD', '');
        }
      } else {
        this.produitToEdit.append('imgPD', this.product.imgPD[i]);
      }

    });
    // multi select
    this.__producttag.value.forEach(x => {
      this.produitToEdit.append('__producttag', x);
    });

    let vr = new Boolean(this.virtuel.value == "Oui");
    this.produitToEdit.append('virtuel', vr.toString());

    let tl = new Boolean(this.telechargeable.value == "Oui");
    this.produitToEdit.append('telechargeable', tl.toString());

    this.produitToEdit.append('urlExterne', this.urlExterne.value);
    this.produitToEdit.append('__msgBtnComExterne', this.__msgBtnComExterne.value);

    let ap = new Boolean(this.affPublique.value == "Oui");
    this.produitToEdit.append('affPublique', ap.toString());

    this.produitToEdit.append('affTarif', this.affTarif.value);

    let vs = new Boolean(this.venteSeule.value == "Oui");
    this.produitToEdit.append('venteSeule', vs.toString());

    this.produitToEdit.append('typeVente', this.typeVente.value[0]);
    this.produitToEdit.append('uniteProduit', this.uniteProduit.value[0]);
    this.produitToEdit.append('minCommande', this.minCommande.value);
    this.produitToEdit.append('maxCommande', this.maxCommande.value);
    this.produitToEdit.append('typeTarif', this.typeTarif.value[0]);
    this.produitToEdit.append('tarifUHT', this.tarifUHT.value);
    this.produitToEdit.append('tVA', this.tVA.value);
    this.produitToEdit.append('pays', this.pays.value.map(v => v.item_text)[0]);

    let tvs = new Boolean(this.tarVarParSaison.value == "Oui");
    this.produitToEdit.append('tarVarParSaison', tvs.toString());

    let tvzg = new Boolean(this.tarVarParZoneGeo.value == "Oui");
    this.produitToEdit.append('tarVarParZoneGeo', tvzg.toString());

    let tvd = new Boolean(this.tarVarParDsbtr.value == "Oui");
    this.produitToEdit.append('tarVarParDsbtr', tvd.toString());

    let tvv = new Boolean(this.tarVarParVrte.value == "Oui");
    this.produitToEdit.append('tarVarParVrte', tvv.toString());

    let tvq = new Boolean(this.tarVarParQte.value == "Oui");
    this.produitToEdit.append('tarVarParQte', tvq.toString());

    this.produitToEdit.append('notation', this.notation.value);

    let aa = new Boolean(this.affAvis.value == "Oui");
    this.produitToEdit.append('affAvis', aa.toString());

    this.produitToEdit.append('etatPub', this.etatPub.value[0]);
    this.produitToEdit.append('__msgAchat', this.__msgAchat.value);
    this.produitToEdit.append('ordreAff', this.ordreAff.value);

    let gs = new Boolean(this.gestStock.value == "Oui");
    this.produitToEdit.append('gestStock', gs.toString());

    let ies = new Boolean(this.indEtatStock.value == "Oui");
    this.produitToEdit.append('indEtatStock', ies.toString());
  }



  get getMI() {
    return this.listMI.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  getProductImages() {
    this.product.imgPD.forEach((e, i) => {
      if (e) {
        this.url[i] = { img: environment.apiEndPoint + e };
      }
    })
    this.urlToShow = this.url[0].img;
    this.imgPD.setValue(this.product.imgPD);
  }

  getCBImage() {
    let cb = this.product.refCB
    if (cb) {
      this.urlCB.img = environment.apiEndPoint + cb;
    }
    this.refCB.setValue(cb);

  }

  getQRImage() {
    let qr = this.product.refQR
    if (qr) {
      this.urlQR.img = environment.apiEndPoint + qr;
    }
    this.refQR.setValue(qr);
  }

  resetAllValues() {
    let nv = this.product.nouveau ? "Oui" : "Non";
    let vt = this.product.virtuel ? "Oui" : "Non";
    let tele = this.product.telechargeable ? "Oui" : "Non";
    let ap = this.product.affPublique ? "Oui" : "Non";
    let vs = this.product.venteSeule ? "Oui" : "Non";
    let tvd = this.product.tarVarParDsbtr ? "Oui" : "Non";
    let tvq = this.product.tarVarParQte ? "Oui" : "Non";
    let tvs = this.product.tarVarParSaison ? "Oui" : "Non";
    let tvv = this.product.tarVarParVrte ? "Oui" : "Non";
    let tvzg = this.product.tarVarParZoneGeo ? "Oui" : "Non";
    let aa = this.product.affAvis ? "Oui" : "Non";
    let gs = this.product.gestStock ? "Oui" : "Non";
    let ies = this.product.indEtatStock ? "Oui" : "Non";

    this.refProduit.setValue(this.product.refProduit);
    this.typePS.setValue(this.selectedTP);
    this.nouveau.setValue(nv);
    this.__designation.setValue(this.product['translations'][0].__designation);
    this.slogan.setValue(this.product.slogan);
    this.madeIn.setValue(this.selectedMI);
    this.__descriptif.setValue(this.product['translations'][0].__descriptif);
    this.__resumeDescriptif.setValue(this.product['translations'][0].__resumeDescriptif);
    this.__producttag.setValue(this.selectedTag);
    this.virtuel.setValue(vt);
    this.telechargeable.setValue(tele);
    this.urlExterne.setValue(this.product.urlExterne);
    this.__msgBtnComExterne.setValue(this.product['translations'][0].__msgBtnComExterne);
    this.affPublique.setValue(ap);
    this.affTarif.setValue(this.product.affTarif);
    this.venteSeule.setValue(vs);
    this.typeVente.setValue(this.selectedTV);
    this.minCommande.setValue(this.product.minCommande);
    this.maxCommande.setValue(this.product.maxCommande);
    this.uniteProduit.setValue(this.selectedUP);
    this.typeTarif.setValue(this.selectedTT);
    this.tarifUHT.setValue(this.product.tarifUHT);
    this.tVA.setValue(this.product.tVA);
    this.pays.setValue(this.selectedPays);
    this.tarVarParSaison.setValue(tvs);
    this.tarVarParZoneGeo.setValue(tvzg);
    this.tarVarParDsbtr.setValue(tvd);
    this.tarVarParVrte.setValue(tvv);
    this.tarVarParQte.setValue(tvq);
    this.notation.setValue(this.product.notation);
    this.affAvis.setValue(aa);
    this.etatPub.setValue(this.selectedEP);
    this.__msgAchat.setValue(this.product['translations'][0].__msgAchat);
    this.ordreAff.setValue(this.product.ordreAff);
    this.gestStock.setValue(gs);
    this.indEtatStock.setValue(ies);

    this.getProductImages();
    this.getQRImage();
    this.getCBImage();

  }

  get getPays() {
    return this.listPays.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  // Operations
  editProduit() {
    if (this.productForm.valid) {
      this.getValues();
      console.log('ft   ',this.produitToEdit)
      this.produitService.editProduit(this.product._id, this.produitToEdit).subscribe(
        (success) => {
          this.toastr.success("Le produit a été modifié avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          if (this.etatPub.value[0] == listEtatPublication[listEtatPublication.length - 1]) {
            this.pricingRuleProductService.addProduct(success).toPromise()
              .catch(error => console.log(error));
          }
          setTimeout(() => {
            const url = ["/gestion-produits/simple/list-produits"]
            this.router.navigate(url)
          }, 1500);
        },
        (error) => {
          console.log(error);
          this.toastr.error("Erreur lors de la modification du produit", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      );
    } else {
      console.log(this.productForm.value)
      this.toastr.error("Merci de bien remplir le formulaire", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }

  onClickShowTs(id: string) {
    const detailUrl = ['tarif-saisonnier/simple/details-tarif-saisonnier', id];
    this.router.navigate(detailUrl);
  }

  onClickShowGt(id: string) {
    const detailUrl = ['grille-tarifaire/simple/details-grille-tarifaire/', id];
    this.router.navigate(detailUrl, { queryParams: { idProduct: this.product._id } });
  }

  onClickShowIndPromo(id: string) {
    const detailUrl = ['ind-promo/simple/details-ind-promo', id];
    this.router.navigate(detailUrl, { queryParams: { idProduct: this.product._id } });
  }

  onClickShowIndFraisAdd(id: string) {
    const detailUrl = ['ind-frais-add/simple/details-ind-frais-add', id];
    this.router.navigate(detailUrl, { queryParams: { idProduct: this.product._id } });
  }
  onClickShowTuv(id: string) {
    const detailUrl = ['tarif-unitaire-variable/simple/details-tarif-unitaire-variable', id];
    this.router.navigate(detailUrl);
  }
  onClickShowAnnot(id: string) {
    const detailUrl = ['annotation/simple/details-annotation', id];
    this.router.navigate(detailUrl);
  }
  onClickShowDist(id: string) {
    const detailUrl = ['distinction/simple/details-distinction', id];
    this.router.navigate(detailUrl);
  }
  onClickShowMeg(id: string) {
    const detailUrl = ['montee-en-gamme/simple/details-montee-en-gamme', id];
    this.router.navigate(detailUrl);
  }
  onClickShowCritCalc(id: string) {
    const detailUrl = ['critere-calculable/simple/details-critere-calculable', id];
    this.router.navigate(detailUrl);
  }
  onClickShowInstCaract(id: string) {
    const detailUrl = ['inst-caract/simple/details-inst-caract', id];
    this.router.navigate(detailUrl, { queryParams: { idProduct: this.product._id } });
  }
  onClickShowInstClassif(id: string) {
    const detailUrl = ['inst-classif/simple/details-inst-classif', id];
    this.router.navigate(detailUrl, { queryParams: { idProduct: this.product._id } });
  }

  onClickEditTs(id: string) {
    const editUrl = ['tarif-saisonnier/simple/edit-tarif-saisonnier', id];
    this.router.navigate(editUrl);
  }
  onClickEditGt(id: string) {
    const editUrl = ['grille-tarifaire/simple/edit-grille-tarifaire', id];
    this.router.navigate(editUrl);
  }

  onClickEditIndPromo(id: string) {
    const editUrl = ['ind-promo/simple/edit-ind-promo', id];
    this.router.navigate(editUrl);
  }
  onClickEditIndFraisAdd(id: string) {
    const editUrl = ['ind-frais-add/simple/edit-ind-frais-add', id];
    this.router.navigate(editUrl);
  }
  onClickEditTuv(id: string) {
    const editUrl = ['tarif-unitaire-variable/simple/edit-tarif-unitaire-variable', id];
    this.router.navigate(editUrl);
  }
  onClickEditAnnot(id: string) {
    const editUrl = ['annotation/simple/edit-annotation', id];
    this.router.navigate(editUrl);
  }
  onClickEditDist(id: string) {
    const editUrl = ['distinction/simple/edit-distinction', id];
    this.router.navigate(editUrl);
  }
  onClickEditMeg(id: string) {
    const editUrl = ['montee-en-gamme/simple/edit-montee-en-gamme', id];
    this.router.navigate(editUrl);
  }
  onClickEditCritCalc(id: string) {
    const editUrl = ['critere-calculable/simple/edit-critere-calculable', id];
    this.router.navigate(editUrl);
  }
  onClickEditInstCaract(id: string) {
    const editUrl = ['critere-calculable/simple/edit-critere-calculable', id];
    this.router.navigate(editUrl);
  }
  onClickEditInstClassif(id: string) {
    const editUrl = ['inst-classif/simple/edit-inst-classif', id];
    this.router.navigate(editUrl);
  }

  setItemToDelete(id: string) {
    this.itemToRemoveFromList = id;
  }

  onClickDeleteTs() {
    if (this.itemToRemoveFromList) {
      this.produitService.deleteTarifSaisonnierFromList(this.product._id, this.itemToRemoveFromList).subscribe(
        (success) => {
          this.tsService.removeTarifSaisonnierProduct(this.itemToRemoveFromList).subscribe(
            (success) => {
              this.toastr.success("Le tarif saisonnier a été supprimé avec succès de la liste", "👌", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
              this.updateTables();
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
          this.toastr.error("Le tarif saisonnier n'a pas pu été supprimé de la liste", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      )
    } else {
      this.toastr.error('Veuillez selectionner le tarif saisonnier à supprimer', "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }

  updateTables() {
    this.produitService.findProductById(this.product._id).subscribe(
      (success) => {
        this.listMonteeEnGammes = success.monteeEnGamme.map(x => {
          x.iconeSymbol = environment.apiEndPoint + x.iconeSymbol;
          return x;
        });
        this.listTarifSaisonniers = success.tarifSaisonnier;
        this.listTarifsUnitairesVariables = success.tarifUV;
        this.listAnnotations = success.annotations;
        this.listCritereCalculables = success.criteresCalculables;
        this.listDistinctions = success.distinction.map(x => {
          x.logo = environment.apiEndPoint + x.logo;
          return x;
        });
        this.listGrillesTarifaires = success.grilleTarifaire;
        this.listInstCaracteristiques = success.instCaracterists;
        this.listInstClassifications = success.instClassifs;
        this.listIndFraisAdd = success.indicationFraisAdd;
        this.listIndPromo = success.indicationPromo;
      },
      (error) => {
        console.log(error);
      }
    )
  }
  onClickDeleteGt() {
    if (this.itemToRemoveFromList) {
      this.produitService.deleteGrilleTarifaireFromList(this.product._id, this.itemToRemoveFromList).subscribe(
        (success) => {
          this.toastr.success("La grille tarifaire a été supprimée avec succès de la liste", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          this.updateTables();
        },
        (error) => {
          console.log(error);
          this.toastr.error("La grille tarifaire n'a pas pu être supprimée de la liste", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      )
    } else {
      this.toastr.error('Veuillez selectionner la grille tarifaire à supprimer', "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }

  onClickDeleteIndPromo() {
    if (this.itemToRemoveFromList) {
      this.produitService.deleteIndPromoFromList(this.product._id, this.itemToRemoveFromList).subscribe(
        (success) => {
          this.toastr.success("L'indication promo a été supprimée avec succès de la liste", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          this.updateTables();
        },
        (error) => {
          console.log(error);
          this.toastr.error("L'indication promo n'a pas pu être supprimée de la liste", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      )
    } else {
      this.toastr.error("Veuillez selectionner l'indication promo à supprimer", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }

  onClickDeleteIndFraisAdd() {
    if (this.itemToRemoveFromList) {
      this.produitService.deleteIndFraisAddFromList(this.product._id, this.itemToRemoveFromList).subscribe(
        (success) => {
          this.toastr.success("L'indication frais additionnel a été supprimée avec succès de la liste", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          this.updateTables();
        },
        (error) => {
          console.log(error);
          this.toastr.error("L'indication frais additionnel n'a pas pu être supprimée de la liste", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      )
    } else {
      this.toastr.error("Veuillez selectionner l'indication frais additionnel à supprimer", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }

  onClickDeleteTuv() {
    if (this.itemToRemoveFromList) {
      this.produitService.deleteTarifUnitaireVariableFromList(this.product._id, this.itemToRemoveFromList).subscribe(
        (success) => {
          this.tuvService.removeTarifUnitVarProduct(this.itemToRemoveFromList).subscribe(
            (success) => {
              this.toastr.success("Le tarif unitaire variable a été supprimé avec succès de la liste", "👌", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
              this.updateTables();
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
          this.toastr.error("Le tarif unitaire variable n'a pas pu être supprimé de la liste", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      )
    } else {
      this.toastr.error('Veuillez selectionner le tarif unitaire variable à supprimer', "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }

  onClickDeleteAnnot() {
    if (this.itemToRemoveFromList) {
      this.produitService.deleteAnnotationFromList(this.product._id, this.itemToRemoveFromList).subscribe(
        (success) => {
          this.annotationService.removeAnnotationProduct(this.itemToRemoveFromList).subscribe(
            (success) => {
              this.toastr.success("L'annotation a été supprimé avec succès de la liste", "👌", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
              this.updateTables();
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
          this.toastr.error("L'annotation n'a pas pu être supprimé de la liste", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      )
    } else {
      this.toastr.error("Veuillez selectionner l'annotaion variable à supprimer", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }
  onClickDeleteDist() {
    if (this.itemToRemoveFromList) {
      this.produitService.deleteDistinctionFromList(this.product._id, this.itemToRemoveFromList).subscribe(
        (success) => {
          this.distService.removeDistinctionProduct(this.itemToRemoveFromList).subscribe(
            (success) => {
              this.toastr.success("La distinction a été supprimé avec succès de la liste", "👌", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
              this.updateTables();
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
          this.toastr.error("La distinction n'a pas pu être supprimé de la liste", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      )
    } else {
      this.toastr.error('Veuillez selectionner la distinction à supprimer', "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }
  onClickDeleteMeg() {
    if (this.itemToRemoveFromList) {
      this.produitService.deleteMonteeEnGammeFromList(this.product._id, this.itemToRemoveFromList).subscribe(
        (success) => {
          this.megService.removeMonteeEnGammeProduct(this.itemToRemoveFromList).subscribe(
            (success) => {
              this.toastr.success("La montée en gamme a été supprimé avec succès de la liste", "👌", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
              this.updateTables();
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
          this.toastr.error("La montée en gamme n'a pas pu être supprimé de la liste", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      )
    } else {
      this.toastr.error('Veuillez selectionner la montée en gamme à supprimer', "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }
  onClickDeleteCritCalc() {
    if (this.itemToRemoveFromList) {
      this.produitService.deleteCriteresCalculablesFromList(this.product._id, this.itemToRemoveFromList).subscribe(
        (success) => {
          this.critCalcService.removeCritereCalculableProduct(this.itemToRemoveFromList).subscribe(
            (success) => {
              this.toastr.success("Le critère calculable a été supprimé avec succès de la liste", "👌", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
              this.updateTables();
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
          this.toastr.error("Le critère calculable n'a pas pu être supprimé de la liste", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      )
    } else {
      this.toastr.error('Veuillez selectionner le critère calculable à supprimer', "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }
  onClickDeleteInstCaract() {
    if (this.itemToRemoveFromList) {
      this.produitService.deleteInstCaracteristsFromList(this.product._id, this.itemToRemoveFromList).subscribe(
        (success) => {
          this.instCaractService.removeInstCaractProduct(this.itemToRemoveFromList).subscribe(
            (success) => {
              this.toastr.success("L'instance caractéristique a été supprimé avec succès de la liste", "👌", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
              this.updateTables();
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
          this.toastr.error("L'instance caractéristique n'a pas pu être supprimé de la liste", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      )
    } else {
      this.toastr.error("Veuillez selectionner l'instance caractéristique à supprimer", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  resetForm() {
    this.resetAllValues();
  }

  firstImage(): string {
    const images = this.product.imgPD || [];
    for (const image of images) {
      if (image) {
        return environment.apiEndPoint + image;
      }
    }
    return '';
  }

  addTarifSaisonnier() {
    const addUrl = ['tarif-saisonnier/simple/add-tarif-saisonnier', this.product._id];
    this.router.navigate(addUrl);
  }

  addGrilleTarifaire() {
    const addUrl = ['grille-tarifaire/simple/add-grille-tarifaire', this.product._id];
    this.router.navigate(addUrl);
  }

  addTarifUnitaireVariable() {
    const addUrl = ['tarif-unitaire-variable/simple/add-tarif-unitaire-variable', this.product._id];
    this.router.navigate(addUrl);
  }
  addExpedition() {
    const addUrl = ['expedition/simple/add-expedition', this.product._id];
    this.router.navigate(addUrl);
  }

  addAnnot() {
    const addUrl = ['annotation/simple/add-annotation', this.product._id];
    this.router.navigate(addUrl);
  }

  addDist() {
    const addUrl = ['distinction/simple/add-distinction', this.product._id];
    this.router.navigate(addUrl);
  }

  addMeg() {
    const addUrl = ['montee-en-gamme/simple/add-montee-en-gamme', this.product._id];
    this.router.navigate(addUrl);
  }

  addCritCalc() {
    const addUrl = ['critere-calculable/simple/add-critere-calculable', this.product._id];
    this.router.navigate(addUrl);
  }

  addInstCaract() {
    const addUrl = ['inst-caract/simple/add-inst-caract', this.product._id];
    this.router.navigate(addUrl);
  }


  addInstClassificationToProduct(classificationId: string) {
    const addUrl = ['inst-classif/simple/add-inst-classif-to-product', this.product._id];
    this.router.navigate(addUrl, {
      queryParams: { classificationId: classificationId }
    });
  }

  addInstCaracteristiqueToProduct(caracteristiqueId: string) {
    const addUrl = ['inst-caract/simple/add-inst-caract-to-product', this.product._id];
    this.router.navigate(addUrl, {
      queryParams: { caracteristiqueId: caracteristiqueId }
    });
  }

  removeInstClassificationFromProduct(idInstClassif: string) {
    let idXi = this.listInstClassifications.map(x => x._id);
    if (idXi.includes(idInstClassif)) {
      this.produitService.deleteInstClassifsFromList(this.product._id, idInstClassif).subscribe(
        (success) => {
          this.updateTables();
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  removeInstCaracteristiqueFromProduct(idInstCaract: string) {
    let idXi = this.listInstCaracteristiques.map(x => x._id);
    if (idXi.includes(idInstCaract)) {
      this.produitService.deleteInstCaracteristsFromList(this.product._id, idInstCaract).subscribe(
        (success) => {
          this.updateTables();
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  getNotAffectedInstClassification() {
    this.notAffectedInstanceClassifications = []
    this.classificationService.getAllClassificationForProduct().subscribe(
      (success) => {
        this.notAffectedInstanceClassifications = success;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getNotAffectedInstCaracteristique() {
    this.notAffectedInstanceCaracteristiques = []
    this.caracteristiqueService.getAllCaracteristiqueForProduct().subscribe(
      (success) => {
        this.notAffectedInstanceCaracteristiques = success;
      },
      (error) => {
        console.log(error);
      }
    )
  }


  getValuesofExpedition() {
    this.expeditionToEdit.largeur = this.largeur.value;
    this.expeditionToEdit.classeLivraison = this.classeLivraison.value;
    this.expeditionToEdit.hauteur = this.hauteur.value;
    this.expeditionToEdit.poids = this.poids.value;
    this.expeditionToEdit.unitePoids = this.unitePoids.value;
    this.expeditionToEdit.uniteDimension = this.uniteDimension.value;
    this.expeditionToEdit.refExp = this.refExp.value;
    this.expeditionToEdit.profondeur = this.profondeur.value;

  }
  createexpeditionForm0() {
    this.expeditionForm = this.fb.group({
      refExp: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      poids: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      unitePoids: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      largeur: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      hauteur: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      profondeur: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      uniteDimension: this.fb.control({ value: this.selectedUnitePoids, disabled: false }, [Validators.required]),
      classeLivraison: this.fb.control({ value: '', disabled: false }, [Validators.required]),
    });

  }

  createexpeditionForm() {

    this.expeditionForm = this.fb.group({
      classeLivraison: [this.expeditionToEdit.classeLivraison, [Validators.required]],
      hauteur: [this.expeditionToEdit.hauteur, [Validators.required]],
      largeur: [this.expeditionToEdit.largeur, [Validators.required]],
      poids: [this.expeditionToEdit.poids, [Validators.required]],
      produitService: [this.expeditionToEdit.produitService, [Validators.required]],
      profondeur: [this.expeditionToEdit.profondeur, [Validators.required]],
      refExp: this.fb.control({ value: this.expeditionToEdit.refExp, disabled: true }, [Validators.required]),
      uniteDimension: [this.expeditionToEdit.uniteDimension, [Validators.required]],
      unitePoids: [this.expeditionToEdit.unitePoids, [Validators.required]]
    });

  }

  createExpProduitForm() {
    this.expeditionProduitForm = this.fb.group({
      produitService: [this.selectedProduit, [Validators.required]]
    });
  }

  get classeLivraison() {
    return this.expeditionForm.get('classeLivraison');
  }

  get hauteur() {
    return this.expeditionForm.get('hauteur');
  }

  get largeur() {
    return this.expeditionForm.get('largeur');
  }

  get poids() {
    return this.expeditionForm.get('poids');
  }

  get profondeur() {
    return this.expeditionForm.get('profondeur');
  }

  get refExp() {
    return this.expeditionForm.get('refExp');
  }

  get unitePoids() {
    return this.expeditionForm.get('unitePoids');
  }

  get uniteDimension() {
    return this.expeditionForm.get('uniteDimension');
  }

  // Dropdown unité poids
  listUnitePoids: Array<string> = [];
  selectedUnitePoids: Array<string> = [];
  dropdownUnitePoidsSettings: any = {};
  closeDropdownUnitePoidsSelection = false;
  disabledDropdownUnitePoids = false;

  // Dropdown unité dimension
  listUniteDimension: Array<string> = [];
  selectedUniteDimension: Array<string> = [];
  dropdownUniteDimensionSettings: any = {};
  closeDropdownUniteDimensionSelection = false;
  disabledDropdownUniteDimension = false;

  // Dropdown classe livraison
  listClasseLivraison: Array<string> = [];
  selectedClasseLivraison: Array<string> = [];
  dropdownClasseLivraisonSettings: any = {};
  closeDropdownClasseLivraisonSelection = false;
  disabledDropdownClasseLivraison = false;

  createUnitePoidsDropdown() {
    this.listUnitePoids = listUnitePoids;
    this.selectedUnitePoids = [];
    this.dropdownUnitePoidsSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownUnitePoidsSelection
    };
  }
  createUniteDimensionDropdown() {
    this.listUniteDimension = listUniteDimension;
    this.selectedUniteDimension = [];
    this.dropdownUniteDimensionSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownUniteDimensionSelection
    };
  }
  createClasseLivraisonDropdown() {
    this.listClasseLivraison = listClasseLivraison;
    this.selectedClasseLivraison = [];
    this.dropdownClasseLivraisonSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownClasseLivraisonSelection
    };
  }



  clearValues() {
    this.expeditionForm.reset();
    this.classeLivraison.setValue(this.expeditionToEdit.classeLivraison);
    this.hauteur.setValue(this.expeditionToEdit.hauteur);
    this.largeur.setValue(this.expeditionToEdit.largeur);
    this.poids.setValue(this.expeditionToEdit.poids);
    this.profondeur.setValue(this.expeditionToEdit.profondeur);
    this.refExp.setValue(this.expeditionToEdit.refExp);
    this.uniteDimension.setValue(this.expeditionToEdit.uniteDimension);
    this.unitePoids.setValue(this.expeditionToEdit.unitePoids);

    this.expeditionProduitForm.reset();
  }

  editExpedition() {
    if (this.expeditionForm.valid) {
      this.getValuesofExpedition();
      this.expService.editExpedition(this.expeditionToEdit).subscribe(
        (success) => {
          this.toastr.success("L'expedition a été modifié avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const listUrl = ['gestion-produits/simple/edit-produit', this.produitid];
            this.router.navigate(listUrl);
          }, 2000);
        },
        (error) => {
          console.log(error);
          this.toastr.error("L'expedition  n'a pas pu être ajouté avec succès", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        })
    } else {
      this.toastr.error("Merci de bien vouloir remplir tous les champs du formulaire", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }

  }


}

