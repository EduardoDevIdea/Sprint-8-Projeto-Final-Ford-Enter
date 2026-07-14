import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface DemoRequest {
  client: string;
  nature: string;
  relatedItem: string;
  status: string;
  statusClass: 'pending' | 'completed';
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  adminEmail = '';

  demoMetrics = [
    { label: 'Vendas Mensais', value: 'R$ 68.200', icon: 'fa-coins', accent: 'var(--brand-green)' },
    { label: 'Orçamentos Pendentes', value: '18', icon: 'fa-file-lines' },
    { label: 'Ordens de Reparo', value: '09', icon: 'fa-screwdriver-wrench' },
    { label: 'Fornecedores Ativos', value: '24', icon: 'fa-truck' }
  ];

  demoRequests: DemoRequest[] = [
    {
      client: 'Carlos Silva',
      nature: 'Orçamento Venda',
      relatedItem: 'Apex Phone 16 Pro',
      status: 'Pendente',
      statusClass: 'pending'
    },
    {
      client: 'Mariana Costa',
      nature: 'Manutenção Técnica',
      relatedItem: 'Substituição de Módulo - Watch',
      status: 'Concluído',
      statusClass: 'completed'
    },
    {
      client: 'Roberto Souza',
      nature: 'Pedido Direto',
      relatedItem: 'Apex Acoustic Pro',
      status: 'Concluído',
      statusClass: 'completed'
    }
  ];

  constructor(private router: Router) {
    this.adminEmail = localStorage.getItem('adminEmail') || 'admin@email.com';
  }

  ngOnInit(): void {
    // Dados demonstrativos fixos.
  }

  logout(): void {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminEmail');
    this.router.navigate(['/admin-login']);
  }
}
