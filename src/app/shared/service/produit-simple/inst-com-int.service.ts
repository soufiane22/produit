import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InstCommentInt } from '../../model/produit-simple/inst-comment-int.model';

@Injectable({
  providedIn: 'root'
})
export class InstComIntService {
  constructor(private httpClient: HttpClient) { }
  getAllInstCommentInts(): Observable<InstCommentInt[]>{
    return this.httpClient.get<InstCommentInt[]>(environment.apiEndPoint+'instComInt');
  }

  addInstCommentInt(instComInt: InstCommentInt): Observable<InstCommentInt>{
    return this.httpClient.post<InstCommentInt>(environment.apiEndPoint+'instComInt', instComInt);
  }

  editInstCommentInt(instComInt: InstCommentInt){
    return this.httpClient.patch<InstCommentInt>(environment.apiEndPoint+`instComInt/${instComInt._id}`, instComInt);
  }

  findInstCommentIntById(id: string):Observable<InstCommentInt>{
    return this.httpClient.get<InstCommentInt>(environment.apiEndPoint+`instComInt/${id}`);
  }

  deleteInstCommentIntById(id: string):Observable<InstCommentInt>{
    return this.httpClient.delete<InstCommentInt>(environment.apiEndPoint+`instComInt/${id}`);
  }

  removeInstCommentIntProduit(id: string){
    return this.httpClient.patch(environment.apiEndPoint+`instComInt/${id}`,{produitService:null});
  }

  addInstCommentIntProduit(id:any, idP:any){
    return this.httpClient.patch(environment.apiEndPoint+`instComInt/${id}`,{produitService:idP});
  }
}
