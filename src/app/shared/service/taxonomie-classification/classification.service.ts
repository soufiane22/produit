import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Classification } from '../../model/taxonomie-classification/classification.model';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

  constructor(private httpClient: HttpClient) { }
  getAllClassificationForProduct(): Observable<Classification[]>{
    return this.httpClient.get<Classification[]>(environment.apiClassification+'classif-label/get-all-classif-label-for-product');
  }

  getClassificationById(id:string): Observable<Classification>{
    return this.httpClient.get<Classification>(environment.apiClassification+`classif-label/${id}`);
  }
}
