import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8083/canteen/api/v1/orders';

  constructor(private http: HttpClient) { }

  addOrder(order: Object): Observable<Object>
  {
    return this.http.post(`${this.baseUrl}`, order);
  }

  addOrderDetails(id: string, orderDetails: Object): Observable<Object>
  {
    return this.http.post(`${this.baseUrl}/${id}/orderdetails`, orderDetails);
  }

  getAllOrders(): Observable<any>
  {
    return this.http.get(`${this.baseUrl}`);
  }

  getAllOrderDetailsByOrderId(id: string): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/${id}/orderdetails`);
  }

  updateOrder(id: string, value: any): Observable<any>
  {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

 //delete orderDetails for specific orderId
 deleteOrderDetailsByOrderId(orderId: string): Observable<any>
 {
   return this.http.delete(`${this.baseUrl}/${orderId}/orderdetails`, { responseType: 'text' });
 }

  //delete order by orderId
  deleteOrder(id: string): Observable<any>
  {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  //get all orderDetails for specific vendorId
  getAllOrderDetailsByVendorId(vendorId: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/vendorid=${vendorId}/orderdetails`);
  }

  //update orderdetails by orderDetailsId
  updateOrderDetails(id: number, value: any): Observable<any>
  {
    return this.http.put(`${this.baseUrl}/orderdetails/${id}`, value);
  }

  //get an order by orderId
  getOrder(id: string): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
