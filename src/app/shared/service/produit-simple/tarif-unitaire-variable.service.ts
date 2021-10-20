import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TarifUnitVar } from '../../model/produit-simple/tarif-unit-var.model';

@Injectable({
  providedIn: 'root'
})
export class TarifUnitVarService {

  constructor(private httpClient: HttpClient) { }
  getAllTarifUnitVars(): Observable<TarifUnitVar[]>{
    return this.httpClient.get<TarifUnitVar[]>(environment.apiEndPoint+'tarifUnitaireVariables');
  }

  addTarifUnitVar(tarifUnitaireVariable: TarifUnitVar): Observable<TarifUnitVar>{
    return this.httpClient.post<TarifUnitVar>(environment.apiEndPoint+'tarifUnitaireVariables', tarifUnitaireVariable);
  }

  editTarifUnitVar(tarifUnitaireVariable: TarifUnitVar){
    return this.httpClient.patch<TarifUnitVar>(environment.apiEndPoint+`tarifUnitaireVariables/${tarifUnitaireVariable._id}`, tarifUnitaireVariable);
  }

  findTarifUnitVarById(id: string):Observable<TarifUnitVar>{
    return this.httpClient.get<TarifUnitVar>(environment.apiEndPoint+`tarifUnitaireVariables/${id}`);
  }

  deleteTarifUnitVarById(id: string):Observable<TarifUnitVar>{
    return this.httpClient.delete<TarifUnitVar>(environment.apiEndPoint+`tarifUnitaireVariables/${id}`);
  }

  removeTarifUnitVarProduct(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`tarifUnitaireVariables/${id}`,{produitService:null});
  }

  addTarifUnitVarProduit(id:any, idP:any){
    return this.httpClient.patch(environment.apiEndPoint+`tarifUnitaireVariables/${id}`,{produitService:idP});
  }
}
