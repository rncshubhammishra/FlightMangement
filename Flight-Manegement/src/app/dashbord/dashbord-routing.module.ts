import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DahbordComponent} from './dahbord.component';

const routes: Routes = [
  {path:'',component:DahbordComponent}
  // { path: 'admin', loadChildren: () => import('../admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordRoutingModule { }
