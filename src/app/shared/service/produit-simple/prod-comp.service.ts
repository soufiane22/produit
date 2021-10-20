import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProduitComposant } from '../../model/produit-simple/produit-composant.model';

@Injectable({
  providedIn: 'root'
})
export class ProdCompService {
  constructor(private httpClient: HttpClient) { }
  getAllProduitComposants(): Observable<ProduitComposant[]>{
    return this.httpClient.get<ProduitComposant[]>(environment.apiEndPoint+'prodComp');
  }

  addProduitComposant(prodComp: ProduitComposant): Observable<ProduitComposant>{
    return this.httpClient.post<ProduitComposant>(environment.apiEndPoint+'prodComp', prodComp);
  }

  editProduitComposant(prodComp: ProduitComposant){
    return this.httpClient.patch<ProduitComposant>(environment.apiEndPoint+`prodComp/${prodComp._id}`, prodComp);
  }

  findProduitComposantById(id: string):Observable<ProduitComposant>{
    return this.httpClient.get<ProduitComposant>(environment.apiEndPoint+`prodComp/${id}`);
  }

  deleteProduitComposantById(id: string):Observable<ProduitComposant>{
    return this.httpClient.delete<ProduitComposant>(environment.apiEndPoint+`prodComp/${id}`);
  }

}
