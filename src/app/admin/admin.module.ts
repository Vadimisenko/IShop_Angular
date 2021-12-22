import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { OrdersPagesComponent } from './orders-pages/orders-pages.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "../shared/auth.guard";
import {QuillModule} from "ngx-quill";
import {SearchPipe} from "../shared/search.pipe";

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
      {path: 'add', component: AddPageComponent, canActivate: [AuthGuard]},
      {path: 'orders', component: OrdersPagesComponent, canActivate: [AuthGuard]},
      {path: 'product/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    AddPageComponent,
    DashboardPageComponent,
    EditPageComponent,
    OrdersPagesComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminModule { }
