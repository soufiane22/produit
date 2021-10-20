import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IndFraisAdd } from '../../model/produit-simple/ind-frais-add.model';

@Injectable({
  providedIn: 'root'
})
export class IndFraisAddService {

  constructor(private httpClient: HttpClient) { }
  getAllIndFraisAdds(): Observable<IndFraisAdd[]>{
    return this.httpClient.get<IndFraisAdd[]>(environment.apiEndPoint+'indFraisAdd');
  }

  addIndFraisAdd(indFraisAdd: IndFraisAdd): Observable<IndFraisAdd>{
    return this.httpClient.post<IndFraisAdd>(environment.apiEndPoint+'indFraisAdd', indFraisAdd);
  }

  editIndFraisAdd(id: string, indFraisAdd: IndFraisAdd){
    return this.httpClient.patch<IndFraisAdd>(environment.apiEndPoint+`indFraisAdd/${id}`, indFraisAdd);
  }

  findIndFraisAddById(id: string):Observable<IndFraisAdd>{
    return this.httpClient.get<IndFraisAdd>(environment.apiEndPoint+`indFraisAdd/${id}`);
  }

  deleteIndFraisAddById(id: string):Observable<IndFraisAdd>{
    return this.httpClient.delete<IndFraisAdd>(environment.apiEndPoint+`indFraisAdd/${id}`);
  }

  removeIndFraisAddProduit(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`indFraisAdd/${id}`,{produitService:null});
  }

  addIndFraisAddProduit(id:any, idProduit:any){
    return this.httpClient.patch(environment.apiEndPoint+`indFraisAdd/${id}`,{produitService:idProduit});
  }

  removeIndFraisAddInstCaractVar(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`indFraisAdd/${id}`,{insCaractVar:null});
  }

  addIndFraisAddInstCaractVar(id:any, idInsCarVar:any){
    return this.httpClient.patch(environment.apiEndPoint+`indFraisAdd/${id}`,{insCaractVar:idInsCarVar});
  }
}
