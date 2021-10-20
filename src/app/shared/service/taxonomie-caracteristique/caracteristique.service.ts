import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Caracteristique } from '../../model/taxonomie-classification/caracteristique.model';

@Injectable({
  providedIn: 'root'
})
export class CaracteristiqueService {

  constructor(private httpClient: HttpClient) { }
  getAllCaracteristiqueForProduct(): Observable<Caracteristique[]>{
    return this.httpClient.get<Caracteristique[]>(environment.apiCaracteristique+'caracteristique/get-all-caracteristique-for-product');
  }

  getCaracteristiqueById(id:string): Observable<Caracteristique>{
    return this.httpClient.get<Caracteristique>(environment.apiCaracteristique+`caracteristique/${id}`);
  }
}
