import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];
  adminEmail = '';

  // Específicos do CRUD
  isEditing = false;
  showAddForm = false;
  editingProductId: number | null = null;

  // Campos do Formulário
  productName = '';
  productDescription = '';
  productPrice = 0;
  productCategory: 'celulares' | 'smartwatches' | 'acessorios' = 'celulares';
  productImage = '';

  // Métricas do Dashboard
  totalProducts = 0;
  totalStockValue = 0;
  celularesCount = 0;
  smartwatchesCount = 0;
  acessoriosCount = 0;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    this.adminEmail = localStorage.getItem('adminEmail') || 'admin@apexstore.com';
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.products = this.productService.getAllProducts();
    this.calculateStats();
  }

  calculateStats(): void {
    this.totalProducts = this.products.length;
    this.totalStockValue = this.products.reduce((acc, p) => acc + p.price, 0);
    
    this.celularesCount = this.products.filter(p => p.category === 'celulares').length;
    this.smartwatchesCount = this.products.filter(p => p.category === 'smartwatches').length;
    this.acessoriosCount = this.products.filter(p => p.category === 'acessorios').length;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.isEditing = false;
    this.clearForm();
  }

  onAddProduct(event: Event): void {
    event.preventDefault();
    if (!this.productName || !this.productDescription || this.productPrice <= 0) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    // Set fallback image if empty
    const imgPath = this.productImage || 'assets/produtos/placeholder.png';

    this.productService.addProduct({
      name: this.productName,
      description: this.productDescription,
      price: this.productPrice,
      category: this.productCategory,
      image: imgPath
    });

    this.loadData();
    this.showAddForm = false;
    this.clearForm();
  }

  onEditProduct(product: Product): void {
    this.isEditing = true;
    this.showAddForm = false;
    this.editingProductId = product.id;
    
    this.productName = product.name;
    this.productDescription = product.description;
    this.productPrice = product.price;
    this.productCategory = product.category;
    this.productImage = product.image;
    
    // Rola suavemente até o formulário
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSaveProduct(event: Event): void {
    event.preventDefault();
    if (this.editingProductId === null || !this.productName || !this.productDescription || this.productPrice <= 0) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    this.productService.updateProduct({
      id: this.editingProductId,
      name: this.productName,
      description: this.productDescription,
      price: this.productPrice,
      category: this.productCategory,
      image: this.productImage
    });

    this.loadData();
    this.cancelEdit();
  }

  onDeleteProduct(id: number): void {
    if (confirm('Tem certeza de que deseja excluir este produto?')) {
      this.productService.deleteProduct(id);
      this.loadData();
      if (this.editingProductId === id) {
        this.cancelEdit();
      }
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingProductId = null;
    this.clearForm();
  }

  clearForm(): void {
    this.productName = '';
    this.productDescription = '';
    this.productPrice = 0;
    this.productCategory = 'celulares';
    this.productImage = '';
  }

  logout(): void {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminEmail');
    this.router.navigate(['/admin-login']);
  }
}
