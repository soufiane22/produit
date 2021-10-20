import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = new HttpHeaders();

  constructor(private httpClient: HttpClient, private authService: AuthentificationService) {
    this.setHeaders();
  }

  setHeaders(){
    this.authService.loadUserData();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', '*/*');
    this.headers.append('Authorization', this.authService.authToken);
  }

  getAllUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(environment.apiEndPoint+'users');
  }

  registerUser(user: any):Observable<User>{
    return this.httpClient.post<User>(environment.apiEndPoint+'users/register',user);
  }

  editUser(id: any, user: any):Observable<User>{
    return this.httpClient.patch<User>(environment.apiEndPoint+`users/${id}`,user);
  }

  deleteUser(id: string):Observable<User>{
    return this.httpClient.delete<User>(environment.apiEndPoint+`users/${id}`);
  }

  findUserById(id: string):Observable<User>{
    return this.httpClient.get<User>(environment.apiEndPoint+`users/${id}`);
  }


}
