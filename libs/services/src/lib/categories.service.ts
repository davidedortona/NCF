import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category } from '@ncf/models';
import { environment } from 'environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiURLCategories = environment.apiURL + 'categories';
  category: Category;
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiURLCategories}`);
  }

  createCategory(categoryData: FormData): Observable<Category> {
    return this.http.post<Category>(`${this.apiURLCategories}`, categoryData);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  deleteCategory(categoryId: string): Observable<Object> {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return this.http.delete<Object>(`${this.apiURLCategories}/${categoryId}`);
}

  getCategory(categoryId: string): Observable<Category> {
  return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`);
}

  updateCategory(categoryData: FormData, id: string): Observable<Category> {
  return this.http.put<Category>(`${this.apiURLCategories}/${id}`, categoryData);
}

  sendCategory(category: Category){
    console.log('send category');
    this.category = category;
  }

  receiveCategory(){
    console.log('receive category: ' + this.category);
    return this.category;
  }

  getCategoriesCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLCategories}/get/count`)
      .pipe(map((objectValue: any) => objectValue.categoriesCount));

  }




}
