import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AdminComponent } from './pages/admin/admin';
import { LoginComponent } from './pages/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
