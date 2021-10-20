import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InstCaractVar } from '../../model/produit-simple/inst-caract-var.model';

@Injectable({
  providedIn: 'root'
})
export class InstCaractVarService {
  constructor(private httpClient: HttpClient) { }
  getAllInstCaractVars(): Observable<InstCaractVar[]>{
    return this.httpClient.get<InstCaractVar[]>(environment.apiEndPoint+'instCaractVar');
  }

  addInstCaractVar(instCaractVar: any): Observable<InstCaractVar>{
    return this.httpClient.post<InstCaractVar>(environment.apiEndPoint+'instCaractVar', instCaractVar);
  }

  editInstCaractVar(id:any, instCaractVar: any){
    return this.httpClient.patch<InstCaractVar>(environment.apiEndPoint+`instCaractVar/${id}`, instCaractVar);
  }

  findInstCaractVarById(id: string):Observable<InstCaractVar>{
    return this.httpClient.get<InstCaractVar>(environment.apiEndPoint+`instCaractVar/${id}`);
  }

  deleteInstCaractVarById(id: string):Observable<InstCaractVar>{
    return this.httpClient.delete<InstCaractVar>(environment.apiEndPoint+`instCaractVar/${id}`);
  }

  removeInstCaractVarProduit(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`instCaractVar/${id}`,{produitService:null});
  }

  addInstCaractVarProduit(id:any, idProduit:any){
    return this.httpClient.patch(environment.apiEndPoint+`instCaractVar/${id}`,{produitService:idProduit});
  }

  addIndPromoToList(idProduit: any, idIndPromo: any) {
    return this.httpClient.patch(environment.apiEndPoint + `instCaractVar/${idProduit}/addIndPromo`, { indPromoId: idIndPromo });
  }

  addIndFraisAddToList(idProduit: any, idIndFraisAdd: any) {
    return this.httpClient.patch(environment.apiEndPoint + `instCaractVar/${idProduit}/addIndFraisAdd`, { indFraisAddId: idIndFraisAdd });
  }

  addIndStockToList(idProduit: any, idIndStock: any) {
    return this.httpClient.patch(environment.apiEndPoint + `instCaractVar/${idProduit}/addIndStock`, { indStockId: idIndStock });
  }

  addExpeditionToList(idProduit: any, idExpedition: any) {
    return this.httpClient.patch(environment.apiEndPoint + `instCaractVar/${idProduit}/addExpedition`, { expeditionId: idExpedition });
  }

  deleteIndPromoFromList(idProduit: any, idIndPromo: any) {
    return this.httpClient.patch(environment.apiEndPoint + `instCaractVar/${idProduit}/deleteIndPromo`, { indPromoId: idIndPromo });
  }

  deleteIndFraisAddFromList(idProduit: any, idIndFraisAdd: any) {
    return this.httpClient.patch(environment.apiEndPoint + `instCaractVar/${idProduit}/deleteIndFraisAdd`, { indFraisAddId: idIndFraisAdd });
  }

  deleteIndStockFromList(idProduit: any, idIndStock: any) {
    return this.httpClient.patch(environment.apiEndPoint + `instCaractVar/${idProduit}/deleteIndStock`, { indStockId: idIndStock });
  }

  deleteExpeditionFromList(idProduit: any, idExpedition: any) {
    return this.httpClient.patch(environment.apiEndPoint + `instCaractVar/${idProduit}/deleteExpedition`, { expeditionId: idExpedition });
  }


}
