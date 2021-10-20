import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Marque } from '../../model/produit-simple/marque.model';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  constructor(private httpClient: HttpClient) { }
  getAllMarques(): Observable<Marque[]>{
    return this.httpClient.get<Marque[]>(environment.apiEndPoint+'marques');
  }

  addMarque(marque: Marque): Observable<Marque>{
    return this.httpClient.post<Marque>(environment.apiEndPoint+'marques', marque);
  }

  editMarque(marque: Marque){
    return this.httpClient.patch<Marque>(environment.apiEndPoint+`marques/${marque._id}`, marque);
  }

  findMarqueById(id: string):Observable<Marque>{
    return this.httpClient.get<Marque>(environment.apiEndPoint+`marques/${id}`);
  }

  deleteMarqueById(id: string):Observable<Marque>{
    return this.httpClient.delete<Marque>(environment.apiEndPoint+`marques/${id}`);
  }

  removeMarqueProduct(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`marques/${id}`,{produitService:null});
  }

  addMarqueProduit(id:any, idP:any){
    return this.httpClient.patch(environment.apiEndPoint+`marques/${id}`,{produitService:idP});
  }
}
