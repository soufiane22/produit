import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { listNatureCoutAdd } from 'src/app/shared/helpers/data.helper';
import { generateReference } from 'src/app/shared/helpers/functions.helper';
import { IndFraisAdd } from 'src/app/shared/model/produit-simple/ind-frais-add.model';
import { IndFraisAddService } from 'src/app/shared/service/produit-simple/ind-frais-add.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-edit-ind-frais-add',
  templateUrl: './edit-ind-frais-add.component.html',
  styleUrls: ['./edit-ind-frais-add.component.scss']
})
export class EditIndFraisAddComponent implements OnInit {

  public indFraisAddForm: FormGroup;
  public indFraisAddToEdit = new IndFraisAdd();
  public indFraisAdd = new IndFraisAdd();

  // Dropdown nature
  listNature: Array<string> = [];
  selectedNature: Array<string> = [];
  dropdownNatureSettings: any = {};
  closeDropdownNatureSelection = false;
  disabledDropdownNature = false;

  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private indFraisAddService: IndFraisAddService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.indFraisAddService.findIndFraisAddById(success.id).subscribe(
          (success) => {
            this.indFraisAdd = success;
            this.createNatureDropDown();
            this.createIndFraisAddForm();
            this.initFormValues();
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



  createNatureDropDown() {
    this.listNature = listNatureCoutAdd;
    this.selectedNature = [this.indFraisAdd.natureCoutAdd];
    this.dropdownNatureSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownNatureSelection
    };
  }


  createIndFraisAddForm() {
    this.indFraisAddForm = this.fb.group({
      refFrais: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      natureCoutAdd: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      valeurCoutAdd: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      description: this.fb.control({ value: '', disabled: false }, [Validators.required])
    });
  }

  initFormValues(){
    this.refFrais.setValue(this.indFraisAdd.refFrais);
    this.natureCoutAdd.setValue(this.selectedNature);
    this.valeurCoutAdd.setValue(this.indFraisAdd.valeurCoutAdd);
    this.description.setValue(this.indFraisAdd.description);
  }

  editIndFraisAdd() {
    if (this.indFraisAddForm.valid) {
      this.getValues();
      this.indFraisAddService.editIndFraisAdd(this.indFraisAdd._id, this.indFraisAddToEdit).subscribe(
        (success) => {
          this.toastr.success("L'indication frais additionnel a été modifiée avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const editUrl = ['ind-frais-add/simple/list-ind-frais-add'];
            this.router.navigate(editUrl);
          }, 2000);
        },
        (error) => {
          this.toastr.error("Erreur lors de la modification de l'indication frais additionnel", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      );
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
    this.indFraisAddToEdit.refFrais = this.refFrais.value;
    this.indFraisAddToEdit.natureCoutAdd = this.natureCoutAdd.value[0];
    this.indFraisAddToEdit.valeurCoutAdd = this.valeurCoutAdd.value;
    this.indFraisAddToEdit.description = this.description.value;
  }

  clearValues() {
    this.indFraisAddForm.reset();
    this.initFormValues();
  }

  get refFrais() {
    return this.indFraisAddForm.get('refFrais');
  }

  get natureCoutAdd() {
    return this.indFraisAddForm.get('natureCoutAdd');
  }

  get valeurCoutAdd() {
    return this.indFraisAddForm.get('valeurCoutAdd');
  }

  get description() {
    return this.indFraisAddForm.get('description');
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }
}
