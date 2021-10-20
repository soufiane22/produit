import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IndStock } from '../../model/produit-simple/ind-stock.model';

@Injectable({
  providedIn: 'root'
})
export class IndStockService {

  constructor(private httpClient: HttpClient) { }
  getAllIndStocks(): Observable<IndStock[]>{
    return this.httpClient.get<IndStock[]>(environment.apiEndPoint+'indStock');
  }

  addIndStock(indStock: any): Observable<IndStock>{
    return this.httpClient.post<IndStock>(environment.apiEndPoint+'indStock', indStock);
  }

  editIndStock(id:any, indStock: any){
    return this.httpClient.patch<IndStock>(environment.apiEndPoint+`indStock/${id}`, indStock);
  }

  findIndStockById(id: string):Observable<IndStock>{
    return this.httpClient.get<IndStock>(environment.apiEndPoint+`indStock/${id}`);
  }

  deleteIndStockById(id: string):Observable<IndStock>{
    return this.httpClient.delete<IndStock>(environment.apiEndPoint+`indStock/${id}`);
  }

  removeIndStockProduit(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`indStock/${id}`,{produitService:null});
  }

  addIndStockProduit(id:any, idProduit:any){
    return this.httpClient.patch(environment.apiEndPoint+`indStock/${id}`,{produitService:idProduit});
  }

  removeIndStockInstCaractVar(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`indStock/${id}`,{insCaractVar:null});
  }

  addIndStockInstCaractVar(id:any, idInsCarVar:any){
    return this.httpClient.patch(environment.apiEndPoint+`indStock/${id}`,{insCaractVar:idInsCarVar});
  }
}
