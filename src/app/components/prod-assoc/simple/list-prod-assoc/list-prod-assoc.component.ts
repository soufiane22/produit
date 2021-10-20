import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProdAssocService } from 'src/app/shared/service/produit-simple/prod-assoc.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-prod-assoc',
  templateUrl: './list-prod-assoc.component.html',
  styleUrls: ['./list-prod-assoc.component.scss']
})
export class ListProdAssocComponent implements OnInit {

  public listProdAsooc: Array<any>;
  public closeResult: string;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private prodAssocService:ProdAssocService,
    private toastr: ToastrService,
    public translateService: TranslateService
  ) { }

  colProdAssoc:any
  ngOnInit(): void {
    this.getAllProdAssoc();
    this.colProdAssoc=[
      { field: 'typeAssociation', header: 'Type Asoociation' ,width: '16rem'},
      { field:  'produitService1', header: 'Produit 1',width: '9rem' },
      { field: 'produitService2', header: 'Produit 2' ,width: '9rem'} ,

    ];
  }

  getAllProdAssoc(){
    this.prodAssocService.getAllProduitAssocies().subscribe(
      (resp) =>{ this.listProdAsooc = resp ;
                 this.listProdAsooc.reverse()
               },
      (err) => {console.log(err);
       }
    )
  }

}
