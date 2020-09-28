import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Shared/authGuard';


const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'admin', loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule),canActivate: [AuthGuard] },
  { path: 'result', loadChildren: () => import('./result/result.module').then(m => m.ResultModule) },
  { path: 'info', loadChildren: () => import('./travler-info/travler-info.module').then(m => m.TravlerInfoModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'order/:id', loadChildren: () => import('./order-details/order-details.module').then(m => m.OrderDetailsModule) },
  { path: 'user', loadChildren: () => import('./dashbord/dashbord.module').then(m => m.DashbordModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
