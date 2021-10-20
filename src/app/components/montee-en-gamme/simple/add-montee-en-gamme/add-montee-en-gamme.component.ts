import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { listTypeMonteeEnGamme } from 'src/app/shared/helpers/data.helper';
import { MonteeEnGamme } from 'src/app/shared/model/produit-simple/montee-en-gamme.model';
import { MonteeEnGammeService } from 'src/app/shared/service/produit-simple/montee-en-gamme.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-add-montee-en-gamme',
  templateUrl: './add-montee-en-gamme.component.html',
  styleUrls: ['./add-montee-en-gamme.component.scss']
})
export class AddMonteeEnGammeComponent implements OnInit {
  public megForm: FormGroup;
  public megToAdd = new FormData();
  public produitId:string;
  public url = {
    img: "assets/images/user.png",
  };

  // Dropdown types
  listTypes: Array<string> = [];
  selectedTypes: Array<string> = [];
  dropdownTypesSettings: any = {};
  closeDropdownTypesSelection = false;
  disabledDropdownTypes = false;

  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private megService: MonteeEnGammeService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.createTypesDropDown();
    this.createMegForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.produitId = success.id;
        this.megToAdd.append('produitService',success.id);
      },
      (error) => {
        console.log(error);
        const listUrl = ['gestion-produits/simple/list-produit'];
        this.router.navigate(listUrl);
      })
  }

  createMegForm() {
    this.megForm = this.fb.group({
      iconeSymbol: ['', [Validators.required]],
      typeMonteeEnGamme: [this.selectedTypes, [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  createTypesDropDown() {
    this.listTypes = listTypeMonteeEnGamme;
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


  get typeMonteeEnGamme() {
    return this.megForm.get('typeMonteeEnGamme');
  }

  get description() {
    return this.megForm.get('description');
  }

  get iconeSymbol() {
    return this.megForm.get('iconeSymbol');
  }


  clearValues() {
    this.megForm.reset();
    this.megToAdd = new FormData();
  }

  addDist() {
    if (this.megForm.valid) {
      this.getValues();
      this.megService.addMonteeEnGamme(this.megToAdd).subscribe(
        (success) => {
          this.psService.addMonteeEnGammeToList(this.produitId, success._id).subscribe(
            (success) => {
              this.toastr.success("La montée en gamme a été ajoutée avec succès", "👌", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
              setTimeout(() => {
                const editUrl = ['gestion-produits/simple/edit-produit', this.produitId];
                this.router.navigate(editUrl);
              }, 2000);

            },
            (error) => {
              console.log({ error: error });
              this.toastr.error("La montée en gamme n'a pas été ajoutée au produit", "🥵", {
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
          this.toastr.error("La montée en gamme n'a pas pu être ajoutée avec succès", "🥵", {
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
    this.megToAdd.append('description',this.description.value);
    this.megToAdd.append('iconeSymbol',this.iconeSymbol.value);
    this.megToAdd.append('typeMonteeEnGamme',this.typeMonteeEnGamme.value[0]);
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
      this.iconeSymbol.setValue(event.target.files[0]);
    }
  }
}
