import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GarAssur } from '../../model/produit-simple/gar-assur.model';

@Injectable({
  providedIn: 'root'
})
export class GarAssurService {
  lang:any;
  constructor(private httpClient: HttpClient) {
    this.lang=localStorage.getItem('code');
   }
  getAllGarAssurs(): Observable<GarAssur[]> {
    return this.httpClient.get<GarAssur[]>(environment.apiEndPoint + 'garAssur/'+ this.lang);
  }

  addGarAssur(garAssur: any): Observable<GarAssur> {
    return this.httpClient.post<GarAssur>(environment.apiEndPoint + 'garAssur', garAssur);
  }

  editGarAssur(id:any, garAssur: any) {
    return this.httpClient.patch<GarAssur>(environment.apiEndPoint + `garAssur/${id}`, garAssur);
  }

  findGarAssurById(id: string): Observable<GarAssur> {
    return this.httpClient.get<GarAssur>(environment.apiEndPoint + `garAssur/${id}/`+ this.lang);
  }

  deleteGarAssurById(id: string): Observable<GarAssur> {
    return this.httpClient.delete<GarAssur>(environment.apiEndPoint + `garAssur/${id}`);
  }

  removeGarAssurProduit(id: string) {
    return this.httpClient.patch(environment.apiEndPoint + `garAssur/${id}`, { produitService: null });
  }

  addGarAssurProduit(id: any, idProduit: any) {
    return this.httpClient.patch(environment.apiEndPoint + `garAssur/${id}/addProduitService`, { produitService: idProduit });
  }

  deleteContMmediaFromList(idgarAssur: any, idContMmedia: any) {
    console.log('idContMmedia',idContMmedia);
    return this.httpClient.patch(environment.apiEndPoint + `garAssur/${idgarAssur}/deleteContMmedia`, { contMmediaId: idContMmedia });
  }
  addContMmediaToList(idgarAssur: any, idContMmedia: any) {

    return this.httpClient.patch(environment.apiEndPoint + `garAssur/${idgarAssur}/addContMmedia`, { contMmediaId: idContMmedia });
  }

}
