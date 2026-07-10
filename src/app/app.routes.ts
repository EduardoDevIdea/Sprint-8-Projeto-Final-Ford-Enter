// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { StoreComponent } from './pages/store/store.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Rota principal (Vitrine/Sobre nós/Categorias)
  { path: '', component: StoreComponent },
  
  // Rota de Login do Admin
  { path: 'admin-login', component: AdminLoginComponent },
  
  // Rota do Painel Admin (Protegida pelo Guard)
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [authGuard] 
  },
  
  // Redireciona qualquer rota inválida para a vitrine
  { path: '**', redirectTo: '' }
];