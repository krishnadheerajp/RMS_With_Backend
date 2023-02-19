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
    if(this.user_id==null) return this.httpClient.get('http://localhost:8000/api/categories/');
    return this.httpClient.get(`http://localhost:8000/api/productswithcart/${this.user_id}/`);
  }
  getUserOrders(){
    this.user_id=localStorage.getItem("user_id");
    return this.httpClient.get(`http://localhost:8000/api/myorders/${this.user_id}/`);
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
  showItem(product_id:any){
    return this.httpClient.get(`http://localhost:8000/api/products/${product_id}`);
  }
  orderItems(items:any){
    let headers={"Content-Type":"application/json"};
    return this.httpClient.put(`http://localhost:8000/api/orderitems/${items}`,items,{headers});
  }

  contactItem(data:any)
  {  
    this.user_id=localStorage.getItem("user_id");
    let headers={"Content-Type":"application/json"};
    return this.httpClient.post(`http://localhost:8000/api/users/contact/${this.user_id}`,data,{headers});
  }
  Book_table(data:any)
  {
    this.user_id=localStorage.getItem("user_id");
    let headers={"Content-Type":"application/json"};
    return this.httpClient.post(`http://localhost:8000/api/users/bookatable/${this.user_id}`,data,{headers});
    
  }
  getProducts(){
    return this.httpClient.get('http://localhost:8000/api/products');
  }
  deleteProduct(product_id:any){
    return this.httpClient.delete(`http://localhost:8000/api/products/${product_id}`);
  }
  updateProduct(product_id:any,data:any){
    let headers={"Content-Type":"application/json"};
    return this.httpClient.put(`http://localhost:8000/api/products/${product_id}`,data,{headers});
  }
  addProduct(data:any){
    let headers={"Content-Type":"application/json"};
    return this.httpClient.post('http://localhost:8000/api/products',data,{headers});
  }
  getBookings(){
    return this.httpClient.get('http://127.0.0.1:8000/api/admin/bookatable');
  }
  updateBookings(id:number,data:any){
    let headers={"Content-Type":"application/json"};
    return this.httpClient.put(`http://127.0.0.1:8000/api/admin/bookatable/${id}`,data,{headers});
  }
  getContacts(){
    return this.httpClient.get('http://localhost:8000/api/admin/contact');
  }

}
