import { HttpClient, HttpParams } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Banner } from '@ncf/models';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  var = 0;
  resp:any;
  id:any;
  apiURLBanners = environment.apiURL + 'banners';
  
  constructor(private http: HttpClient) { }

  getBanners() : Observable<Banner[]> {
    
    return this.http.get<Banner[]>(this.apiURLBanners);
  }

 

  getBannersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLBanners}/get/count`)
      .pipe(map((objectValue: any) => objectValue.bannersCount));
  }

  createBanner(bannerData: FormData): Observable<Banner> {
    return this.http.post<Banner>(this.apiURLBanners, bannerData);
  }

  updateBanner(bannerData: FormData, bannerid: string): Observable<Banner> {
    return this.http.put<Banner>(`${this.apiURLBanners}/${bannerid}`, bannerData);
  }

  deleteBanner(bannerId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLBanners}/${bannerId}`);
  }

  getBanner(bannerId: string): Observable<Banner> {
    return this.http.get<Banner>(`${this.apiURLBanners}/${bannerId}`);
  }

  sendIndex(index: any){
    this.var = index;
    
    
  }

  sendisHomeBanner(res: any){
    this.resp = res;
    console.log("service " + this.resp)
    
  }

  receiveishomeBanner(){
    console.log('return ishomebanner' + this.resp);
    return this.resp;
  }
  receiveIndex(){
    return this.var;
  }

  sendActualCatID(id: string){
    this.id = id;
  }

  getActualCatID(){
    return this.id;
  }




}
