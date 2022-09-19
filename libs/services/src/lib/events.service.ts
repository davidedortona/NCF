import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  apiURLEvents = environment.apiURL + 'events';
  eventImages: any;
  constructor(private http: HttpClient) { 
    
  }

  getEvents(categoriesFilter?: any ): Observable<Event[]> {
   let params = new HttpParams();
    if(categoriesFilter) {
      params = params.append('category', categoriesFilter);
      console.log(params)
      console.log("event service, filter: " + params);
    return this.http.get<Event[]>(this.apiURLEvents, {params: params});
    }else {
      return this.http.get<Event[]>(this.apiURLEvents);
    }
    
  }

  setGallery(evento){
    this.eventImages = evento;
  }

  getGallery(){
    return this.eventImages;
  }

  getAllEvents(){
    return this.http.get<Event[]>(this.apiURLEvents + '/allEvents');
  }

  createEvent(eventData: FormData): Observable<Event> {
    return this.http.post<Event>(this.apiURLEvents, eventData);
  }

  getEvent(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiURLEvents}/${eventId}`);
  }

  updateEvent(eventData: FormData, eventid: string): Observable<Event> {
    return this.http.put<Event>(`${this.apiURLEvents}/${eventid}`, eventData);
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLEvents}/${eventId}`);
  }

  getEventsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLEvents}/get/count`)
      .pipe(map((objectValue: any) => objectValue.eventsCount));
  }

  addGallery(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('images', file);

    const req = new HttpRequest('POST', `${this.apiURLEvents}/gallery-images/63122f75cf44120d08953c0d`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  updateGallery(file: File[], eventid: string): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    
    file.forEach(file => {
      formData.append(`images`, file);
    });
    

    const req = new HttpRequest('PUT', `${this.apiURLEvents}/gallery-images/${eventid}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);

    //return this.http.put<any>(`${this.apiURLEvents}/${eventid}`, file);

  }

  
  
}
