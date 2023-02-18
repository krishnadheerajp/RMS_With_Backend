import { Component } from '@angular/core';
import {User} from '../user.interface';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  public user!: User; // our model
  ngOnInit() { // we will initialize our form here
   this.user = {
   name: '',
   email: '',
   phone: 0,
   date: '',
   time: '',
   nop: 0,
   msg: ''
   // set default value to 8000
   }
   };
   save(model: User, isValid: boolean) 
   { 
   // check if model is valid// if valid, call API to save customer
   console.log(model, isValid); } 
}
