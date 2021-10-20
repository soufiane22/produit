import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GrilleTarifaire } from '../../model/produit-simple/grille-tarifaire.model';

@Injectable({
  providedIn: 'root'
})
export class GrilleTarifaireService {

  constructor(private httpClient: HttpClient) { }
  getAllGrilleTarifaires(): Observable<GrilleTarifaire[]>{
    return this.httpClient.get<GrilleTarifaire[]>(environment.apiEndPoint+'grilleTarifaires');
  }

  addGrilleTarifaire(grilleTarifaire: GrilleTarifaire): Observable<GrilleTarifaire>{
    return this.httpClient.post<GrilleTarifaire>(environment.apiEndPoint+'grilleTarifaires', grilleTarifaire);
  }

  editGrilleTarifaire(grilleTarifaire: GrilleTarifaire){
    return this.httpClient.patch<GrilleTarifaire>(environment.apiEndPoint+`grilleTarifaires/${grilleTarifaire._id}`, grilleTarifaire);
  }

  findGrilleTarifaireById(id: string):Observable<GrilleTarifaire>{
    return this.httpClient.get<GrilleTarifaire>(environment.apiEndPoint+`grilleTarifaires/${id}`);
  }

  deleteGrilleTarifaireById(id: string):Observable<GrilleTarifaire>{
    return this.httpClient.delete<GrilleTarifaire>(environment.apiEndPoint+`grilleTarifaires/${id}`);
  }

  removeGrilleTarifaireProduct(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`grilleTarifaires/${id}`,{produit:null});
  }

  addGrilleTarifaireProduit(id:any, idP:any){
    return this.httpClient.patch(environment.apiEndPoint+`grilleTarifaires/${id}`,{produit:idP});
  }
}
