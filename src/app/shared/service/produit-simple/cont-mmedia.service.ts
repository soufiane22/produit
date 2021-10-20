import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContMmedia } from '../../model/produit-simple/cont-mmedia.model';

@Injectable({
  providedIn: 'root'
})
export class ContMmediaService {
  constructor(private httpClient: HttpClient) { }
  getAllContMmedias(): Observable<ContMmedia[]>{
    return this.httpClient.get<ContMmedia[]>(environment.apiEndPoint+'contMmedia');
  }

  get_ContMmedias_Not_Used(): Observable<ContMmedia[]>{
    return this.httpClient.get<ContMmedia[]>(environment.apiEndPoint+'contMmedia/not_used');
  }

  addContMmedia(contMmedia: any): Observable<ContMmedia>{
    return this.httpClient.post<ContMmedia>(environment.apiEndPoint+'contMmedia', contMmedia);
  }

  editContMmedia(id: any, contMmedia: any){
    return this.httpClient.patch<ContMmedia>(environment.apiEndPoint+`contMmedia/${id}`, contMmedia);
  }

  // editBodyContMmedia(id: any, contMmedia: any){
  //   return this.httpClient.patch<ContMmedia>(environment.apiEndPoint+`contMmedia/contenu/${id}`, contMmedia);
  // }

  findContMmediaById(id: string):Observable<ContMmedia>{
    return this.httpClient.get<ContMmedia>(environment.apiEndPoint+`contMmedia/${id}`);
  }

  deleteContMmediaById(id: string):Observable<ContMmedia>{
    return this.httpClient.delete<ContMmedia>(environment.apiEndPoint+`contMmedia/${id}`);
  }

  removeContMmediaProduit(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`contMmedia/${id}`,{produitService:null});
  }

  addContMmediaProduit(id:any, idP:any){
    return this.httpClient.patch(environment.apiEndPoint+`contMmedia/${id}`,{produitService:idP});
  }

  removeContMmediaGarAssur(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`contMmedia/${id}`,{garAssur:null});
  }

  addContMmediaGarAssur(id:any, idP:any){
    return this.httpClient.patch(environment.apiEndPoint+`contMmedia/${id}`,{garAssur:idP});
  }
  // get_contmedia_garassur(id){
  //   return this.httpClient.get<ContMmedia>(environment.apiEndPoint+`contMmedia/garAssur/${id}`);
  // }
}

