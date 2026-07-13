import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  mode: 'login' | 'register' = 'login';
  
  // Form fields
  email = '';
  password = '';
  name = '';
  confirmPassword = '';
  
  // Feedback
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router) {
    // Se o admin já estiver logado, redireciona direto para o dashboard
    if (localStorage.getItem('isAdminLoggedIn') === 'true') {
      this.router.navigate(['/admin-dashboard']);
    }
  }

  toggleMode(): void {
    this.mode = this.mode === 'login' ? 'register' : 'login';
    this.errorMessage = '';
    this.successMessage = '';
    this.email = '';
    this.password = '';
    this.name = '';
    this.confirmPassword = '';
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.errorMessage = '';
    this.successMessage = '';

    if (this.mode === 'login') {
      this.handleLogin();
    } else {
      this.handleRegister();
    }
  }

  private handleLogin(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    // Verifica nos usuários cadastrados ou credencial padrão
    const registeredUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]');
    const userFound = registeredUsers.find((u: any) => u.email === this.email && u.password === this.password);

    const isDefaultAdmin = this.email === 'admin@apexstore.com' && this.password === 'admin123';

    if (isDefaultAdmin || userFound) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('adminEmail', this.email);
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.errorMessage = 'E-mail ou senha incorretos.';
    }
  }

  private handleRegister(): void {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem('adminUsers') || '[]');
    const emailExists = registeredUsers.some((u: any) => u.email === this.email);

    if (emailExists || this.email === 'admin@apexstore.com') {
      this.errorMessage = 'Este e-mail já está cadastrado.';
      return;
    }

    registeredUsers.push({
      name: this.name,
      email: this.email,
      password: this.password
    });

    localStorage.setItem('adminUsers', JSON.stringify(registeredUsers));
    this.successMessage = 'Cadastro realizado com sucesso! Faça login.';
    setTimeout(() => {
      this.toggleMode();
    }, 1500);
  }
}
