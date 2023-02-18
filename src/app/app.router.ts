import {Routes,RouterModule} from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';

export const router: Routes=[
    {path : '',redirectTo:'',pathMatch:'full'},
    {path : 'login' ,component : LoginComponent},
    {path: 'cart',component:CartComponent}

];

export const routes = RouterModule.forRoot(router);