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
    // 
    this.values = values;
        this.UserService.createUser(this.values).subscribe((response:any)=>{
      
    })
  }
   
  ngOnInit(){

  }
   
  login(values:any){
    this.values = values;
    // 
    this.UserService.loginUser(this.values).subscribe((response:any)=>{
  
  localStorage.setItem("user_id", response.user.id);
  if(response.user.role==1){
    localStorage.setItem("role",response.user.role);
    this.router.navigate(['admin']);
  }
  else{
    this.router.navigate(['']);
  }
})
  }

}
