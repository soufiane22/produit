import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TarifSaisonnier } from '../../model/produit-simple/tarif-saisonnier.model';

@Injectable({
  providedIn: 'root'
})
export class TarifSaisonnierService {

  constructor(private httpClient: HttpClient) { }

  getAllTarifSaisonniers(): Observable<TarifSaisonnier[]>{
    return this.httpClient.get<TarifSaisonnier[]>(environment.apiEndPoint+'tarifSaisonniers');
  }

  addTarifSaisonnier(tarifSaisonnier: TarifSaisonnier): Observable<TarifSaisonnier>{
    return this.httpClient.post<TarifSaisonnier>(environment.apiEndPoint+'tarifSaisonniers', tarifSaisonnier);
  }

  editTarifSaisonnier(tarifSaisonnier: TarifSaisonnier){
    return this.httpClient.patch<TarifSaisonnier>(environment.apiEndPoint+`tarifSaisonniers/${tarifSaisonnier._id}`, tarifSaisonnier);
  }

  findTarifSaisonnierById(id: string):Observable<TarifSaisonnier>{
    return this.httpClient.get<TarifSaisonnier>(environment.apiEndPoint+`tarifSaisonniers/${id}`);
  }

  deleteTarifSaisonnierById(id: string):Observable<TarifSaisonnier>{
    return this.httpClient.delete<TarifSaisonnier>(environment.apiEndPoint+`tarifSaisonniers/${id}`);
  }

  removeTarifSaisonnierProduct(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`tarifSaisonniers/${id}`,{produitService:null});
  }

  addTarifSaisonnierProduit(id:any, idP:any){
    return this.httpClient.patch(environment.apiEndPoint+`tarifSaisonniers/${id}`,{produitService:idP});
  }
}
