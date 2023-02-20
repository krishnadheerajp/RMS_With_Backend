import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private httpClient: HttpClient) { }
  user_id: any;

  // To get all the items based on categories
  getItems() {
    return this.httpClient.get("http://localhost:8000/api/categories/");
  }

  // To add items to the cart
  addtoCartItems(data: any) {
    let headers = { "Content-Type": "application/json" };
    return this.httpClient.post("http://127.0.0.1:8000/api/cart/add/", data, { headers });
  }

  // To get the cart items of a particular user
  getUserCartItems() {
    this.user_id = localStorage.getItem("user_id");
    if (this.user_id == null) return this.httpClient.get('http://localhost:8000/api/categories/');
    return this.httpClient.get(`http://localhost:8000/api/productswithcart/${this.user_id}/`);
  }

  // To get the orders placed by a user
  getUserOrders() {
    this.user_id = localStorage.getItem("user_id");
    return this.httpClient.get(`http://localhost:8000/api/myorders/${this.user_id}/`);
  }

  // To remove a item from the cart
  removeFromCart(user_id: any, product_id: any) {
    return this.httpClient.delete(`http://localhost:8000/api/removefromcart/${user_id}/${product_id}`);
  }

  // To update the cart based on changes made by the user
  updateCart(data: any, id: number) {
    let headers = { "Content-Type": "application/json" };
    return this.httpClient.put(`http://localhost:8000/api/cart/update/${id}`, data, { headers });
  }

  // To get the details of a particular item based on the user
  getItem(product_id: any) {
    this.user_id = localStorage.getItem("user_id");
    return this.httpClient.get(`http://localhost:8000/api/product/${this.user_id}/${product_id}`);
  }

  // To show a particular item to user without logging in
  showItem(product_id: any) {
    return this.httpClient.get(`http://localhost:8000/api/products/${product_id}`);
  }

  // To order the items from the cart
  orderItems(items: any) {
    let headers = { "Content-Type": "application/json" };
    return this.httpClient.put(`http://localhost:8000/api/orderitems/${items}`, items, { headers });
  }

  // To post the contact form filled by the user
  contactItem(data: any) {
    this.user_id = localStorage.getItem("user_id");
    let headers = { "Content-Type": "application/json" };
    return this.httpClient.post(`http://localhost:8000/api/users/contact/${this.user_id}`, data, { headers });
  }

  // To post the book a table form filled by the user
  Book_table(data: any) {
    this.user_id = localStorage.getItem("user_id");
    let headers = { "Content-Type": "application/json" };
    return this.httpClient.post(`http://localhost:8000/api/users/bookatable/${this.user_id}`, data, { headers });
  }

  // To get all the products for admin view
  getProducts() {
    return this.httpClient.get('http://localhost:8000/api/products');
  }

  // To delete a particular product
  deleteProduct(product_id: any) {
    return this.httpClient.delete(`http://localhost:8000/api/products/${product_id}`);
  }

  // To update a particular product
  updateProduct(product_id: any, data: any) {
    let headers = { "Content-Type": "application/json" };
    return this.httpClient.put(`http://localhost:8000/api/products/${product_id}`, data, { headers });
  }

  // To add a new product
  addProduct(data: any) {
    let headers = { "Content-Type": "application/json" };
    return this.httpClient.post('http://localhost:8000/api/products', data, { headers });
  }
  // To delete a particular product
  getBookings() {
    return this.httpClient.get('http://127.0.0.1:8000/api/admin/bookatable');
  }

  // To update the bookings made by user
  updateBookings(id: number, data: any) {
    let headers = { "Content-Type": "application/json" };
    return this.httpClient.put(`http://127.0.0.1:8000/api/admin/bookatable/${id}`, data, { headers });
  }

  // To get all the contact queries for admin view
  getContacts() {
    return this.httpClient.get('http://localhost:8000/api/admin/contact');
  }
}
