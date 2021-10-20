import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProduitAssocie } from 'src/app/shared/model/produit-simple/produit-associe.model';
import { ProdAssocService } from 'src/app/shared/service/produit-simple/prod-assoc.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-details-prod-assoc',
  templateUrl: './details-prod-assoc.component.html',
  styleUrls: ['./details-prod-assoc.component.scss']
})
export class DetailsProdAssocComponent implements OnInit {

  public prodAssocForm: FormGroup;
  public prodAssoc = new ProduitAssocie()

  constructor(
    private psService: ProduitSimpleService,
    private prodAssocService: ProdAssocService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  prName1:''
  prName2:''
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.prodAssocService.findProduitAssocieById(success.id).subscribe(
          (success) => {
            this.prodAssoc = success

            this.prodAssoc.produitService1.translations[0].__designation = this.prName1
            this.prodAssoc.produitService2.translations[0].__designation = this.prName2

            console.log('prodAssoc', this.prodAssoc.produitService2.translations[0].__designation = this.prName2)

            },
            (err) => { console.log(err);
            }
        )

      },
      (err) => {console.log(err);
      }

    )
  }

  // createAssocCompForm(){
  //   this.prodAssocForm = this.fb.group({
  //     typeAssociation: this.fb.control({ value: this.prodAssoc.typeAssociation, disabled: true } ),
  //     produitService1: this.fb.control({ value: this.prodAssoc.produitService1 , disabled: true }),
  //     produitService2: this.fb.control({ value: this.prodAssoc.produitService2, disabled: true }),

  //   });
  // }

  // get typeAssociation() {
  //   return this.prodAssocForm.get('typeAssociation');
  // }
  // get produitService1() {
  //   return this.prodAssocForm.get('produitService1');
  // }

  // get produitService2() {
  //   return this.prodAssocForm.get('produitService2');
  // }


}
