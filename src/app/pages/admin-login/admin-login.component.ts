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
  acceptsPrivacyPolicy = false;
  
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
    this.acceptsPrivacyPolicy = false;
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

    const isAuthorizedAdmin = this.email === 'admin@email.com' && this.password === 'admin';

    if (isAuthorizedAdmin) {
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

    if (!this.acceptsPrivacyPolicy) {
      this.errorMessage = 'Você precisa aceitar as políticas internas de privacidade para concluir o cadastro.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    this.successMessage = 'Cadastro realizado com sucesso! Seu acesso está pendente de autorização da administração. Você será redirecionado para o login.';
    setTimeout(() => {
      this.mode = 'login';
      this.errorMessage = '';
      this.email = '';
      this.password = '';
      this.name = '';
      this.confirmPassword = '';
      this.acceptsPrivacyPolicy = false;
      this.successMessage = '';
    }, 5000);
  }
}
