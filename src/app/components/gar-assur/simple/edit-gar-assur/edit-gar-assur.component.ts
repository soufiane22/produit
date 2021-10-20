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
import { contMmediaHeaders } from 'src/app/shared/helpers/data.helper';
import { TranslateService } from '@ngx-translate/core';
import { link } from 'fs';
import { listenerCount } from 'process';

@Component({
  selector: 'app-edit-gar-assur',
  templateUrl: './edit-gar-assur.component.html',
  styleUrls: ['./edit-gar-assur.component.scss']
})
export class EditGarAssurComponent implements OnInit {
  public garAssurForm: FormGroup;
  public garAssurToEdit = new FormData();

  public garAssurProductForm: FormGroup;
  public garAssurContMmediaForm: FormGroup;

  public garAssur: GarAssur;


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
  public contMmediaHeaders: Array<string>

  imageUrl: string;
  imgUpdated: boolean = false;

  constructor(
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private psService: ProduitSimpleService,
    private garAssurService: GarAssurService,
    private contMmediaService: ContMmediaService,
    private router: Router, private fb: FormBuilder,
    private toastr: ToastrService,
    public translateService:TranslateService,
    private activatedRoute: ActivatedRoute)
    {
      this.contMmediaHeaders = contMmediaHeaders;
  }

