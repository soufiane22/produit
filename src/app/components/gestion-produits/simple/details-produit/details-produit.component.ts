import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { lessThanValidator } from 'src/app/shared/directives/less-than.directive';
import { listAffichageTarif, grilleHeaders, indFraisAddHeaders, indPromoHeaders, listEtatPublication, listPays, listTypeTarif, listTypeVente, listUniteProduit, listTagProduit, tarifSaisonnierHeaders, tuvHeaders, distinctionHeaders, annoHeaders, megHeaders, critCalcHeaders, instClassifHeaders, instCaractHeaders } from 'src/app/shared/helpers/data.helper';
import { IndFraisAdd } from 'src/app/shared/model/produit-simple/ind-frais-add.model';
import { IndPromo } from 'src/app/shared/model/produit-simple/ind-promo.model';
import { ProduitSimple } from 'src/app/shared/model/produit-simple/produit-simple.model';
import { AnnotationService } from 'src/app/shared/service/produit-simple/annotation.service';
import { CritereCalculableService } from 'src/app/shared/service/produit-simple/critere-calculable.service';
import { DistinctionService } from 'src/app/shared/service/produit-simple/distinction.service';
import { GrilleTarifaireService } from 'src/app/shared/service/produit-simple/grille-tarifaire.service';
import { InstCaracteristiqueService } from 'src/app/shared/service/produit-simple/inst-caracteristique.service';
import { InstClassificationService } from 'src/app/shared/service/produit-simple/inst-classification.service';
import { MonteeEnGammeService } from 'src/app/shared/service/produit-simple/montee-en-gamme.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { TarifSaisonnierService } from 'src/app/shared/service/produit-simple/tarif-saisonnier.service';
import { TarifUnitVarService } from 'src/app/shared/service/produit-simple/tarif-unitaire-variable.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.scss']
})
export class DetailsProduitComponent implements OnInit {
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

  public itemToRemoveFromList: string;
  public closeResult: string;
  public tsHeaders: Array<string>;
  public tuvHeaders: Array<string>;
  public gtHeaders: Array<string>;
  public distinctionHeaders: Array<String>;
  public monteeEnGammeHeaders: Array<String>;
  public instCaracteristiquesHeaders: Array<String>;
  public instClassificationHeaders: Array<String>;
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

  constructor(private distService: DistinctionService, private megService: MonteeEnGammeService, private critCalcService: CritereCalculableService, private instCaractService: InstCaracteristiqueService
    , private gtService: GrilleTarifaireService, private tuvService: TarifUnitVarService, private modalService: NgbModal, private fb: FormBuilder, private instClassifService: InstClassificationService,
    private activatedRoute: ActivatedRoute, private produitService: ProduitSimpleService, private tsService: TarifSaisonnierService, private toastr: ToastrService, private router: Router, private annotationService: AnnotationService) {

    this.setTablesHeaders();
  }

  setTablesHeaders() {
    this.tsHeaders = tarifSaisonnierHeaders;
    this.gtHeaders = grilleHeaders;
    this.tuvHeaders = tuvHeaders;
    this.distinctionHeaders = distinctionHeaders;
    this.annotationsHeaders = annoHeaders;
    this.monteeEnGammeHeaders = megHeaders;
    this.criteresCalculablesHeaders = critCalcHeaders;
    this.instClassificationHeaders = instClassifHeaders;
    this.instCaracteristiquesHeaders = instCaractHeaders;
    this.indFraisAddHeaders = indFraisAddHeaders;
    this.indPromoHeaders = indPromoHeaders;
  }

