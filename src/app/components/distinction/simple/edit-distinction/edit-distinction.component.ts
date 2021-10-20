import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AllowedDate } from 'src/app/shared/directives/allowed-date.directive';
import { listTypeDistinction, listTypeMonteeEnGamme, listUniteDuree } from 'src/app/shared/helpers/data.helper';
import { Distinction } from 'src/app/shared/model/produit-simple/distinction.model';
import { DistinctionService } from 'src/app/shared/service/produit-simple/distinction.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-distinction',
  templateUrl: './edit-distinction.component.html',
  styleUrls: ['./edit-distinction.component.scss']
})
export class EditDistinctionComponent implements OnInit {

  public distForm: FormGroup;
  public distProduitForm: FormGroup;
  public distToEdit = new FormData();
  public distinction = new Distinction();
  public distProduit: any;

  // Dropdown produits
  listProduits: Array<string> = [];
  selectedProduit: Array<string> = [];
  dropdownProduitSettings: any = {};
  closeDropdownProduitSelection = false;
  disabledDropdownProduit = false;

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

  logoUrl: string;
  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private distService: DistinctionService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.distService.findDistinctionById(success.id).subscribe(
          (success) => {
            this.distinction = success;
            this.createTypesDropDown();
            this.createUnitesDropDown();
            this.createProduitDropDown();
            this.createDistForm();
            this.logoUrl = environment.apiEndPoint + this.distinction.logo;
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

  createDistForm() {
    this.distForm = this.fb.group({
      logo: this.fb.control({ value: this.distinction.logo, disabled: false }, [Validators.required]),
      dateObtention: this.fb.control({ value: this.distinction.dateObtention, disabled: false }, [Validators.required, AllowedDate]),
      typeD: this.fb.control({ value: this.selectedTypes, disabled: false }, [Validators.required]),
      designation: this.fb.control({ value: this.distinction.designation, disabled: false }, [Validators.required]),
      duree: this.fb.control({ value: this.distinction.duree, disabled: false }, [Validators.required]),
      uniteDuree: this.fb.control({ value: this.selectedUnites, disabled: false }, [Validators.required])
    });
  }

  createTypesDropDown() {
    this.listTypes = listTypeDistinction;
    this.selectedTypes = [this.distinction.typeD];
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
    this.selectedUnites = [this.distinction.uniteDuree];
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



  createDistProduitForm() {
    this.distProduitForm = this.fb.group({
      produitService: [this.selectedProduit, [Validators.required]]
    });
  }

  get produitService() {
    return this.distProduitForm.get('produitService');
  }
  createProduitDropDown() {
    // Dropdown produit
    this.psService.getAllProducts().subscribe(
      (success) => {
        this.listProduits = success.map(p => p.refProduit);
        this.selectedProduit = success.filter(p => p._id === this.distinction
          .produitService).map(p => p.refProduit);
        this.createDistProduitForm();
        this.dropdownProduitSettings = {
          singleSelection: true,
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          allowSearchFilter: true,
          closeDropDownOnSelection: this.closeDropdownProduitSelection
        };
      },
      (error) => {
        console.log(error);
      })

  }

  clearValues() {
    this.distForm.reset();
    this.dateObtention.setValue(this.distinction.dateObtention);
    this.designation.setValue(this.distinction.designation);
    this.duree.setValue(this.distinction.duree);
    this.logo.setValue(this.distinction.logo);
    this.typeD.setValue(this.selectedTypes);
    this.uniteDuree.setValue(this.selectedUnites);

    this.distProduitForm.reset();
    this.produitService.setValue(this.selectedProduit);
  }

  editDist() {
    if (this.distForm.valid) {
      this.getValues();
      this.distService.editDistinction(this.distinction._id,this.distToEdit).subscribe(
        (success) => {
          this.toastr.success("La distinction a été modifié avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const listUrl = ['distinction/simple/list-distinction'];
            this.router.navigate(listUrl);
          }, 2000);
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

  async onclickAddToDist() {
    if (this.distForm.valid) {
      await this.getDistFormValues();
      if (this.distinction.produitService) {
        this.psService.deleteDistinctionFromList(this.distinction.produitService, this.distinction._id).subscribe(
          (success) => {
            this.distService.addDistinctionProduit(this.distinction._id, this.distProduit).subscribe(
              (success) => {
                this.psService.addDistinctionToList(this.distProduit, this.distinction._id).subscribe(
                  (success) => {
                    this.toastr.success("Le produit a été avec succès à la distinction", "👌", {
                      timeOut: 2000,
                      progressBar: true,
                      progressAnimation: 'increasing',
                      positionClass: 'toast-top-right'
                    });
                    setTimeout(() => {
                      const listUrl = ['distinction/simple/list-distinction'];
                      this.router.navigate(listUrl);
                    }, 2000);
                  },
                  (error) => {
                    console.log(error);
                  }
                );

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
      } else {
        this.distService.addDistinctionProduit(this.distinction._id, this.distProduit).subscribe(
          (success) => {
            this.psService.addDistinctionToList(this.distProduit, this.distinction._id).subscribe(
              (success) => {
                this.toastr.success("Le produit a été avec succès à la distinction", "👌", {
                  timeOut: 2000,
                  progressBar: true,
                  progressAnimation: 'increasing',
                  positionClass: 'toast-top-right'
                });
                setTimeout(() => {
                  const listUrl = ['distinction/simple/list-distinction'];
                  this.router.navigate(listUrl);
                }, 2000);
              },
              (error) => {
                console.log(error);
              }
            );

          },
          (error) => {
            console.log(error);
          }
        );
      }
    } else {
      this.toastr.error("Merci de bien vouloir choisir le produit", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }

  }
  async getDistFormValues() {
    await this.psService.getAllProducts().toPromise()
      .then(success => {
        this.distProduit = success.filter(p => p.refProduit === this.produitService.value[0]).map(p => p._id)[0];
      })
      .catch(error => {
        console.log(error);
      })
  }

  getValues() {
    this.distToEdit.append('uniteDuree', this.uniteDuree.value[0]);
    this.distToEdit.append('designation', this.designation.value);
    this.distToEdit.append('duree', this.duree.value);
    this.distToEdit.append('logo', this.logo.value);
    this.distToEdit.append('typeD', this.typeD.value[0]);
    this.distToEdit.append('dateObtention', this.dateObtention.value);
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

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
      this.logoUrl = reader.result.toString();
      this.logo.setValue(event.target.files[0])
    }
  }

}