  listContMmedias=[]
  id_garAssur
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.garAssurService.findGarAssurById(success.id).subscribe(
          async (success) => {
            this.garAssur = success;
            this.id_garAssur = success._id
            this.imageUrl = environment.apiEndPoint + this.garAssur.contratModel
            this.listContMmedias = success.contenuMmedia
            this.listContMmedias.forEach(element => {
              this.traduire(element.relation)
              element.relation = this.key


            });
            this.createUDGDropDown();
            this.createTGADropDown();
            this.createMonnaieDropDown();
            this.createGarAssurForm();
            this.createProduitDropDown();
            this.createContMmediaDropDown();
            this.get_contentMmedia()
          //  this.get_content_media();
            // console.log('content media',success);


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

  /*  ************** Get contentMmedia ***************** */
  get_contentMmedia(){
    this.garAssurService.findGarAssurById(this.id_garAssur).subscribe(
      (success)=>{
        console.log('success',success);

         this.listContMmedias = success.contenuMmedia;
         this.listContMmedias.forEach(element => {
          this.traduire(element.relation)
          element.relation = this.key

        });

      }
    )


  }

  createGarAssurForm() {
    this.garAssurForm = this.fb.group({
      refGarAssur: this.fb.control({ value: this.garAssur.refGarAssur, disabled: true }, [Validators.required]),
      typeGarAssur: this.fb.control({ value: this.selectedTGA, disabled: false }, [Validators.required]),
      valid_de: this.fb.control({ value: this.garAssur.valid_de, disabled: false }, [Validators.required, AllowedDate]),
      duree: this.fb.control({ value: this.garAssur.duree, disabled: false }, [Validators.required]),
      uniteDureeGar: this.fb.control({ value: this.selectedUDG, disabled: false }, [Validators.required]),
      valeurGar: this.fb.control({ value: this.garAssur.valeurGar, disabled: false }, [Validators.required]),
      monnaie: this.fb.control({ value: this.selectedMonnaie, disabled: false }, [Validators.required]),
      __descriptif: this.fb.control({ value: this.garAssur['translations'][0].__descriptif, disabled: false }, [Validators.required]),
      contratModel: this.fb.control({ value: this.garAssur.contratModel, disabled: false }, [Validators.required])
    });
  }

  createGarAssurProductForm() {
    this.garAssurProductForm = this.fb.group({
      produitService: this.fb.control({ value: this.garAssur.produitService, disabled: false }, [Validators.required])
    })
    this.produitService.setValue(this.garAssur.produitService['translations'][0].__designation)
    console.log('desigantion',this.garAssur.produitService['translations'][0].__designation);

  }

  createGarAssurGarAssurForm() {
    this.garAssurContMmediaForm = this.fb.group({
      contenuMmedia: this.fb.control({ value: this.selectedContMmedia, disabled: false }, [Validators.required])
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
    this.__descriptif.setValue(this.garAssur.__descriptif);
    this.duree.setValue(this.garAssur.duree);
    this.monnaie.setValue(this.selectedMonnaie);
    this.produitService.setValue(this.selectedProduit);
    this.refGarAssur.setValue(this.garAssur.refGarAssur);
    this.typeGarAssur.setValue(this.selectedTGA);
    this.uniteDureeGar.setValue(this.selectedUDG);
    this.valeurGar.setValue(this.garAssur.valeurGar);
    this.valid_de.setValue(this.garAssur.valid_de);
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
      singleSelection: false,
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
      singleSelection: false,
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
          let obj = { _id: '', refProduit: '' ,designation:''}
          obj._id = x._id;
          obj.refProduit = x.refProduit;
          obj.designation = x['translations']['0'].__designation;
          return obj;
        });
        // this.selectedProduit = this.listProduits.filter(p => p._id === this.garAssur.produitService);

        this.dropdownProduitSettings = {
          singleSelection: true,
          idField: '_id',
          textField: 'designation',
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
table=[]
data=[]
obj = { _id: '', refContenu: '' }
  createContMmediaDropDown() {
    // Dropdown produit
    //this.contMmediaService.getAllContMmedias().subscribe(
     this.contMmediaService.get_ContMmedias_Not_Used().subscribe(

      (success) => {
        console.log('success_contmedia',success);

        success.forEach(x=>
          this.table.push({
            _id :x._id,
            refContenu : x.titreDoc
          })
        );

        this.data=this.table
       let obj1  = { _id: '', refContenu: '' }
        this.selectedContMmedia = success.filter(x => this.garAssur.contenuMmedia.includes(x._id)).map(p => {
          obj1.refContenu = p.refContenu;
          obj1._id = p._id;
          return obj1;
        });
        console.log('selected contenu', obj1);
        console.log('selected media', this.selectedContMmedia);

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
  onItemSelect(item: any) {
this.selectedContMmedia.push(item)
  }
  onSelectAll(items: any) {
    this.selectedContMmedia= items
  }
  onItemDeSelect(item) {
   this.selectedContMmedia.slice(item)
  }

  onDeSelectAll(item) {
    this.selectedContMmedia = []

  }

  editGarAssur() {
    if (this.garAssurForm.valid) {
      this.getValues();

      this.garAssurService.editGarAssur(this.garAssur._id, this.garAssurToEdit).subscribe(
        (success) => {
          this.toastr.success("La garantie assurance a été modifié avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const editUrl = ['gar-assur/simple/list-gar-assur'];
            this.router.navigate(editUrl);
          }, 2000);
        },
        (error) => {
          console.log(error);
          this.toastr.error("La garantie assurance n'a pas pu être modifié avec succès", "🥵", {
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

  editGarAssurProduct() {
    if (this.garAssurProductForm.valid) {

      // this.removeGarAssurToProduct();
      this.addProductToGarAssur();
      this.addGarAssurToProduct();


      this.toastr.success("Le produit de la garantie assurance a été modifié avec succès", "👌", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
      setTimeout(() => {
        const editUrl = ['gar-assur/simple/list-gar-assur'];
        this.router.navigate(editUrl);
      }, 2000);
    } else {
      this.toastr.error("Merci de bien vouloir remplir tous les champs du formulaire", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }

  removeGarAssurToProduct() {
    let idP = this.garAssur.produitService
    if (idP) {
      this.psService.deleteGarAssurFromList(idP, this.garAssur._id).toPromise()
        .catch(error => console.log(error));
    }
  }
  addProductToGarAssur() {
    let idP = this.produitService.value[0]._id;
    console.log('idp',idP);

    this.garAssurService.addGarAssurProduit(this.garAssur._id, idP).toPromise()
      .catch(error => console.log(error))
  }
  addGarAssurToProduct() {
    let idP = this.produitService.value[0]._id;
    this.psService.addGarAssurToList(idP, this.garAssur._id).toPromise()
      .catch(error => console.log(error));
  }

  id_contMmedia
  editGarAssurContMmedia() {
    if (this.garAssurContMmediaForm.valid) {
      this.id_contMmedia= this.contenuMmedia.value[0]._id
      // console.log('contenuMmedia',this.contenuMmedia);
      // console.log('id_contMmedia',this.id_contMmedia);
      // this.removeGarAssurToContMmedia();
      this.addCmmToGarAssur();
      // this.addGarAssurToCmm();
      this.toastr.success("Le contenu multi media  de la garantie assurance a été modifiée avec succès", "👌", {
        timeOut: 1000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'

      });
      setTimeout(() => {
        // const editUrl = ['gar-assur/simple/list-gar-assur'];
        // this.router.navigate(editUrl);
        this.get_contentMmedia()
      }, 500);
    } else {
      this.toastr.error("Merci de bien vouloir remplir tous les champs du formulaire", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }

  removeGarAssurToContMmedia() {
    this.garAssur.contenuMmedia.forEach(x => {
      this.contMmediaService.removeContMmediaGarAssur(x).toPromise()
        .catch(error => console.log(error));
    })
  }

  addCmmToGarAssur() {
    this.contenuMmedia.value.forEach(x => {
      this.garAssurService.addContMmediaToList(this.garAssur._id, x._id).toPromise()
        .catch(error => console.log(error))
        this.contMmediaService.findContMmediaById(x._id).subscribe(
          resp => { if (resp.relation=='cont_mmedia.fields.unique'){
                   resp.used=true;
                   this.contMmediaService.editContMmedia(x._id,resp).subscribe(
                     resp => { console.log('cont aprés change',resp);
                     }
                   )
          } }
        )

    });

  }

  addGarAssurToCmm() {
    this.contenuMmedia.value.forEach(x => {
      console.log('x',x)
      this.garAssurService.addContMmediaToList(this.garAssur._id, x._id).toPromise()
        .catch(error => console.log(error))
    });
  }

  getValues() {
    this.garAssurToEdit.append('refGarAssur', this.refGarAssur.value);
    if (this.imgUpdated) {
      this.garAssurToEdit.append('contratModel', this.contratModel.value);
    } else {
      this.garAssurToEdit.append('contratModel', this.garAssur.contratModel);
    }
    this.garAssurToEdit.append('__descriptif', this.__descriptif.value);
    this.garAssurToEdit.append('duree', this.duree.value);
    this.garAssurToEdit.append('monnaie', this.monnaie.value.map(m => m.item_text)[0]);
    this.garAssurToEdit.append('typeGarAssur', this.typeGarAssur.value[0]);
    this.garAssurToEdit.append('uniteDureeGar', this.uniteDureeGar.value[0]);
    this.garAssurToEdit.append('valeurGar', this.valeurGar.value);
    this.garAssurToEdit.append('valid_de', this.valid_de.value);

  }



  // Inbuilt
  readUrl(event: any) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    // var mimeType = event.target.files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result.toString();
      this.contratModel.setValue(event.target.files[0]);
      this.imgUpdated = true;
    }
  }
  openFile(url){
    window.open('http://localhost:3000/'+url,"_blank");
  }

  // get_content_media(){
  //   this.contMmediaService.get_contmedia_garassur(this.id_garAssur).subscribe(
  //     (resp)=> {this.listContMmedia.push(resp)}
  //   )
  // }

/*   ********************  DELETE ContentMmedia ***************** */
  delet_contMmedia(id){
    const msg="Etes-vous sûr que vous voulez supprimer?"

    if (window.confirm( msg)) {
      this.garAssurService.deleteContMmediaFromList(this.garAssur._id, id).toPromise().then( resp=>{this.get_contentMmedia()})
    .catch(error => console.log(error))


    } else {

    }


  }
/*   ********************  ADD NEW  ContentMmedia ***************** */
  add_new_contMmedia(){
    const link =['cont-mmedia/simple/add-cont-mmedia',this.id_garAssur]
    this.router.navigate(link)
  }
/*   ********************  UPDATE  ContentMmedia ***************** */
  onClickEditContMmedia(id){
    const link =['cont-mmedia/simple/edit-cont-mmedia',id]
    this.router.navigate(link)
  }

  retoure(){
    const link =['gar-assur/simple/list-gar-assur']
    this.router.navigate(link)
  }

}

