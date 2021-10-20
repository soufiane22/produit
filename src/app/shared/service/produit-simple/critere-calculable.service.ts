import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CritereCalculable } from '../../model/produit-simple/critere-calculable.model';

@Injectable({
  providedIn: 'root'
})
export class CritereCalculableService {

  constructor(private httpClient: HttpClient) { }
  getAllCritereCalculables(): Observable<CritereCalculable[]>{
    return this.httpClient.get<CritereCalculable[]>(environment.apiEndPoint+'criteresCalculables');
  }

  addCritereCalculable(critereCalculable: CritereCalculable): Observable<CritereCalculable>{
    return this.httpClient.post<CritereCalculable>(environment.apiEndPoint+'criteresCalculables', critereCalculable);
  }

  editCritereCalculable(critereCalculable: CritereCalculable){
    return this.httpClient.patch<CritereCalculable>(environment.apiEndPoint+`criteresCalculables/${critereCalculable._id}`, critereCalculable);
  }

  findCritereCalculableById(id: string):Observable<CritereCalculable>{
    return this.httpClient.get<CritereCalculable>(environment.apiEndPoint+`criteresCalculables/${id}`);
  }

  deleteCritereCalculableById(id: string):Observable<CritereCalculable>{
    return this.httpClient.delete<CritereCalculable>(environment.apiEndPoint+`criteresCalculables/${id}`);
  }

  removeCritereCalculableProduct(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`criteresCalculables/${id}`,{produitService:null});
  }

  addCritereCalculableProduit(id:any, idP:any){
    return this.httpClient.patch(environment.apiEndPoint+`criteresCalculables/${id}`,{produitService:idP});
  }
}
