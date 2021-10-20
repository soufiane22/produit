import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IndPromo } from '../../model/produit-simple/ind-promo.model';

@Injectable({
  providedIn: 'root'
})
export class IndPromoService {

  constructor(private httpClient: HttpClient) { }
  getAllIndPromos(): Observable<IndPromo[]>{
    return this.httpClient.get<IndPromo[]>(environment.apiEndPoint+'indPromo');
  }

  addIndPromo(indPromo: IndPromo): Observable<IndPromo>{
    return this.httpClient.post<IndPromo>(environment.apiEndPoint+'indPromo', indPromo);
  }

  editIndPromo(indPromo: IndPromo){
    return this.httpClient.patch<IndPromo>(environment.apiEndPoint+`indPromo/${indPromo._id}`, indPromo);
  }

  findIndPromoById(id: string):Observable<IndPromo>{
    return this.httpClient.get<IndPromo>(environment.apiEndPoint+`indPromo/${id}`);
  }

  deleteIndPromoById(id: string):Observable<IndPromo>{
    return this.httpClient.delete<IndPromo>(environment.apiEndPoint+`indPromo/${id}`);
  }

  removeIndPromoProduit(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`indPromo/${id}`,{produitService:null});
  }

  addIndPromoProduit(id:any, idProduit:any){
    return this.httpClient.patch(environment.apiEndPoint+`indPromo/${id}`,{produitService:idProduit});
  }

  removeIndPromoInstCaractVar(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`indPromo/${id}`,{insCaractVar:null});
  }

  addIndPromoInstCaractVar(id:any, idInsCarVar:any){
    return this.httpClient.patch(environment.apiEndPoint+`indPromo/${id}`,{insCaractVar:idInsCarVar});
  }
}
