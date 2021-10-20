import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Annotation } from '../../model/produit-simple/annotation.model';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  constructor(private httpClient: HttpClient) { }
  getAllAnnotations(): Observable<Annotation[]>{
    return this.httpClient.get<Annotation[]>(environment.apiEndPoint+'annotations');
  }

  addAnnotation(annotation: Annotation): Observable<Annotation>{
    return this.httpClient.post<Annotation>(environment.apiEndPoint+'annotations', annotation);
  }

  editAnnotation(annotation: Annotation){
    return this.httpClient.patch<Annotation>(environment.apiEndPoint+`annotations/${annotation._id}`, annotation);
  }

  findAnnotationById(id: string):Observable<Annotation>{
    return this.httpClient.get<Annotation>(environment.apiEndPoint+`annotations/${id}`);
  }

  deleteAnnotationById(id: string):Observable<Annotation>{
    return this.httpClient.delete<Annotation>(environment.apiEndPoint+`annotations/${id}`);
  }

  removeAnnotationProduct(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`annotations/${id}`,{produitService:null});
  }

  addAnnotationProduit(id:any, idP:any){
    return this.httpClient.patch(environment.apiEndPoint+`annotations/${id}`,{produitService:idP});
  }
}
