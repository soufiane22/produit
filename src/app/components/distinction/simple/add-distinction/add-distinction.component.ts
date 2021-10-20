import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AllowedDate } from 'src/app/shared/directives/allowed-date.directive';
import { listTypeDistinction, listUniteDuree } from 'src/app/shared/helpers/data.helper';
import { DistinctionService } from 'src/app/shared/service/produit-simple/distinction.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';


@Component({
  selector: 'app-add-distinction',
  templateUrl: './add-distinction.component.html',
  styleUrls: ['./add-distinction.component.scss']
})
export class AddDistinctionComponent implements OnInit {

  public distForm: FormGroup;
  public distToAdd = new FormData();
  public productId: string;
  public url = {
    img: "assets/images/user.png",
  };

  // Dropdown types
  listTypes: Array<string> = [];
  selectedTypes: Array<string> = [];
  dropdownTypesSettings: any = {};
  closeDropdownTypesSelection = false;
  disabledDropdownTypes = false;

  // Dropdown types
  listUnites: Array<string> = [];
  selectedUnites: Array<string> = [];
  dropdownUnitesSettings: any = {};
  closeDropdownUnitesSelection = false;
  disabledDropdownUnites = false;


  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private distService: DistinctionService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.createTypesDropDown();
    this.createUnitesDropDown();
    this.createDistForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.productId = success.id;
        this.distToAdd.append('produitService',this.productId);
      },
      (error) => {
        console.log(error);
        const listUrl = ['gestion-produits/simple/list-produit'];
        this.router.navigate(listUrl);
      })
  }

  createDistForm() {
    this.distForm = this.fb.group({
      logo: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      dateObtention: this.fb.control({ value: this.today, disabled: false }, [Validators.required, AllowedDate]),
      typeD: this.fb.control({ value: this.selectedTypes, disabled: false }, [Validators.required]),
      designation: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      duree: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      uniteDuree: this.fb.control({ value: this.selectedUnites, disabled: false }, [Validators.required])
    });
  }

  createTypesDropDown() {
    this.listTypes = listTypeDistinction;
    this.selectedTypes = [];
    this.dropdownTypesSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownTypesSelection
    };
  }

  createUnitesDropDown() {
    this.listUnites = listUniteDuree;
    this.selectedUnites = [];
    this.dropdownUnitesSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownUnitesSelection
    };
  }

  get typeD() {
    return this.distForm.get('typeD');
  }

  get designation() {
    return this.distForm.get('designation');
  }

  get logo() {
    return this.distForm.get('logo');
  }

  get dateObtention() {
    return this.distForm.get('dateObtention');
  }

  get duree() {
    return this.distForm.get('duree');
  }

  get uniteDuree() {
    return this.distForm.get('uniteDuree');
  }


  clearValues() {
    this.distForm.reset();
    this.distToAdd = new FormData();
    this.distToAdd.append('produitService', this.productId);
    this.url.img = "assets/images/user.png";
  }

  addDist() {
    if (this.distForm.valid) {
      this.getValues();
      this.distService.addDistinction(this.distToAdd).subscribe(
        (success) => {
          this.psService.addDistinctionToList(this.productId, success._id).subscribe(
            (success) => {
              this.toastr.success("La distinction a été ajoutée avec succès", "👌", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
              setTimeout(() => {
                const editUrl = ['gestion-produits/simple/edit-produit', this.productId];
                this.router.navigate(editUrl);
              }, 2000);

            },
            (error) => {
              console.log({ error: error });
              this.toastr.error("La distinction n'a pas été ajoutée au produit", "🥵", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
            }
          );
        },
        (error) => {
          console.log(error);
          this.toastr.error("La distinction  n'a pas pu être ajouté avec succès", "🥵", {
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
    this.distToAdd.append('dateObtention', this.dateObtention.value);
    this.distToAdd.append('designation', this.designation.value);
    this.distToAdd.append('logo', this.logo.value);
    this.distToAdd.append('duree', this.duree.value);
    this.distToAdd.append('typeD', this.typeD.value[0]);
    this.distToAdd.append('uniteDuree', this.uniteDuree.value[0]);
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
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
      this.url.img = reader.result.toString();
      this.logo.setValue(event.target.files[0])
    }
  }
}


