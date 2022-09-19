import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  constructor(private http: HttpClient) { }

  getVisitsCount(): Observable<number> {
    return this.http.get<number>(environment.apiURL + 'visitor/settings/getVisitors');
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  setVisit(){
    console.log('visit set');
     // eslint-disable-next-line @typescript-eslint/ban-types
     this.http.put('http://localhost:3000/api/v1/visitor/setvisit','').subscribe();
     
  }
}
