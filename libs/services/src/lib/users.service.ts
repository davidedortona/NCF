import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@ncf/models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURLUsers= environment.apiURL + 'users';
  constructor(
    private http: HttpClient, 
   ) { 
    
  }


  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURLUsers, user);
  }



}
