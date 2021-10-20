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
  selector: 'app-details-inst-caract',
  templateUrl: './details-inst-caract.component.html',
  styleUrls: ['./details-inst-caract.component.scss']
})
export class DetailsInstCaractComponent implements OnInit {

  public instCaractForm: FormGroup;
  public instCaractToShow = new InstCaract();

  public caracteristique: Caracteristique = new Caracteristique();


  idProduct: string = '';

  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private instCaractService: InstCaracteristiqueService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (success) => {
        this.idProduct = success.idProduct;
      },
      (error) => {
        console.log(error);
      })
    this.activatedRoute.params.subscribe(
      (success) => {
        this.instCaractService.findInstCaractById(success.id).subscribe(
          (success) => {
            this.instCaractToShow = success;
            this.createInstCaractForm();
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

  createInstCaractForm() {
    this.instCaractForm = this.fb.group({
      refInstCaracterist: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      affichagePrive: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      groupeCaracterist: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      labelCaracterist: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      valeurCaracterist: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      uniteCaracterist: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      ordreCaracterist: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      typeCoutAdditionnel: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      valeurCoutAdditionnel: this.fb.control({ value: '', disabled: true }, [Validators.required])
    });
  }

  initFormValues(){
    this.refInstCaracterist.setValue(this.instCaractToShow.refInstCaracterist);
    let x = this.affichagePrive?"Oui":"Non";
    this.affichagePrive.setValue(x);
    this.groupeCaracterist.setValue(this.instCaractToShow.groupeCaracterist);
    this.labelCaracterist.setValue(this.instCaractToShow.labelCaracterist);
    this.valeurCaracterist.setValue(this.instCaractToShow.valeurCaracterist);
    this.uniteCaracterist.setValue(this.instCaractToShow.uniteCaracterist);
    this.ordreCaracterist.setValue(this.instCaractToShow.ordreCaracterist);
    this.typeCoutAdditionnel.setValue(this.instCaractToShow.typeCoutAdditionnel);
    this.valeurCoutAdditionnel.setValue(this.instCaractToShow.valeurCoutAdditionnel);
  }


  associatedProduct() {
    const detailUrl = ['gestion-produits/simple/edit-produit', this.idProduct];
    this.router.navigate(detailUrl);
  }

  goToList() {
    const url = ["/inst-caract/simple/list-inst-caract"]
    this.router.navigate(url)
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

  onValeurSelect(item: any) {
    this.refInstCaracterist.setValue(item.ref);
  }

  isZoneDeSaisie(){
    return this.caracteristique.nature_info == listNatureInfo[0];
  }



}
