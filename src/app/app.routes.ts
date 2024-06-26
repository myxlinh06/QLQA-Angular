import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { adminGuard } from './admin.guard';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderEditComponent } from './pages/order-edit/order-edit.component';
import { OrderAddComponent } from './pages/order-add/order-add.component';




export const routes: Routes = [
    { 
        path: '', redirectTo: '/login', pathMatch: 'full' 
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    {
        path: 'product/list',
        canActivate :[adminGuard],
        component: ProductListComponent,
    },
    {
        path: 'product/add',
        canActivate :[adminGuard],
        component: ProductAddComponent,
    },
    {
        path: 'product/edit/:id',
        canActivate :[adminGuard],
        component: ProductEditComponent,
    },
    {
        path: 'product/detail/:id',
        canActivate :[adminGuard],
        component: ProductDetailComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    //order
    { path: 'order/list', component: OrderListComponent },
    { path: 'order/edit/:id', component: OrderEditComponent },
    { path: 'order/add', component: OrderAddComponent },

];
