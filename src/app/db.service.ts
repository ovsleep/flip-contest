import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, ResponseContentType } from '@angular/http'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Order } from './order'
import { OrderDetails } from './orderDetails'

@Injectable()
export class DbService {
  apiEndPoint:string = 'http://localhost:3000/api/db';

  constructor(private http:Http) {

  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }

  getOrders():Promise<Order[]>{
    var array:Order[] = [];
    return this.http.get(`${this.apiEndPoint}`)
    .toPromise()
    .then((response) => {
      let res = response.json() as any[];
      res.forEach(o =>{
        let order = Object.create(Order.prototype);
        array.push(Object.assign(order, o))
      });
      return array;
    })
    .catch(this.handleError);
  }

  getOrder(orderId: number):Promise<OrderDetails[]>{
    var array:OrderDetails[] = [];
    return this.http.get(`${this.apiEndPoint}/${orderId}`)
    .toPromise()
    .then((response) => {
      let res = response.json() as any[];
      res.forEach(o =>{
        let order = Object.create(OrderDetails.prototype);
        array.push(Object.assign(order, o))
      });
      return array;
    })
    .catch(this.handleError);
  }
}
