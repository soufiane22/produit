import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { listNatureInfo } from 'src/app/shared/helpers/data.helper';
import { InstCaract } from 'src/app/shared/model/produit-simple/inst-caract.model';
import { Caracteristique } from 'src/app/shared/model/taxonomie-classification/caracteristique.model';
import { InstCaracteristiqueService } from 'src/app/shared/service/produit-simple/inst-caracteristique.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-edit-inst-caract',
  templateUrl: './edit-inst-caract.component.html',
  styleUrls: ['./edit-inst-caract.component.scss']
})
export class EditInstCaractComponent implements OnInit {

  public instCaractForm: FormGroup;
  public instCaractProduitForm: FormGroup;
  public instCaractToEdit = new InstCaract();
  public instCaractProduit: any;

  // Dropdown types
  listTypes: Array<string> = [];
  selectedTypes: Array<string> = [];
  dropdownTypesSettings: any = {};
  closeDropdownTypesSelection = false;
  disabledDropdownTypes = false;

   // Dropdown valeurs
   disabledDropdownValeur = false;
   showFilterValeur = true;
   limitSelectionValeur = false;
   listValeur: Array<any> = [];
   selectedValeur: Array<any> = [];
   dropdownValeurSettings: any = {};

  public caracteristique: Caracteristique = new Caracteristique();

  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private instCaractService: InstCaracteristiqueService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.instCaractService.findInstCaractById(success.id).subscribe(
          (success) => {
            this.instCaractToEdit = success;
            this.createTypesDropDown();
            this.createInstCaractForm();

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

  createInstCaractForm() {
    const x = this.instCaractToEdit.affichagePrive ? "Oui" : "Non";
    this.instCaractForm = this.fb.group({
      refInstCaracterist: [this.instCaractToEdit.refInstCaracterist, [Validators.required]],
      affichagePrive: [x, [Validators.required]],
      groupeCaracterist: [this.instCaractToEdit.groupeCaracterist, [Validators.required]],
      labelCaracterist: [this.instCaractToEdit.labelCaracterist, [Validators.required]],
      valeurCaracterist: [this.instCaractToEdit.valeurCaracterist, [Validators.required]],
      uniteCaracterist: [this.instCaractToEdit.uniteCaracterist, [Validators.required]],
      ordreCaracterist: [this.instCaractToEdit.ordreCaracterist, [Validators.required]],
      typeCoutAdditionnel: [this.selectedTypes, [Validators.required]],
      valeurCoutAdditionnel: [this.instCaractToEdit.valeurCoutAdditionnel, [Validators.required]]
    });
  }

  createTypesDropDown() {
    this.listTypes = ['Nationale', 'Régionale', 'Internationale'];
    this.selectedTypes = [this.instCaractToEdit.typeCoutAdditionnel];
    this.dropdownTypesSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownTypesSelection
    };
  }

  createValeurDropDown() {

  }

  get refInstCaracterist() {
    return this.instCaractForm.get('refInstCaracterist');
  }

  get affichagePrive() {
    return this.instCaractForm.get('affichagePrive');
  }

  get groupeCaracterist() {
    return this.instCaractForm.get('groupeCaracterist');
  }

  get labelCaracterist() {
    return this.instCaractForm.get('labelCaracterist');
  }

  get valeurCaracterist() {
    return this.instCaractForm.get('valeurCaracterist');
  }

  get uniteCaracterist() {
    return this.instCaractForm.get('uniteCaracterist');
  }

  get ordreCaracterist() {
    return this.instCaractForm.get('ordreCaracterist');
  }

  get typeCoutAdditionnel() {
    return this.instCaractForm.get('typeCoutAdditionnel');
  }

  get valeurCoutAdditionnel() {
    return this.instCaractForm.get('valeurCoutAdditionnel');
  }


  get produitService() {
    return this.instCaractProduitForm.get('produitService');
  }

  clearValues() {
    this.instCaractForm.reset();
    const x = this.instCaractToEdit.affichagePrive ? "Oui" : "Non";
    this.affichagePrive.setValue(x);
    this.groupeCaracterist.setValue(this.instCaractToEdit.groupeCaracterist);
    this.labelCaracterist.setValue(this.instCaractToEdit.labelCaracterist);
    this.ordreCaracterist.setValue(this.instCaractToEdit.ordreCaracterist);
    this.refInstCaracterist.setValue(this.instCaractToEdit.refInstCaracterist);
    this.typeCoutAdditionnel.setValue(this.instCaractToEdit.typeCoutAdditionnel);
    this.uniteCaracterist.setValue(this.instCaractToEdit.uniteCaracterist);
    this.valeurCoutAdditionnel.setValue(this.instCaractToEdit.valeurCoutAdditionnel);
    this.valeurCaracterist.setValue(this.instCaractToEdit.valeurCaracterist);

    this.instCaractProduitForm.reset();
  }

  editInstCaract() {
    if (this.instCaractForm.valid) {
      this.getValues();
      this.instCaractService.editInstCaract(this.instCaractToEdit).subscribe(
        (success) => {
          this.toastr.success("L'instance caractéristique a été modifié avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const listUrl = ['inst-caract/simple/list-inst-caract'];
            this.router.navigate(listUrl);
          }, 2000);
        },
        (error) => {
          console.log(error);
          this.toastr.error("L'instance caractéristique  n'a pas pu être ajouté avec succès", "🥵", {
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

  async onclickAddToCritCalc() {
    if (this.instCaractForm.valid) {
      await this.getCritCalcFormValues();
      this.instCaractService.addInstCaractProduit(this.instCaractToEdit._id, this.instCaractProduit).subscribe(
        (success) => {
          this.psService.addInstCaracteristsToList(this.instCaractProduit, this.instCaractToEdit._id).subscribe(
            (success) => {
              this.toastr.success("Le produit a été avec succès l'instance caractéristique", "👌", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
              setTimeout(() => {
                const listUrl = ['inst-caract/simple/list-inst-caract'];
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
    } else {
      this.toastr.error("Merci de bien vouloir choisir le produit", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }

  }
  async getCritCalcFormValues() {
    await this.psService.getAllProducts().toPromise()
      .then(success => {
        this.instCaractProduit = success.filter(p => p.refProduit === this.produitService.value[0]).map(p => p._id)[0];
      })
      .catch(error => {
        console.log(error);
      })
  }

  getValues() {
    this.instCaractToEdit.affichagePrive = this.affichagePrive.value == "Oui";
    this.instCaractToEdit.groupeCaracterist = this.groupeCaracterist.value[0];
    this.instCaractToEdit.labelCaracterist = this.labelCaracterist.value;
    this.instCaractToEdit.ordreCaracterist = this.ordreCaracterist.value;
    this.instCaractToEdit.refInstCaracterist = this.refInstCaracterist.value;
    this.instCaractToEdit.typeCoutAdditionnel = this.typeCoutAdditionnel.value[0];
    this.instCaractToEdit.uniteCaracterist = this.uniteCaracterist.value[0];
    this.instCaractToEdit.valeurCaracterist = this.valeurCaracterist.value;
    this.instCaractToEdit.valeurCoutAdditionnel = this.valeurCoutAdditionnel.value;
  }
  onValeurSelect(item: any) {
    this.refInstCaracterist.setValue(item.ref);
  }

  isZoneDeSaisie(){
    return this.caracteristique.nature_info == listNatureInfo[0];
  }

}
