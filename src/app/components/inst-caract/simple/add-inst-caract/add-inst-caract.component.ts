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
import { CaracteristiqueService } from 'src/app/shared/service/taxonomie-caracteristique/caracteristique.service';

@Component({
  selector: 'app-add-inst-caract',
  templateUrl: './add-inst-caract.component.html',
  styleUrls: ['./add-inst-caract.component.scss']
})
export class AddInstCaractComponent implements OnInit {

  public instCaractForm: FormGroup;
  public instCaractToAdd = new InstCaract();

  public caracteristique: Caracteristique = new Caracteristique();

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


  productId: string = ''
  constructor(private caracteristiqueService: CaracteristiqueService, private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private instCaractService: InstCaracteristiqueService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.productId = success.id;
        this.activatedRoute.queryParams.subscribe(
          (success) => {
            this.caracteristiqueService.getCaracteristiqueById(success.caracteristiqueId).subscribe(
              (success) => {
                this.caracteristique = success;
                this.createTypesDropDown();
                this.createValeurDropDown();
                this.createInstCaractForm();
                this.initFormValues();
              },
              (error) => {
                console.log(error);
              }
            )
          },
          (error) => {
            console.log(error);
          })
      },
      (error) => {
        console.log(error);
        const listUrl = ['gestion-produits/simple/list-produit'];
        this.router.navigate(listUrl);
      })
  }

  isZoneDeSaisie(){
    return this.caracteristique.nature_info == listNatureInfo[0];
  }

  createInstCaractForm() {
    this.instCaractForm = this.fb.group({
      refInstCaracterist: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      affichagePrive: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      groupeCaracterist: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      labelCaracterist: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      valeurCaracterist: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      uniteCaracterist: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      ordreCaracterist: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      typeCoutAdditionnel: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      valeurCoutAdditionnel: this.fb.control({ value: '', disabled: false }, [Validators.required])
    });
  }

  initFormValues() {
    this.groupeCaracterist.setValue(this.caracteristique.groupe.label);
    this.labelCaracterist.setValue(this.caracteristique.label);
    this.uniteCaracterist.setValue(this.caracteristique.unite);
  }


  createTypesDropDown() {
    this.listTypes = ['Nationale', 'Régionale', 'Internationale'];
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

  createValeurDropDown() {
    this.psService.findProductById(this.productId).subscribe(
      (success) => {
        this.listValeur = [];
        let affectedValues = success.instCaracterists.map(x => x.refInstCaracterist);
        this.caracteristique.valeurs.map(x => {
          if (!affectedValues.includes(x.ref)) {
            let tmp = {
              ref: x.ref,
              valeur: x.valeur
            }
            this.listValeur.push(tmp);
          }
        });
        this.selectedValeur = []
        this.dropdownValeurSettings = {
          singleSelection: true,
          idField: 'ref',
          textField: 'valeur',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          allowSearchFilter: this.showFilterValeur
        };
      },
      (error) => {
        console.log(error);
      }
    )
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


  clearValues() {
    this.instCaractForm.reset();
    this.instCaractToAdd = new InstCaract();
  }

  addInstCaract() {
    if (this.instCaractForm.valid) {
      this.getValues();
      this.instCaractService.addInstCaract(this.instCaractToAdd).subscribe(
        (success) => {
          this.psService.addInstCaracteristsToList(this.productId, success._id).subscribe(
            (success) => {
              this.toastr.success("L'instant caractéristique a été ajoutée avec succès", "👌", {
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
              this.toastr.error("L'instant caractéristique n'a pas été ajoutée au produit", "🥵", {
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
          this.toastr.error("L'instant caractéristique n'a pas pu être ajoutée avec succès", "🥵", {
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
    this.instCaractToAdd.affichagePrive = this.affichagePrive.value == "Oui";
    this.instCaractToAdd.groupeCaracterist = this.groupeCaracterist.value;
    this.instCaractToAdd.labelCaracterist = this.labelCaracterist.value;
    this.instCaractToAdd.ordreCaracterist = this.ordreCaracterist.value;
    this.instCaractToAdd.refInstCaracterist = this.refInstCaracterist.value;
    this.instCaractToAdd.typeCoutAdditionnel = this.typeCoutAdditionnel.value[0];
    this.instCaractToAdd.uniteCaracterist = this.uniteCaracterist.value;
    if(this.isZoneDeSaisie()){
      this.instCaractToAdd.valeurCaracterist = this.valeurCaracterist.value;
    }else{
      this.instCaractToAdd.valeurCaracterist = this.valeurCaracterist.value[0].valeur;
    }
    this.instCaractToAdd.valeurCoutAdditionnel = this.valeurCoutAdditionnel.value;
  }

  onValeurSelect(item: any) {
    this.refInstCaracterist.setValue(item.ref);
  }

}
