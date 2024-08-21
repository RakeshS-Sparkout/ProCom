import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { ListsComponent } from './lists/lists.component';
import { AddProductComponent } from './admin/add-product/add-product.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [RoleGuard], data: { role: 'user' } },
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [RoleGuard], 
    data: { role: 'admin' }, 
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'lists', component: ListsComponent}
    ] 
  },
  { path: 'cart', component: CartComponent, canActivate: [RoleGuard], data: { role: 'user' } },
  { path: 'add', component: AddProductComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
