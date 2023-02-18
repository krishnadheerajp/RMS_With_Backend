import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private UserService:UserService, public router:Router){}
  values:any;
  register(values:any){
    // console.log(values);
    this.values = values;
        this.UserService.createUser(this.values).subscribe((response:any)=>{
      console.log(response);
    })
  }
   
  ngOnInit(){

  }
   
  login(values:any){
    this.values = values;
    // console.log(values);
    this.UserService.loginUser(this.values).subscribe((response:any)=>{
  console.log(response);
  localStorage.setItem("user_id", response.user.id);
  this.router.navigate(['']);
})
  }

}
