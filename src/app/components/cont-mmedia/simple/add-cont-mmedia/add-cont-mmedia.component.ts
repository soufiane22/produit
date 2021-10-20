import { GarAssurService } from './../../../../shared/service/produit-simple/gar-assur.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ToastrService } from 'ngx-toastr';
import { listFormatDoc, listTypeContenuMmedia, listUniteTaille } from 'src/app/shared/helpers/data.helper';
import { ContMmedia } from 'src/app/shared/model/produit-simple/cont-mmedia.model';
import { ContMmediaService } from 'src/app/shared/service/produit-simple/cont-mmedia.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { ListContMmediaComponent } from '../list-cont-mmedia/list-cont-mmedia.component';

@Component({
  selector: 'app-add-cont-mmedia',
  templateUrl: './add-cont-mmedia.component.html',
  styleUrls: ['./add-cont-mmedia.component.scss']
})
export class AddContMmediaComponent implements OnInit {
  public contMmediaForm: FormGroup;
  public contMmediaToAdd = new FormData();

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

  imageUrl: string;
  sizeInOctet: number;

  constructor(private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private psService: ProduitSimpleService,
    private contMmediaService: ContMmediaService,
    private router: Router, private fb: FormBuilder,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private garAssurService:GarAssurService
)
     {
    this.createTContDropDown();
    this.createUTailleDropDown();
    this.createFDocDropDown();
    this.createContMmediaForm();
  }
id_garAssur=''
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      objet => {
        console.log(objet);
        if (objet.id) {
          console.log('id de gart',objet.id);
          this.id_garAssur = objet.id
          this.relation.setValue('cont_mmedia.fields.unique')
          this.used.setValue(true)
        }
      }
    )
    console.log('id garAssur',this.id_garAssur);


  }

  createContMmediaForm() {
    this.contMmediaForm = this.fb.group({
      refContenu: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      typeContenu: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      titreDoc: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      formatDoc: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      tailleDoc: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      uniteTaille: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      urlDoc: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      relation: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      used: this.fb.control({ value:false, disabled: false }, [Validators.required]),
      provenanceInterne: this.fb.control({ value: '', disabled: false }, [Validators.required])
    });
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
  get relation() {
    return this.contMmediaForm.get('relation');
  }

  get used(){
    return this.contMmediaForm.get('used');
  }

  get provenanceInterne() {
    return this.contMmediaForm.get('provenanceInterne');
  }


  clearValues() {
    this.contMmediaForm.reset();
    this.contMmediaToAdd = new FormData();
  }
  createTContDropDown() {
    this.listTCont = listTypeContenuMmedia;
    this.selectedTCont = [];
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
    this.selectedFDoc = [];
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
    this.selectedUTaille = [];
    this.dropdownUTailleSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownUTailleSelection
    };
  }


  addContMmedia() {
    if (this.contMmediaForm.valid) {
      this.getValues();
      console.log('relation', this.relation.value);
      console.log('used', this.used.value);

      this.contMmediaService.addContMmedia(this.contMmediaToAdd).subscribe(
        (success) => {
          console.log(success);
          if(this.id_garAssur){
            this.garAssurService.addContMmediaToList(this.id_garAssur, success._id).toPromise()
            .catch(error => console.log(error))
            this.toastr.success("Le contenu multimedia a été ajoutée avec succès", "👌", {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
            const link =['gar-assur/simple/edit-gar-assur/',this.id_garAssur]
            this.router.navigate(link)
          }
          else{
            this.toastr.success("Le contenu multimedia a été ajoutée avec succès", "👌", {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
            setTimeout(() => {
              const editUrl = ['cont-mmedia/simple/list-cont-mmedia'];
              this.router.navigate(editUrl);
            }, 2000);

          }



        },
        (error) => {
          console.log(error);
          this.toastr.error("Le contenu multimedia n'a pas pu être ajoutée avec succès", "🥵", {
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

  getValues() {
    this.contMmediaToAdd.append('refContenu', this.refContenu.value);
    this.contMmediaToAdd.append('tailleDoc', this.tailleDoc.value);
    this.contMmediaToAdd.append('titreDoc', this.titreDoc.value);
    this.contMmediaToAdd.append('typeContenu', this.typeContenu.value);
    this.contMmediaToAdd.append('uniteTaille', this.uniteTaille.value[0]);
    this.contMmediaToAdd.append('urlDoc', this.urlDoc.value);
    this.contMmediaToAdd.append('formatDoc', this.formatDoc.value[0]);
    this.contMmediaToAdd.append('relation',this.relation.value);
    this.contMmediaToAdd.append('used',this.used.value);
    let x = this.provenanceInterne.value == "Oui";
    this.contMmediaToAdd.append('provenanceInterne', x.toString());

  }


  // Inbuilt
  readUrl(event: any) {
    if (event.target.files.length === 0)
      return;

    // Image upload
    var reader = new FileReader();
    console.log('event',event);
    const file = event.target.files[0]
    console.log(file);
    reader.readAsDataURL(file);
    reader.onload = (_event) => {

      this.imageUrl = reader.result.toString();
      // console.log('imageUrl',this.imageUrl);

      this.urlDoc.setValue(file);
      console.log('urlDoc readUrl',this.urlDoc);

      const name_file = file.name.split(".");
      this.titreDoc.setValue(name_file[0]);

      this.sizeInOctet = file.size;
      this.tailleDoc.setValue(this.sizeInOctet);

      const type_info = file.type.split('/');
      this.formatDoc.setValue([type_info[1]]);
      this.typeContenu.setValue([type_info[0]]);

      this.uniteTaille.setValue(['Octet (o)']);
    }
  }

  convertSize(item: any) {
    if (this.sizeInOctet) {
      console.log(this.sizeInOctet)
      let nTaille = 0;
      switch (item) {
        case "Octet (o)":
          nTaille = this.sizeInOctet
          break;

        case "Kilo-octet (Ko)":
          nTaille = this.sizeInOctet / (1024)
          break;

        case "Mega-octet (Mo)":
          nTaille = this.sizeInOctet / (1024 * 1024)
          break;

        case "Giga-octet (Go)":
          nTaille = this.sizeInOctet / (1024 * 1024 * 1024)
          break;

        default:
          nTaille = this.sizeInOctet;
          break;
      }
      this.tailleDoc.setValue(nTaille.toFixed(0));
    }
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
  onAddedFile(event){}

}
