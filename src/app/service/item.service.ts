import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl = 'http://localhost:8083/canteen/api/v1/menu';
  constructor(private http: HttpClient) { }

  getMenu(): Observable<any>
  {
    return this.http.get(`${this.baseUrl}`);
  }

  updateItem(itemId: number, value: any): Observable<any>
  {
    return this.http.put(`${this.baseUrl}/${itemId}`, value);
  }

  deleteItem(itemId: number): Observable<any>
  {
    return this.http.delete(`${this.baseUrl}/${itemId}`, { responseType: 'text' });
  }

  addItemImage(itemId: number, image: Object): Observable<Object>
  {
    return this.http.post(`${this.baseUrl}/${itemId}/itemImages`, image);
  }

  getImageByItemId(itemId: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/${itemId}/itemImages`);
  }

  getAllImages(): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/images`);
  }

  updateImageByItemId(itemId: number, value: any): Observable<any>
  {
    return this.http.put(`${this.baseUrl}/${itemId}/itemImages`,value);
  }

  deleteImageByImageIdAndItemId(itemId: number, imageId: number): Observable<any>
  {
    return this.http.delete(`${this.baseUrl}/${itemId}/itemImages/${imageId}`, { responseType: 'text' });
  }

}
