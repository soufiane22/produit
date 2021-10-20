import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProduitSimple } from '../../model/produit-simple/produit-simple.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  exists: boolean;
  constructor(private httpClient: HttpClient) { }
  getAllProducts():Observable<ProduitSimple[]> {
    return this.httpClient.get<ProduitSimple[]>(environment.apiPricing + 'product');
  }

  addProduct(product: any): Observable<ProduitSimple> {
    return this.httpClient.post<any>(environment.apiPricing + 'product', product);
  }

  findProductById(id: string): Observable<ProduitSimple> {
    return this.httpClient.get<ProduitSimple>(environment.apiPricing + `product/${id}`);
  }

  deleteProduitById(id: string): Observable<ProduitSimple> {
    return this.httpClient.delete<ProduitSimple>(environment.apiPricing + `product/${id}`);
  }

  editProduit(id: any, product: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${id}`, product);
  }

  addTarifSaisonnierToList(idProduit: any, idTs: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/addTarifSaisonnier`, { tsId: idTs });
  }

  addGrilleTarifaireToList(idProduit: any, idGt: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/addGrilleTarifaire`, { gtId: idGt });
  }

  addTarifUnitaireVariableToList(idProduit: any, idTuv: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/addTarifUnitaireVariable`, { tuvId: idTuv });
  }

  addAnnotationToList(idProduit: any, idAnno: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/addAnnotation`, { annoId: idAnno });
  }

  addDistinctionToList(idProduit: any, idDist: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/addDistinction`, { distId: idDist });
  }

  addMonteeEnGammeToList(idProduit: any, idMeg: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/addMonteeEnGamme`, { megId: idMeg });
  }

  addInstClassifsToList(idProduit: any, idInstClassif: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/addInstClassifs`, { instClassifId: idInstClassif });
  }

  addInstCaracteristsToList(idProduit: any, idInstCaract: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/addInstCaracterists`, { instCaractId: idInstCaract });
  }

  addCriteresCalculablesToList(idProduit: any, idCritCalc: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/addCriteresCalculables`, { critCalcId: idCritCalc });
  }

  addInstCaractVarToList(idProduit: any, idInstCaractVar: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/addInstCaractVar`, { insCaractVarId: idInstCaractVar });
  }

  addIndPromoToList(idProduit: any, idIndPromo: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/addIndPromo`, { indPromoId: idIndPromo });
  }

  addIndFraisAddToList(idProduit: any, idIndFraisAdd: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/addIndFraisAdd`, { indFraisAddId: idIndFraisAdd });
  }

  addContMmediaToList(idProduit: any, idContMmedia: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/addContMmedia`, { contMmediaId: idContMmedia });
  }

  addGarAssurToList(idProduit: any, idGarAssur: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/addGarAssur`, { garAssurId: idGarAssur });
  }



  deleteTarifSaisonnierFromList(idProduit: any, idTs: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/deleteTarifSaisonnier`, { tsId: idTs });
  }

  deleteGrilleTarifaireFromList(idProduit: any, idGt: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/deleteGrilleTarifaire`, { gtId: idGt });
  }

  deleteTarifUnitaireVariableFromList(idProduit: any, idTuv: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/deleteTarifUnitaireVariable`, { tuvId: idTuv });
  }

  deleteAnnotationFromList(idProduit: any, idAnno: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/deleteAnnotation`, { annoId: idAnno });
  }

  deleteDistinctionFromList(idProduit: any, idDist: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/deleteDistinction`, { distId: idDist });
  }

  deleteInstCaracteristsFromList(idProduit: any, idInstCaract: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/deleteInstCaracterists`, { instCaractId: idInstCaract });
  }

  deleteMonteeEnGammeFromList(idProduit: any, idMeg: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/deleteMonteeEnGamme`, { megId: idMeg });
  }

  deleteInstClassifsFromList(idProduit: any, idInstClassif: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/deleteInstClassifs`, { instClassifId: idInstClassif });
  }

  deleteCriteresCalculablesFromList(idProduit: any, idCritCalc: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/deleteCriteresCalculables`, { critCalcId: idCritCalc });
  }

  deleteInstCaractVarFromList(idProduit: any, idInstCaractVar: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/deleteInstCaractVar`, { insCaractVarId: idInstCaractVar });
  }

  deleteIndPromoFromList(idProduit: any, idIndPromo: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/deleteIndPromo`, { indPromoId: idIndPromo });
  }

  deleteIndFraisAddFromList(idProduit: any, idIndFraisAdd: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/deleteIndFraisAdd`, { indFraisAddId: idIndFraisAdd });
  }

  deleteContMmediaFromList(idProduit: any, idContMmedia: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/deleteContMmedia`, { contMmediaId: idContMmedia });
  }

  deleteGarAssurFromList(idProduit: any, idGarAssur: any) {
    return this.httpClient.patch(environment.apiPricing + `product/${idProduit}/deleteGarAssur`, { garAssurId: idGarAssur });
  }
}
