import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  authToken: string;
  user: User;
  constructor(private httpClient: HttpClient) { }

  logout() {
    this.user = null;
    this.authToken = null;
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
  }

  authenticateUser(user: any): Observable<AuthRepType> {
    return this.httpClient.post<AuthRepType>(environment.apiEndPoint + 'users/authenticate', user);
  }

  storeUserData(token: string, user: User) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadUserData(){
    this.authToken=localStorage.getItem('id_token');
    this.user=JSON.parse(localStorage.getItem('user'));
  }

  loggedIn(){
    return this.authToken!==null;
  }

}

export interface AuthRepType {
  success: boolean;
  msg: string;
  token?: string;
  user?: User;
}
