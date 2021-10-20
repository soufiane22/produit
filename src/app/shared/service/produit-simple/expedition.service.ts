import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Expedition } from '../../model/produit-simple/expedition.model';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionService {
  constructor(private httpClient: HttpClient) { }
  getAllExpeditions(): Observable<Expedition[]>{
    return this.httpClient.get<Expedition[]>(environment.apiEndPoint+'expedition');
  }

  addExpedition(contMmedia: Expedition): Observable<Expedition>{
    return this.httpClient.post<Expedition>(environment.apiEndPoint+'expedition', contMmedia);
  }

  editExpedition(contMmedia: Expedition){
    return this.httpClient.patch<Expedition>(environment.apiEndPoint+`expedition`, contMmedia);
  }

  findExpeditionById(id: string):Observable<Expedition>{
    return this.httpClient.get<Expedition>(environment.apiEndPoint+`expedition/${id}`);
  }
  
  getExpeditionByproduit(id: string):Observable<Expedition>{
    return this.httpClient.get<Expedition>(environment.apiEndPoint+`expedition/ExpByPro/${id}`);
  }

  deleteExpeditionById(id: string):Observable<Expedition>{
    return this.httpClient.delete<Expedition>(environment.apiEndPoint+`expedition/${id}`);
  }

  removeExpeditionProduit(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`expedition/${id}`,{produitService:null});
  }

  addExpeditionProduit(id:any, idProduit:any){
    return this.httpClient.patch(environment.apiEndPoint+`expedition/${id}`,{produitService:idProduit});
  }

  removeExpeditionInstCaractVar(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`expedition/${id}`,{insCaractVar:null});
  }

  addExpeditionInstCaractVar(id:any, idInsCarVar:any){
    return this.httpClient.patch(environment.apiEndPoint+`expedition/${id}`,{insCaractVar:idInsCarVar});
  }
}
