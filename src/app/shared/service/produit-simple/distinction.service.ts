import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Distinction } from '../../model/produit-simple/distinction.model';

@Injectable({
  providedIn: 'root'
})
export class DistinctionService {

  constructor(private httpClient: HttpClient) { }
  getAllDistinctions(): Observable<Distinction[]>{
    return this.httpClient.get<Distinction[]>(environment.apiEndPoint+'distinctions');
  }

  addDistinction(distinction: any): Observable<Distinction>{
    return this.httpClient.post<Distinction>(environment.apiEndPoint+'distinctions', distinction);
  }

  editDistinction(id: any, distinction: any){
    return this.httpClient.patch<Distinction>(environment.apiEndPoint+`distinctions/${id}`, distinction);
  }

  findDistinctionById(id: string):Observable<Distinction>{
    return this.httpClient.get<Distinction>(environment.apiEndPoint+`distinctions/${id}`);
  }

  deleteDistinctionById(id: string):Observable<Distinction>{
    return this.httpClient.delete<Distinction>(environment.apiEndPoint+`distinctions/${id}`);
  }

  removeDistinctionProduct(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`distinctions/${id}`,{produitService:null});
  }

  addDistinctionProduit(id:any, idP:any){
    return this.httpClient.patch(environment.apiEndPoint+`distinctions/${id}`,{produitService:idP});
  }
}
