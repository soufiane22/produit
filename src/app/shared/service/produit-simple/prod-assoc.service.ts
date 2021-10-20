import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProduitAssocie } from '../../model/produit-simple/produit-associe.model';

@Injectable({
  providedIn: 'root'
})
export class ProdAssocService {
  constructor(private httpClient: HttpClient) { }
  getAllProduitAssocies(): Observable<ProduitAssocie[]>{
    return this.httpClient.get<ProduitAssocie[]>(environment.apiEndPoint+'prodAssoc');
  }

  addProduitAssocie(prodAssoc: ProduitAssocie): Observable<ProduitAssocie>{
    return this.httpClient.post<ProduitAssocie>(environment.apiEndPoint+'prodAssoc', prodAssoc);
  }

  editProduitAssocie(prodAssoc: ProduitAssocie){
    return this.httpClient.patch<ProduitAssocie>(environment.apiEndPoint+`prodAssoc/${prodAssoc._id}`, prodAssoc);
  }

  findProduitAssocieById(id: string):Observable<ProduitAssocie>{
    return this.httpClient.get<ProduitAssocie>(environment.apiEndPoint+`prodAssoc/${id}`);
  }

  deleteProduitAssocieById(id: string):Observable<ProduitAssocie>{
    return this.httpClient.delete<ProduitAssocie>(environment.apiEndPoint+`prodAssoc/${id}`);
  }
}

