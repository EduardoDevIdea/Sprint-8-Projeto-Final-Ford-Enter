import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Verifica se o usuário está marcado como logado no navegador
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

  if (isLoggedIn) {
    return true;
  } else {
    // Se não estiver logado, redireciona para a tela de login administrativo
    router.navigate(['/admin-login']);
    return false;
  }
};
