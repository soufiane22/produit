import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InstCaract } from '../../model/produit-simple/inst-caract.model';

@Injectable({
  providedIn: 'root'
})
export class InstCaracteristiqueService {
  constructor(private httpClient: HttpClient) { }
  getAllInstCaracts(): Observable<InstCaract[]>{
    return this.httpClient.get<InstCaract[]>(environment.apiEndPoint+'instCaracteristiques');
  }

  addInstCaract(instCaract: InstCaract): Observable<InstCaract>{
    return this.httpClient.post<InstCaract>(environment.apiEndPoint+'instCaracteristiques', instCaract);
  }

  editInstCaract(instCaract: InstCaract){
    return this.httpClient.patch<InstCaract>(environment.apiEndPoint+`instCaracteristiques/${instCaract._id}`, instCaract);
  }

  findInstCaractById(id: string):Observable<InstCaract>{
    return this.httpClient.get<InstCaract>(environment.apiEndPoint+`instCaracteristiques/${id}`);
  }

  deleteInstCaractById(id: string):Observable<InstCaract>{
    return this.httpClient.delete<InstCaract>(environment.apiEndPoint+`instCaracteristiques/${id}`);
  }

  removeInstCaractProduct(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`instCaracteristiques/${id}`,{produitService:null});
  }

  addInstCaractProduit(id:any, idP:any){
    return this.httpClient.patch(environment.apiEndPoint+`instCaracteristiques/${id}`,{produitService:idP});
  }
}
