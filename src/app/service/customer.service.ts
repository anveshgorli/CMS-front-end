
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://localhost:8083/canteen/api/v1/customers';
  constructor(private http: HttpClient) { }

  getCustomerList(): Observable<any>
  {
    return this.http.get(`${this.baseUrl}`);
  }

  addCustomer(customer: Object): Observable<Object>
  {
    return this.http.post(`${this.baseUrl}`, customer);
  }

  getCustomer(id: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateCustomer(id: number, value: any): Observable<any>
  {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  saveCouponByCustomerId(id: number, coupon: Object): Observable<any>
  {
    return this.http.post(`${this.baseUrl}/${id}/coupons`, coupon);
  }

  getAllCoupnsByCustomerId(id: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/${id}/coupons`);
  }

  updateCoupon(custId: number, couponId: number, value: any): Observable<any>
  {
    return this.http.put(`${this.baseUrl}/${custId}/coupons/${couponId}`, value);
  }

  getCustomerByUsernameAndEmail(username: string, email: string): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/${username}/${email}`);
  }
}
