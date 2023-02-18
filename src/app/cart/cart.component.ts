import { Component,OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private itemService:ItemService,public router:Router){}
  cart:any;
  totalAmount:number=0;
  // itemIds:any=[];
  // message:any;
  // Send user id from here
  ngOnInit(){
    if(localStorage.getItem("user_id")==undefined){
      this.router.navigate(['login']);
    }
    this.itemService.getUserCartItems().subscribe((response:any)=>{
      console.log(response);
      this.cart=response.cartProducts;
      for (var val of this.cart) {
        this.totalAmount+=val.pivot.amount;
      }
      // for (let i=0;i<this.cart.length;i++) {
      //   this.itemIds[i]=this.cart[i].pivot.id;
      // }
      // console.log(this.itemIds);
    })
  }

  updateCart(index:number,sign:string){
    if(sign=="plus"){
      this.cart[index].pivot.quantity+=1;
      this.totalAmount+=this.cart[index].price;
    }
    else{
      this.cart[index].pivot.quantity-=1;
      this.totalAmount-=this.cart[index].price;
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
          // this.itemIds=[];
          // for (let i=0;i<this.cart.length;i++) {
          //   this.itemIds[i]=this.cart[i].pivot.id;
          // }
          // console.log(this.itemIds);
        }
      })
    }
  }

  // orderItems(data:any){
  //   let itemIdsstring="";
  //   console.log(data);
  //   for (let i=0;i<data.length;i++) {
  //     itemIdsstring+=data[i]+" ";
  //   }
  //   console.log(itemIdsstring);
  //   this.itemService.orderItems(itemIdsstring).subscribe((response:any)=>{
  //     console.log(response);
  //     this.message=response.message;
  //     this.cart=[];
  //     this.totalAmount=0;
  //     this.itemIds=[];
  //   });
  // }

}
