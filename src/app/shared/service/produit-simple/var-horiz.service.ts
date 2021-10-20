import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VarHoriz } from '../../model/produit-simple/var-horiz.model';

@Injectable({
  providedIn: 'root'
})
export class VarHorizService {

  constructor(private httpClient: HttpClient) { }
  getAllVarHorizs(): Observable<VarHoriz[]>{
    return this.httpClient.get<VarHoriz[]>(environment.apiEndPoint+'varHoriz');
  }

  addVarHoriz(varHoriz: VarHoriz): Observable<VarHoriz>{
    return this.httpClient.post<VarHoriz>(environment.apiEndPoint+'varHoriz', varHoriz);
  }

  editVarHoriz(varHoriz: VarHoriz){
    return this.httpClient.patch<VarHoriz>(environment.apiEndPoint+`varHoriz/${varHoriz._id}`, varHoriz);
  }

  findVarHorizById(id: string):Observable<VarHoriz>{
    return this.httpClient.get<VarHoriz>(environment.apiEndPoint+`varHoriz/${id}`);
  }

  deleteVarHorizById(id: string):Observable<VarHoriz>{
    return this.httpClient.delete<VarHoriz>(environment.apiEndPoint+`varHoriz/${id}`);
  }
}
