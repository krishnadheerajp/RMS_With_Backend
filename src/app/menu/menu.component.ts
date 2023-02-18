import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
items:any;
breakfastItems:any;
starterItems:any;
lunchItems:any;
drinkItems:any;
data:any;
user_id:number=Number(localStorage.getItem("user_id"));
message:any;
pid:any;
cart:any;
constructor(private itemService:ItemService){}
ngOnInit(){
  this.itemService.getUserCartItems().subscribe((response:any)=>{
    console.log(response);
    // if(response.products)
    // console.log(response.all_products[0].products);
    this.breakfastItems=response.all_products[0].products;
    this.starterItems=response.all_products[1].products;
    this.lunchItems=response.all_products[2].products;
    this.drinkItems=response.all_products[3].products;
    
    this.cart=response.cartProducts;
    });
}
addToCart(product_id:any,product_price:any){
  this.user_id=Number(localStorage.getItem("user_id"));
  this.data={"user_id":this.user_id,"product_id":product_id,"amount":product_price};
  console.log(this.data);
  this.itemService.addtoCartItems(this.data).subscribe((response:any)=>{
    console.log(response);
    if(response.success===true){
      this.cart=response.cartProducts;
      // console.log(this.cart);
    }
  });
}

  checkInCart(product:any){
    let cp=this.cart.find((p:any)=>{
      // console.log(p.pivot.user_id==4,p.pivot.product_id==product.id);
      return p.pivot.user_id==this.user_id && p.pivot.product_id==product.id;
    })
    if(cp===undefined){
      return false;
    }
    return true;
  }
  removeFromCart(product_id:any){
    this.itemService.removeFromCart(this.user_id,product_id).subscribe((response:any)=>{
        if(response.success===true){
          this.cart=response.cartProducts;
          // console.log(this.cart);
        }
    });
  }
}