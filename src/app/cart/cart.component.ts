import { Component,OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private itemService:ItemService){}
  cart:any;
  // Send user id from here
  ngOnInit(){
    this.itemService.getUserCartItems().subscribe((response:any)=>{
      console.log(response);
      this.cart=response.cartProducts;
      console.log(this.cart);
    })
  }

  updateCart(index:number,sign:string){
    if(sign=="plus"){
      this.cart[index].pivot.quantity+=1;
    }
    else{
      this.cart[index].pivot.quantity-=1;
    }
    this.cart[index].pivot.amount=this.cart[index].pivot.quantity*this.cart[index].price;
    let body={"quantity":this.cart[index].pivot.quantity,"amount":this.cart[index].pivot.amount};

    if(this.cart[index].pivot.quantity>0){
      this.itemService.updateCart(body,this.cart[index].pivot.id).subscribe((response)=>{
          console.log(response);
      });
    }
    else{
      this.itemService.removeFromCart(this.cart[index].pivot.user_id,this.cart[index].pivot.product_id).subscribe((response:any)=>{
        if(response.success===true)
        {
          this.cart=response.cartProducts;
        }
      })
    }

  }

}
