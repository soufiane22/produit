import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MonteeEnGamme } from '../../model/produit-simple/montee-en-gamme.model';

@Injectable({
  providedIn: 'root'
})
export class MonteeEnGammeService {

  constructor(private httpClient: HttpClient) { }
  getAllMonteeEnGammes(): Observable<MonteeEnGamme[]>{
    return this.httpClient.get<MonteeEnGamme[]>(environment.apiEndPoint+'monteeEnGammes');
  }

  addMonteeEnGamme(monteeEnGamme: any): Observable<MonteeEnGamme>{
    return this.httpClient.post<MonteeEnGamme>(environment.apiEndPoint+'monteeEnGammes', monteeEnGamme);
  }

  editMonteeEnGamme(id: any, monteeEnGamme: any){
    return this.httpClient.patch<MonteeEnGamme>(environment.apiEndPoint+`monteeEnGammes/${id}`, monteeEnGamme);
  }

  findMonteeEnGammeById(id: string):Observable<MonteeEnGamme>{
    return this.httpClient.get<MonteeEnGamme>(environment.apiEndPoint+`monteeEnGammes/${id}`);
  }

  deleteMonteeEnGammeById(id: string):Observable<MonteeEnGamme>{
    return this.httpClient.delete<MonteeEnGamme>(environment.apiEndPoint+`monteeEnGammes/${id}`);
  }

  removeMonteeEnGammeProduct(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`monteeEnGammes/${id}`,{produitService:null});
  }

  addMonteeEnGammeProduit(id:any, idP:any){
    return this.httpClient.patch(environment.apiEndPoint+`monteeEnGammes/${id}`,{produitService:idP});
  }
}
