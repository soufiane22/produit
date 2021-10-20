import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../model/menu.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient: HttpClient) { }

  get_all_menu(): Observable<Menu[]>{
    return this.httpClient.get<Menu[]>(environment.apiEndPoint+`/menu`);
  }

  get_menu_by_id(id:string): Observable<Menu>{
    return this.httpClient.get<Menu>(environment.apiEndPoint+`/menu/${id}`);
  }

  add_menu(menu:Menu): Observable<Menu>{
    return this.httpClient.post<Menu>(environment.apiEndPoint+`/menu/`, menu);
  }

  apdate_menu(menu:Menu): Observable<Menu>{
    return this.httpClient.patch<Menu>(environment.apiEndPoint+`/menu/${menu._id}`, menu);
  }

  delete_menu(id:string): Observable<Menu>{
    return this.httpClient.delete<Menu>(environment.apiEndPoint+`/menu/${id}`);
  }
}
