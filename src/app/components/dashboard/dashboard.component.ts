import { Component, OnInit } from '@angular/core';
import { AnnotationService } from 'src/app/shared/service/produit-simple/annotation.service';
import { CritereCalculableService } from 'src/app/shared/service/produit-simple/critere-calculable.service';
import { DistinctionService } from 'src/app/shared/service/produit-simple/distinction.service';
import { GrilleTarifaireService } from 'src/app/shared/service/produit-simple/grille-tarifaire.service';
import { InstCaractVarService } from 'src/app/shared/service/produit-simple/inst-caract-var.service';
import { InstCaracteristiqueService } from 'src/app/shared/service/produit-simple/inst-caracteristique.service';
import { InstClassificationService } from 'src/app/shared/service/produit-simple/inst-classification.service';
import { MonteeEnGammeService } from 'src/app/shared/service/produit-simple/montee-en-gamme.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { TarifSaisonnierService } from 'src/app/shared/service/produit-simple/tarif-saisonnier.service';
import { TarifUnitVarService } from 'src/app/shared/service/produit-simple/tarif-unitaire-variable.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public productCount = 0;
  public tarSaiCount = 0;
  public griTarCount = 0;
  public tarUniVarCount = 0;
  public annoCount = 0;
  public distCount = 0;
  public megCount = 0;
  public critCalcCount = 0;
  public instCaractCount = 0;
  public instCaractVarCount = 0;
  public instClassifCount = 0;
  public utilCount = 0;

  public expCount = 0;
  public indFraisAddCount = 0;
  public indPromo =0;
  public indStock = 0;
  public contMmediaCount = 0;
  public instComIntCount = 0;
  public marqueCount = 0;
  public garAssurCount = 0;
  public prodAssocCount = 0;
  public prodCompCount = 0;
  public varHorizCount = 0;
  constructor(private annoService: AnnotationService, private distService: DistinctionService, 
    private megService: MonteeEnGammeService, private critCalcService: CritereCalculableService, 
    private produitService: ProduitSimpleService, private tarSaiService: TarifSaisonnierService, 
    private tarUniVarService: TarifUnitVarService, private instCaractVarService: InstCaractVarService,
    private instClassifService: InstClassificationService, private utilService: UserService, 
    private griTarService: GrilleTarifaireService, private instCaractService: InstCaracteristiqueService) {
  }

  ngOnInit() {
    this.setAnnoCount();
    this.setCritCalcCount();
    this.setDistCount();
    this.setGriTarCount();
    this.setInstCaractCount();
    this.setInstCaractVarCount();
    this.setInstClassifCount();
    this.setMegCount();
    this.setProduitsCount();
    this.setTarUniVarCount();
    this.setTarifSaisonnierCount();
    this.setUtilCount();
  }

  setProduitsCount(){
    this.produitService.getAllProducts().subscribe(
      (success)=>{
        this.productCount = success.length;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  setTarifSaisonnierCount(){
    this.tarSaiService.getAllTarifSaisonniers().subscribe(
      (success)=>{
        this.tarSaiCount = success.length;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  setGriTarCount(){
    this.griTarService.getAllGrilleTarifaires().subscribe(
      (success)=>{
        this.griTarCount = success.length;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  setTarUniVarCount(){
    this.tarUniVarService.getAllTarifUnitVars().subscribe(
      (success)=>{
        this.tarUniVarCount = success.length;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  setAnnoCount(){
    this.annoService.getAllAnnotations().subscribe(
      (success)=>{
        this.annoCount = success.length;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  setDistCount(){
    this.distService.getAllDistinctions().subscribe(
      (success)=>{
        this.distCount = success.length;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  setMegCount(){
    this.megService.getAllMonteeEnGammes().subscribe(
      (success)=>{
        this.megCount = success.length;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  setCritCalcCount(){
    this.critCalcService.getAllCritereCalculables().subscribe(
      (success)=>{
        this.critCalcCount = success.length;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  setUtilCount(){
    this.utilService.getAllUsers().subscribe(
      (success)=>{
        this.utilCount = success.length;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  setInstCaractCount(){
    this.instCaractService.getAllInstCaracts().subscribe(
      (success)=>{
        this.instCaractCount = success.length;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  setInstCaractVarCount(){
    this.instCaractVarService.getAllInstCaractVars().subscribe(
      (success)=>{
        this.instCaractVarCount = success.length;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  setInstClassifCount(){
    this.instClassifService.getAllInstClassifs().subscribe(
      (success)=>{
        this.instClassifCount = success.length;
      },
      (error)=>{
        console.log(error);
      }
    )
  }





}
