import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private storageKey = 'apexstore_products';
  private products: Product[] = [];

  // Lista de produtos inicial
  private initialProducts: Product[] = [
    {
      id: 1,
      name: 'iPhone 11 64GB',
      description: 'Tela Liquid Retina HD de 6,1 pol., chip A13 Bionic, câmera dupla de 12 MP com Modo Noturno e conectividade 4G LTE. Clássico e confiável.',
      price: 3999,
      category: 'celulares',
      image: 'assets/produtos/iphone-11.jpg'
    },
    {
      id: 2,
      name: 'iPhone 12 64GB',
      description: 'Design com bordas retas em alumínio aeroespacial, tela Super Retina XDR OLED, chip A14 Bionic, conectividade 5G e sistema MagSafe.',
      price: 4799,
      category: 'celulares',
      image: 'assets/produtos/iphone-12.jpg'
    },
    {
      id: 3,
      name: 'iPhone 13 128GB',
      description: 'Chip A15 Bionic, tela Super Retina XDR com brilho 28% maior, bateria de longa duração e Modo Cinema com foco rack.',
      price: 5299,
      category: 'celulares',
      image: 'assets/produtos/iphone-13.jpg'
    },
    {
      id: 4,
      name: 'iPhone 14 128GB',
      description: 'Sensoriamento de Colisão e SOS Emergência via Satélite, chip A15 Bionic, Photonic Engine para fotos com pouca luz e Modo Ação.',
      price: 5799,
      category: 'celulares',
      image: 'assets/produtos/iphone-14.jpg'
    },
    {
      id: 5,
      name: 'iPhone 15 128GB',
      description: 'USB-C universal, Dynamic Island, câmera principal de 48 MP, chip A16 Bionic e design com vidro fosco.',
      price: 7299,
      category: 'celulares',
      image: 'assets/produtos/iphone-15.jpg'
    },
    {
      id: 6,
      name: 'iPhone 16 128GB',
      description: 'Botão de Câmera com sensor de pressão, Botão de Ação customizável, chip A18 com Apple Intelligence e câmeras verticais para vídeos espaciais.',
      price: 7999,
      category: 'celulares',
      image: 'assets/produtos/iphone-16.jpg'
    },
    {
      id: 7,
      name: 'iPhone 17 256GB',
      description: 'Design em titânio escovado, tela ProMotion 120Hz Always-On, chip A19 Pro, câmera frontal 24 MP e IA contextual.',
      price: 8999,
      category: 'celulares',
      image: 'assets/produtos/iphone-17.jpg'
    },
    {
      id: 8,
      name: 'Apple Watch SE (2ª Geração) 40mm GPS',
      description: 'Chip S8, tela Retina OLED de 1000 nits, Detecção de Queda, SOS Emergência e aplicativo Treino com métricas avançadas.',
      price: 2299,
      category: 'smartwatches',
      image: 'assets/produtos/watch-se.jpg'
    },
    {
      id: 9,
      name: 'Apple Watch Series 10 42mm GPS + Celular',
      description: 'Tela Always-On de 42mm, chip S10, sensor de temperatura corporal, carregamento rápido (0 a 80% em 30 min) e conectividade 4G LTE.',
      price: 4599,
      category: 'smartwatches',
      image: 'assets/produtos/watch-series-10.jpg'
    },
    {
      id: 10,
      name: 'Apple Watch Ultra 2 49mm GPS + Celular',
      description: 'Titânio aeroespacial, tela de 3000 nits, chip S9 com gesto de Duplo Toque, GPS de dupla frequência, bateria de 36h e resistência a 100m.',
      price: 7999,
      category: 'smartwatches',
      image: 'assets/produtos/watch-ultra-2.jpg'
    },
    {
      id: 11,
      name: 'Carregador de Celular Pmcell V8 3.1A Carga Rápida HC-24',
      description: 'Carregador com 3 portas USB, carga rápida de 3.1A, entrada 110/240V e saída 5V. Acompanha cabo micro USB.',
      price: 9.99,
      category: 'acessorios',
      image: 'assets/produtos/carregador-pmcell-v8.png'
    },
    {
      id: 12,
      name: 'Carregador de Celular A\'Gold iPhone 6.1A CA27-2',
      description: 'Carregador A\'Gold para iPhone com 1 entrada USB de 6.1A. Carga rápida e eficiente para dispositivos Apple.',
      price: 18.90,
      category: 'acessorios',
      image: 'assets/produtos/carregador-agold-iphone.png'
    },
    {
      id: 13,
      name: 'Fone de Ouvido Bluetooth I12 5.0',
      description: 'Fone estilo AirPods com Bluetooth 5.0, estojo carregador portátil, conexão estável e boa autonomia. Compatível com iOS e Android.',
      price: 19.99,
      category: 'acessorios',
      image: 'assets/produtos/fone-i12.png'
    },
    {
      id: 14,
      name: 'Fone de Ouvido Bluetooth M10 V5.3',
      description: 'Fone com Bluetooth 5.3, estojo powerbank com display digital, graves reforçados, baixa latência e excelente custo-benefício.',
      price: 21.99,
      category: 'acessorios',
      image: 'assets/produtos/fone-m10.png'
    },
    {
      id: 15,
      name: 'Película de Vidro iPhone 16',
      description: 'Película de vidro 3D fina para iPhone 16, proteção contra riscos, quedas e impressões digitais.',
      price: 1.65,
      category: 'acessorios',
      image: 'assets/produtos/pelicula-iphone-16.png'
    },
    {
      id: 16,
      name: 'Película de Vidro iPhone 17',
      description: 'Película de vidro 3D privativa para iPhone 17, alta transparência, resistência a impactos e bordas reforçadas.',
      price: 5.39,
      category: 'acessorios',
      image: 'assets/produtos/pelicula-iphone-17.png'
    },
    {
      id: 17,
      name: 'Capa Case iPhone',
      description: 'Capa de silicone TPU ultrafina e flexível para iPhone XS, acabamento fosco anti-marcas, bordas reforçadas e várias cores vibrantes.',
      price: 5.99,
      category: 'acessorios',
      image: 'assets/produtos/capa-case-iphone.png'
    },
    {
      id: 18,
      name: 'Capa Magnética para iPhone 16',
      description: 'Capa transparente magnética para iPhone 16, compatível com acessórios MagSafe, proteção contra quedas e design leve.',
      price: 8.99,
      category: 'acessorios',
      image: 'assets/produtos/capa-magnetica-iphone.png'
    }
  ];

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.products = JSON.parse(data);
    } else {
      this.products = [...this.initialProducts];
      this.saveProducts();
    }
  }

  private saveProducts(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.products));
  }

  // Retorna a lista de produtos
  getAllProducts(): Product[] {
    return this.products;
  }

  // Adiciona um produto
  addProduct(product: Omit<Product, 'id'>): void {
    const nextId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    const newProduct: Product = { ...product, id: nextId };
    this.products.push(newProduct);
    this.saveProducts();
  }

  // Atualiza um produto existente
  updateProduct(product: Product): void {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
      this.saveProducts();
    }
  }

  // Exclui um produto por ID
  deleteProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
    this.saveProducts();
  }
}