import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navigateToAdmin(): void {
    // No Angular, usamos o Router para navegar de forma performática
    this.router.navigate(['/admin-login']);
  }
}