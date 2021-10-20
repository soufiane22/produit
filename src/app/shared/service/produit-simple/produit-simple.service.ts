import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProduitSimple } from '../../model/produit-simple/produit-simple.model';
@Injectable({
  providedIn: 'root'
})
export class ProduitSimpleService {
  exists: boolean;
  lang:any;
  constructor(private httpClient: HttpClient) {
    this.lang=localStorage.getItem('code');
   }
  getAllProducts():Observable<ProduitSimple[]> {
    return this.httpClient.get<ProduitSimple[]>(environment.apiEndPoint + 'produitServices/'+this.lang);
  }

  addProduct(product: any): Observable<ProduitSimple> {
    return this.httpClient.post<any>(environment.apiEndPoint + 'produitServices', product);
  }

  findProductById(id: string): Observable<ProduitSimple> {
    return this.httpClient.get<ProduitSimple>(environment.apiEndPoint + `produitServices/${id}/`+this.lang);
  }

  deleteProduitById(id: string): Observable<ProduitSimple> {
    return this.httpClient.delete<ProduitSimple>(environment.apiEndPoint + `produitServices/${id}`);
  }

  editProduit(id: any, product: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${id}`, product);
  }

  addTarifSaisonnierToList(idProduit: any, idTs: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/addTarifSaisonnier`, { tsId: idTs });
  }

  addGrilleTarifaireToList(idProduit: any, idGt: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/addGrilleTarifaire`, { gtId: idGt });
  }

  addTarifUnitaireVariableToList(idProduit: any, idTuv: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/addTarifUnitaireVariable`, { tuvId: idTuv });
  }

  addAnnotationToList(idProduit: any, idAnno: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/addAnnotation`, { annoId: idAnno });
  }

  addExpeditionToList(idProduit: any, idexp: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/addExpedition`, { expId: idexp });
  }

  addDistinctionToList(idProduit: any, idDist: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/addDistinction`, { distId: idDist });
  }

  addMonteeEnGammeToList(idProduit: any, idMeg: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/addMonteeEnGamme`, { megId: idMeg });
  }

  addInstClassifsToList(idProduit: any, idInstClassif: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/addInstClassifs`, { instClassifId: idInstClassif });
  }

  addInstCaracteristsToList(idProduit: any, idInstCaract: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/addInstCaracterists`, { instCaractId: idInstCaract });
  }

  addCriteresCalculablesToList(idProduit: any, idCritCalc: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/addCriteresCalculables`, { critCalcId: idCritCalc });
  }

  addInstCaractVarToList(idProduit: any, idInstCaractVar: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/addInstCaractVar`, { insCaractVarId: idInstCaractVar });
  }

  addIndPromoToList(idProduit: any, idIndPromo: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/addIndPromo`, { indPromoId: idIndPromo });
  }

  addIndFraisAddToList(idProduit: any, idIndFraisAdd: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/addIndFraisAdd`, { indFraisAddId: idIndFraisAdd });
  }

  addContMmediaToList(idProduit: any, idContMmedia: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/addContMmedia`, { contMmediaId: idContMmedia });
  }

  addGarAssurToList(idProduit: any, idGarAssur: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/addGarAssur`, { garAssurId: idGarAssur });
  }



  deleteTarifSaisonnierFromList(idProduit: any, idTs: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/deleteTarifSaisonnier`, { tsId: idTs });
  }

  deleteGrilleTarifaireFromList(idProduit: any, idGt: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/deleteGrilleTarifaire`, { gtId: idGt });
  }

  deleteTarifUnitaireVariableFromList(idProduit: any, idTuv: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/deleteTarifUnitaireVariable`, { tuvId: idTuv });
  }

  deleteAnnotationFromList(idProduit: any, idAnno: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/deleteAnnotation`, { annoId: idAnno });
  }

  deleteExpeditionFromList(idProduit: any, idExp: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/deleteExpedition`, { expId: idExp });
  }
  deleteDistinctionFromList(idProduit: any, idDist: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/deleteDistinction`, { distId: idDist });
  }

  deleteInstCaracteristsFromList(idProduit: any, idInstCaract: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/deleteInstCaracterists`, { instCaractId: idInstCaract });
  }

  deleteMonteeEnGammeFromList(idProduit: any, idMeg: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/deleteMonteeEnGamme`, { megId: idMeg });
  }

  deleteInstClassifsFromList(idProduit: any, idInstClassif: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/deleteInstClassifs`, { instClassifId: idInstClassif });
  }

  deleteCriteresCalculablesFromList(idProduit: any, idCritCalc: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/deleteCriteresCalculables`, { critCalcId: idCritCalc });
  }

  deleteInstCaractVarFromList(idProduit: any, idInstCaractVar: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/deleteInstCaractVar`, { insCaractVarId: idInstCaractVar });
  }

  deleteIndPromoFromList(idProduit: any, idIndPromo: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/deleteIndPromo`, { indPromoId: idIndPromo });
  }

  deleteIndFraisAddFromList(idProduit: any, idIndFraisAdd: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/deleteIndFraisAdd`, { indFraisAddId: idIndFraisAdd });
  }

  deleteContMmediaFromList(idProduit: any, idContMmedia: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/deleteContMmedia`, { contMmediaId: idContMmedia });
  }

  deleteGarAssurFromList(idProduit: any, idGarAssur: any) {
    return this.httpClient.patch(environment.apiEndPoint + `produitServices/${idProduit}/deleteGarAssur`, { garAssurId: idGarAssur });
  }


  async produitExists(id: string) {
    await this.findProductById(id).subscribe(
      (success) => {
        if (success) {
          this.exists = true;
        } else {
          this.exists = false;
        }
      },
      (error) => {
        this.exists = false;
      }
    );
    return this.exists;
  }
}
