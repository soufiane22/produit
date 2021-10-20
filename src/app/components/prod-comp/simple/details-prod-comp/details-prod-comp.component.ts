import { ProduitComposant } from './../../../../shared/model/produit-simple/produit-composant.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdCompService } from 'src/app/shared/service/produit-simple/prod-comp.service';

@Component({
  selector: 'app-details-prod-comp',
  templateUrl: './details-prod-comp.component.html',
  styleUrls: ['./details-prod-comp.component.scss']
})
export class DetailsProdCompComponent implements OnInit {
  public prodCompForm: FormGroup;
  public prodComp = new ProduitComposant()


  constructor(
    private fb: FormBuilder,
    private prodCompService : ProdCompService,
    private router: Router,
    private activatedRoute:ActivatedRoute

    ) {

   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
     ( success)=> {
       this.prodCompService.findProduitComposantById(success.id).subscribe(
         (success)=> {
                    this.prodComp = success ;
                    console.log('prodComp', this.prodComp);
                    this.createProdCompForm();
                    console.log('prodCompForm',this.prodCompForm.value);

                   },
       (err)=>{ console.log(err);}
       )
      }

    )

  }

  createProdCompForm() {
    this.prodCompForm = this.fb.group({
      typeProduit: this.fb.control({ value: this.prodComp.typeProduit, disabled: true } ),
      qteProduit: this.fb.control({ value: this.prodComp.qteProduit , disabled: true }),
      uniteQte: this.fb.control({ value: this.prodComp.uniteQte, disabled: true }),
      refProdComposant: this.fb.control({ value: this.prodComp.refProdComposant, disabled: true }),
      refProdCompose: this.fb.control({ value: this.prodComp.refProdCompose , disabled: true }),
    });
  }

  get typeProduit() {
    return this.prodCompForm.get('typeProduit');
  }


  get qteProduit() {
    return this.prodCompForm.get('qteProduit');
  }

  get uniteQte() {
    return this.prodCompForm.get('uniteQte');
  }

  get refProdComposant() {
    return this.prodCompForm.get('refProdComposant');
  }


  get refProdCompose() {
    return this.prodCompForm.get('refProdCompose');
  }


}
