/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  constructor() { }

  setToken(data){
    localStorage.setItem(TOKEN, data);
  }

  getToken() : string {
    return localStorage.getItem(TOKEN);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }

  isValidToken(){
    const token = this.getToken();
    if(token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenExpired(tokenDecode.exp)
    } else {
      return false;
    }
  }

  getCategory(){
    return localStorage.getItem('category');
  }

  setCategory(category){
    localStorage.setItem('category',category);
  }

  removeCategory(){
   localStorage.removeItem('category');
  }

  setEvent(event: any){
    localStorage.setItem('event',event);
  }

  getEvent(){
     return localStorage.getItem('event');
  }

  setCategoryIntera(category){
    localStorage.setItem('catintera', category)
  }

  getCategoryIntera(){
    return localStorage.getItem('catintera');
  }

  private _tokenExpired(expiration): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  getUserIdFromToken(){
    const token = this.getToken();
    if(token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if(tokenDecode){
        return tokenDecode.userId;
      } else {
        return null;
      }
      
    } else {
      return null;
    }
  }
}
