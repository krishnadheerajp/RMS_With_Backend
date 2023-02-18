import {Routes,RouterModule} from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SelItemComponent } from './sel-item/sel-item.component';

export const router: Routes=[
    {path : '',redirectTo:'',pathMatch:'full'},
    {path : 'login' ,component : LoginComponent},
    {path: 'cart',component:CartComponent},
    {path: 'item/:id',component:SelItemComponent}

];

export const routes = RouterModule.forRoot(router);