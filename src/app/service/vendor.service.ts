import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private baseUrl = 'http://localhost:8083/canteen/api/v1/vendors';

  constructor(private http: HttpClient) { }

  addVendor(vendor: Object): Observable<Object>
  {
    return this.http.post(`${this.baseUrl}`, vendor);
  }

  getAllVendors(): Observable<any>
  {
    return this.http.get(`${this.baseUrl}`);
  }

  getVendor(id: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addItemByVendorId(vendorId: number, item: any)
  {
    return this.http.post(`${this.baseUrl}/${vendorId}/menu`, item);
  }

  getMenuByVendorId(vendorId: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/${vendorId}/menu`);
  }

  deleteItemByItemIdAndVendorId(itemId: number, vendorId: number)
  {
    return this.http.delete(`${this.baseUrl}/${vendorId}/menu/${itemId}`, { responseType: 'text' });
  }

  getVendorByUsernameAndEmail(username: string, email: string): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/${username}/${email}`);
  }

  updateVendor(id: number, value: any): Observable<any>
  {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
}
