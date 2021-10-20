
import { contMmediaHeaders } from './../../../../shared/helpers/data.helper';
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
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-edit-cont-mmedia',
  templateUrl: './edit-cont-mmedia.component.html',
  styleUrls: ['./edit-cont-mmedia.component.scss']
})
export class EditContMmediaComponent implements OnInit {

  public contMmediaForm: FormGroup;
  public cmmProductForm: FormGroup;
  public cmmGarAssurForm: FormGroup;
  public contMmediaToEdit = new FormData();
  public contMmedia = new ContMmedia();
  public imgUpdated: boolean = false;





  // Dropdown unité taille
  listUTaille: Array<string> = [];
  selectedUTaille: Array<string> = [];
  dropdownUTailleSettings: any = {};
  closeDropdownUTailleSelection = false;
  disabledDropdownUTaille = false;


  imageUrl: string;
  sizeInOctet: number;

  constructor(
    private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService,
     private garAssurService: GarAssurService, private contMmediaService: ContMmediaService, private router: Router,
     private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute,
     public translateService: TranslateService
     ) {


  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.contMmediaService.findContMmediaById(success.id).subscribe(
          async (success) => {
            this.contMmedia = success;
            this.imageUrl = this.contMmedia.urlDoc


            this.createUTailleDropDown();

            this.createContMmediaForm();



            this.getSizeInOctet()
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

  createContMmediaForm() {
    let x = this.contMmedia.provenanceInterne ? "Oui" : "Non";
    this.contMmediaForm = this.fb.group({
      refContenu: this.fb.control({ value: this.contMmedia.refContenu, disabled: false }, [Validators.required]),
      typeContenu: this.fb.control({ value: this.contMmedia.typeContenu, disabled: true }, [Validators.required]),
      titreDoc: this.fb.control({ value: this.contMmedia.titreDoc, disabled: false }, [Validators.required]),
      formatDoc: this.fb.control({ value: this.contMmedia.formatDoc, disabled: true }, [Validators.required]),
      tailleDoc: this.fb.control({ value: this.contMmedia.tailleDoc, disabled: true }, [Validators.required]),
      uniteTaille: this.fb.control({ value: this.selectedUTaille, disabled: false }, [Validators.required]),
      urlDoc: this.fb.control({ value: this.imageUrl, disabled: false }, [Validators.required]),
      provenanceInterne: this.fb.control({ value: x, disabled: false }, [Validators.required]),
      relation: this.fb.control({ value:this.contMmedia.relation, disabled: false }, [Validators.required])
    });
  console.log('contMmediaForm',this.contMmediaForm.value);

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



  clearValues() {
    this.contMmediaForm.reset();
    this.contMmediaToEdit = new FormData();
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


  editContMmedia() {
    if (this.contMmediaForm.valid) {
      this.getValues();
        this.contMmediaService.editContMmedia(this.contMmedia._id, this.contMmediaToEdit).subscribe(
          (success) => {
            this.toastr.success("Le contenu multimedia a été modifié avec succès", "👌", {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
            setTimeout(() => {
              const editUrl = ['cont-mmedia/simple/list-cont-mmedia'];
              this.router.navigate(editUrl);
            }, 2000);
          },
          (error) => {
            console.log(error);
            this.toastr.error("Le contenu multimedia n'a pas pu être modifié avec succès", "🥵", {
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



  removeCmmToGarAssur() {
    let idGa = this.contMmedia.garAssur
    if(idGa){
      this.garAssurService.deleteContMmediaFromList(idGa, this.contMmedia._id).toPromise()
      .catch(error=>console.log(error));
    }
  }


  getValues() {
    this.contMmediaToEdit.append('refContenu', this.refContenu.value);
    this.contMmediaToEdit.append('tailleDoc', this.tailleDoc.value);
    this.contMmediaToEdit.append('titreDoc', this.titreDoc.value);
    this.contMmediaToEdit.append('typeContenu', this.typeContenu.value);
    this.contMmediaToEdit.append('uniteTaille', this.uniteTaille.value[0]);
    this.contMmediaToEdit.append('relation', this.relation.value);
    if (this.imgUpdated) {
      console.log(" // // // // // // // // //");

      this.contMmediaToEdit.append('urlDoc', this.urlDoc.value);
    }


    this.contMmediaToEdit.append('formatDoc', this.formatDoc.value);
    let x = this.provenanceInterne.value == "Oui";
    this.contMmediaToEdit.append('provenanceInterne', x.toString());

  }


  convertSize(item: any) {
    console.log(this.sizeInOctet);
    if (this.sizeInOctet) {
      let nTaille = 0;
      switch (item) {
        case "Octet (o)":
          nTaille = this.sizeInOctet
          break;

        case "Kilo-octet (Ko)":
          nTaille = this.sizeInOctet / (1024)
          break;

        case "Mega-octet (Mo)":
          nTaille = this.sizeInOctet / (1024*1024)
          break;

        case "Giga-octet (Go)":
          nTaille = this.sizeInOctet / (1024*1024*1024)
          break;

        default:
          nTaille = this.sizeInOctet;
          break;
      }
      this.tailleDoc.setValue(nTaille.toFixed(0));
    }
  }

  getSizeInOctet(){
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
          nTaille = size * (1024*1024)
          break;

        case "Giga-octet (Go)":
          nTaille = size* (1024*1024*1024)
          break;

        default:
          nTaille = size;
          break;
    }
    this.sizeInOctet = nTaille;
  }

  public config1: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    maxFilesize: 20,
    autoReset: null,
    errorReset: null,
    cancelReset: 1,
    // resizeHeight: 300,
    addRemoveLinks: true,
    dictFileTooBig: "Image trop grande, Merci d'en choisir une autre",
    dictRemoveFile: "Supprimer",
    dictCancelUpload: "Annuler",
    timeout: 0,
    // url: 'http://localhost:3000/public/images/',
    // dictRemoveFileConfirmation: "Voulez-vous vraiment supprimer cette image ?",
    // acceptedFiles: "image/*",
  };


  public onUploadSuccess1(args: any): void {
    this.imgUpdated=true;
    console.log('args',args);

    const name_file = args[0].name.split(".");
    this.titreDoc.setValue(name_file[0]);

    this.sizeInOctet = args[0].size;
    this.tailleDoc.setValue(this.sizeInOctet);

    const file = args[0]
    console.log('file',file);

    this.urlDoc.setValue(file)
    console.log('urlDoc Dropzone',this.urlDoc);

    const type_info = args[0].type.split('/');
    console.log('type_info',type_info);

    if(type_info[0]=='application'){
     const type:String ='document'
      this.typeContenu.setValue(type)
      console.log('typeContenu',this.typeContenu);
    }
    else{
      this.typeContenu.setValue(type_info[0])
    }



    this.formatDoc.setValue([name_file[1]])
    console.log('formatDoc',this.formatDoc);

    this.uniteTaille.setValue(['Octet (o)']);


  }


  public onUploadInit1(args: any): void { }

  public onUploadError1(args: any): void { }
}
