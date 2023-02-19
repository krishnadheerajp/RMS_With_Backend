import { Component } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  constructor(private itemService:ItemService,public router:Router){}
  order:any;
  totalAmount:number=0;
  // Send user id from here
  ngOnInit(){
    if(localStorage.getItem("user_id")==undefined){
      this.router.navigate(['login']);
    }
    this.itemService.getUserOrders().subscribe((response:any)=>{
      
      this.order=response;
      for (var val of this.order) {
        this.totalAmount+=val.pivot.amount;
      }
    })
  }
}
