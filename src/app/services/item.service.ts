import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private httpClient:HttpClient) { }
  user_id:any;
  getItems(){
    return this.httpClient.get("http://localhost:8000/api/categories/");
  }
  addtoCartItems(data:any){
    let headers={"Content-Type":"application/json"};
    return this.httpClient.post("http://127.0.0.1:8000/api/cart/add/",data,{headers});
  }
  getUserCartItems(){
    this.user_id=localStorage.getItem("user_id");
    return this.httpClient.get(`http://localhost:8000/api/productswithcart/${this.user_id}/`);
  }
  removeFromCart(user_id:any,product_id:any){
    return this.httpClient.delete(`http://localhost:8000/api/removefromcart/${user_id}/${product_id}`);
  }
  updateCart(data:any,id:number)
  {
    let headers={"Content-Type":"application/json"};
    return this.httpClient.put(`http://localhost:8000/api/cart/update/${id}`,data,{headers});
  }
  getItem(product_id:any){
    this.user_id=localStorage.getItem("user_id");
    return this.httpClient.get(`http://localhost:8000/api/product/${this.user_id}/${product_id}`);
  }
}
