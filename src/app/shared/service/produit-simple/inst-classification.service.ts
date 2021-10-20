import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InstClassif } from '../../model/produit-simple/inst-classif.model';

@Injectable({
  providedIn: 'root'
})
export class InstClassificationService {

  constructor(private httpClient: HttpClient) { }
  getAllInstClassifs(): Observable<InstClassif[]>{
    return this.httpClient.get<InstClassif[]>(environment.apiEndPoint+'instClassifications');
  }

  addInstClassif(instClassif: any): Observable<InstClassif>{
    return this.httpClient.post<InstClassif>(environment.apiEndPoint+'instClassifications', instClassif);
  }

  editInstClassif(id:string, instClassif: any){
    return this.httpClient.patch<InstClassif>(environment.apiEndPoint+`instClassifications/${id}`, instClassif);
  }

  findInstClassifById(id: string):Observable<InstClassif>{
    return this.httpClient.get<InstClassif>(environment.apiEndPoint+`instClassifications/${id}`);
  }

  deleteInstClassifById(id: string):Observable<InstClassif>{
    return this.httpClient.delete<InstClassif>(environment.apiEndPoint+`instClassifications/${id}`);
  }

  removeInstClassifProduct(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`instClassifications/${id}`,{produitService:null});
  }

  addInstClassifProduit(id:any, idP:any){
    return this.httpClient.patch(environment.apiEndPoint+`instClassifications/${id}`,{produitService:idP});
  }
}
