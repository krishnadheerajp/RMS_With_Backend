import { Component,OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sel-item',
  templateUrl: './sel-item.component.html',
  styleUrls: ['./sel-item.component.css']
})
export class SelItemComponent {
  cart:any;
  id:number=0;
  item:any=[];
  data:any;
  user_id:number=Number(localStorage.getItem("user_id"));
constructor(private itemService:ItemService,private route: ActivatedRoute){}

ngOnInit(){
  this.id=Number(this.route.snapshot.paramMap.get('id'));
  this.itemService.getItem(this.id).subscribe((response:any)=>{
    this.item=response.selected_item;
    this.cart=response.cartProducts;
    console.log(response);
  })
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