  createTPDropdown() {
    this.listTP = this.listTypeProduit;
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
    this.selectedTag = this.product.__producttag;
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
      refCB: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      refQR: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      typePS: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      nouveau: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      designation: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      slogan: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      madeIn: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      descriptif: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      resumeDescriptif: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      imgPD: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      tag: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      virtuel: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      telechargeable: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      urlExterne: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      msgBtnComExterne: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      affPublique: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      affTarif: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      venteSeule: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      typeVente: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      minCommande: this.fb.control({ value: '', disabled: true }, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      maxCommande: this.fb.control({ value: '', disabled: true }, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      uniteProduit: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      typeTarif: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      tarifUHT: this.fb.control({ value: '', disabled: true }, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
      tVA: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      pays: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      tarVarParSaison: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      tarVarParZoneGeo: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      tarVarParDsbtr: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      tarVarParVrte: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      tarVarParQte: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      notation: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      affAvis: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      etatPub: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      msgAchat: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      ordreAff: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      gestStock: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      indEtatStock: this.fb.control({ value: '', disabled: true }, [Validators.required]),
    }, { validators: lessThanValidator })

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.produitService.findProductById(success.id).subscribe(
          (success) => {
            this.product = success;
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
            this.listInstClassifications = this.product.instClassifs.map(x => {
              x.iconeSymbClassif = environment.apiEndPoint + x.iconeSymbClassif;
              return x;
            });
            this.listMonteeEnGammes = this.product.monteeEnGamme.map(x => {
              x.iconeSymbol = environment.apiEndPoint + x.iconeSymbol;
              return x;
            });
            this.listTarifSaisonniers = this.product.tarifSaisonnier;
            this.listTarifsUnitairesVariables = this.product.tarifUV;
            this.listIndFraisAdd = this.product.indicationFraisAdd;
            this.listIndPromo = this.product.indicationPromo;
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
    this.urlToShow = this.url[i].img;
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
    this.produitToEdit.append('designation', this.designation.value);
    this.produitToEdit.append('slogan', this.slogan.value);
    this.produitToEdit.append('madeIn', this.madeIn.value.map(v => v.item_text)[0]);
    this.produitToEdit.append('descriptif', this.descriptif.value);
    this.produitToEdit.append('resumeDescriptif', this.resumeDescriptif.value);
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
    this.tag.value.forEach(x => {
      this.produitToEdit.append('tag', x);
    });

    let vr = new Boolean(this.virtuel.value == "Oui");
    this.produitToEdit.append('virtuel', vr.toString());

    let tl = new Boolean(this.telechargeable.value == "Oui");
    this.produitToEdit.append('telechargeable', tl.toString());

    this.produitToEdit.append('urlExterne', this.urlExterne.value);
    this.produitToEdit.append('msgBtnComExterne', this.msgBtnComExterne.value);

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
    this.produitToEdit.append('msgAchat', this.msgAchat.value);
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
    this.designation.setValue(this.product.__designation);
    this.slogan.setValue(this.product.slogan);
    this.madeIn.setValue(this.selectedMI);
    this.descriptif.setValue(this.product.__descriptif);
    this.resumeDescriptif.setValue(this.product.__resumeDescriptif);
    this.tag.setValue(this.selectedTag);
    this.virtuel.setValue(vt);
    this.telechargeable.setValue(tele);
    this.urlExterne.setValue(this.product.urlExterne);
    this.msgBtnComExterne.setValue(this.product.__msgBtnComExterne);
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
    this.msgAchat.setValue(this.product.__msgAchat);
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
    const url = ["/gestion-produits/simple/edit-produit", this.product._id];
    this.router.navigate(url)
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
    this.router.navigate(detailUrl);
  }
  onClickShowInstClassif(id: string) {
    const detailUrl = ['inst-classif/simple/details-inst-classif', id];
    this.router.navigate(detailUrl);
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
        this.listInstClassifications = success.instClassifs.map(x => {
          x.iconeSymbClassif = environment.apiEndPoint + x.iconeSymbClassif;
          return x;
        });
        this.listIndFraisAdd = success.indicationFraisAdd;
        this.listIndPromo = success.indicationPromo;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  addInstClassif() {
    const addUrl = ['inst-classif/simple/add-inst-classif', this.product._id];
    this.router.navigate(addUrl);
  }

}
