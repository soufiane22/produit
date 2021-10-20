import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AllowedDate } from 'src/app/shared/directives/allowed-date.directive';
import { Distinction } from 'src/app/shared/model/produit-simple/distinction.model';
import { MonteeEnGamme } from 'src/app/shared/model/produit-simple/montee-en-gamme.model';
import { DistinctionService } from 'src/app/shared/service/produit-simple/distinction.service';
import { MonteeEnGammeService } from 'src/app/shared/service/produit-simple/montee-en-gamme.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-montee-en-gamme',
  templateUrl: './edit-montee-en-gamme.component.html',
  styleUrls: ['./edit-montee-en-gamme.component.scss']
})
export class EditMonteeEnGammeComponent implements OnInit {

  public megForm: FormGroup;
  public megProduitForm: FormGroup;
  public megToEdit = new FormData();
  public meg: MonteeEnGamme;
  public megProduit: any;
  public url = {
    img: "assets/images/user.png",
  };

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
  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private megService: MonteeEnGammeService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.megService.findMonteeEnGammeById(success.id).subscribe(
          (success) => {
            this.meg = success;
            this.createTypesDropDown();
            this.createProduitDropDown();
            this.createMegForm();
            this.url.img = environment.apiEndPoint + success.iconeSymbol;
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

  createMegForm() {
    this.megForm = this.fb.group({
      iconeSymbol: [this.meg.iconeSymbol, [Validators.required]],
      typeMonteeEnGamme: [this.selectedTypes, [Validators.required]],
      description: [this.meg.description, [Validators.required]],
    });
  }

  createTypesDropDown() {
    this.listTypes = ['Nationale', 'Régionale', 'Internationale'];
    this.selectedTypes = [this.meg.typeMonteeEnGamme];
    this.dropdownTypesSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownTypesSelection
    };
  }



  get typeMonteeEnGamme() {
    return this.megForm.get('typeMonteeEnGamme');
  }

  get description() {
    return this.megForm.get('description');
  }

  get iconeSymbol() {
    return this.megForm.get('iconeSymbol');
  }


  createDistProduitForm() {
    this.megProduitForm = this.fb.group({
      produitService: [this.selectedProduit, [Validators.required]]
    });
  }

  get produitService() {
    return this.megProduitForm.get('produitService');
  }
  createProduitDropDown() {
    // Dropdown produit
    this.psService.getAllProducts().subscribe(
      (success) => {
        this.listProduits = success.map(p => p.refProduit);
        this.selectedProduit = success.filter(p => p._id === this.meg
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
    this.megForm.reset();
    this.description.setValue(this.meg.description);
    this.iconeSymbol.setValue(this.meg.iconeSymbol);
    this.typeMonteeEnGamme.setValue(this.selectedTypes)

    this.megProduitForm.reset();
    this.produitService.setValue(this.selectedProduit);
  }

  editMeg() {
    if (this.megForm.valid) {
      this.getValues();
      this.megService.editMonteeEnGamme(this.meg._id,this.megToEdit).subscribe(
        (success) => {
          this.toastr.success("La montée en gamme a été modifié avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const listUrl = ['montee-en-gamme/simple/list-montee-en-gamme'];
            this.router.navigate(listUrl);
          }, 2000);
        },
        (error) => {
          console.log(error);
          this.toastr.error("La montée en gamme  n'a pas pu être ajouté avec succès", "🥵", {
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

  async onclickAddToMeg() {
    if (this.megForm.valid) {
      await this.getMegFormValues();
      if (this.meg.produitService) {
        this.psService.deleteMonteeEnGammeFromList(this.meg.produitService, this.meg._id).subscribe(
          (success) => {
            this.megService.addMonteeEnGammeProduit(this.meg._id, this.megProduit).subscribe(
              (success) => {
                this.psService.addMonteeEnGammeToList(this.megProduit, this.meg._id).subscribe(
                  (success) => {
                    this.toastr.success("Le produit a été avec succès à la montée en gamme", "👌", {
                      timeOut: 2000,
                      progressBar: true,
                      progressAnimation: 'increasing',
                      positionClass: 'toast-top-right'
                    });
                    setTimeout(() => {
                      const listUrl = ['montee-en-gamme/simple/list-montee-en-gamme'];
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
        this.megService.addMonteeEnGammeProduit(this.meg._id, this.megProduit).subscribe(
          (success) => {
            this.psService.addMonteeEnGammeToList(this.megProduit, this.meg._id).subscribe(
              (success) => {
                this.toastr.success("Le produit a été avec succès à la montée en gamme", "👌", {
                  timeOut: 2000,
                  progressBar: true,
                  progressAnimation: 'increasing',
                  positionClass: 'toast-top-right'
                });
                setTimeout(() => {
                  const listUrl = ['montee-en-gamme/simple/list-montee-en-gamme'];
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
  async getMegFormValues() {
    await this.psService.getAllProducts().toPromise()
      .then(success => {
        this.megProduit = success.filter(p => p.refProduit === this.produitService.value[0]).map(p => p._id)[0];
      })
      .catch(error => {
        console.log(error);
      })
  }

  getValues() {
    this.megToEdit.append('description',this.description.value);
    this.megToEdit.append('iconeSymbol',this.iconeSymbol.value);
    this.megToEdit.append('typeMonteeEnGamme',this.typeMonteeEnGamme.value[0]);
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
      this.url.img = reader.result.toString();
      this.iconeSymbol.setValue(event.target.files[0]);
    }
  }

}
