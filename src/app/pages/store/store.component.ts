import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

// Definição dos tipos de telas internas suportadas
type StoreViews = 'home' | 'celulares' | 'smartwatches' | 'acessorios' | 'manutencao' | 'troca';

interface CarouselSlide {
  badge: string;
  title: string;
  description: string;
  image: string;
  actionText: string;
  bgClass: string;
}

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit, OnDestroy {
  // Estado que dita qual seção ou filtro está visível
  currentView: StoreViews = 'home';
  
  // Lista de produtos em destaque
  featuredProducts: Product[] = [];

  // Controle do Simulador de Troca
  tradeModel = '';
  tradeCondition = 'excellent';
  tradeValue = 0;

  // Controle de Modais
  isModalOpen = false;
  modalType: 'repair' | 'trade' = 'repair';

  // Configuração do Carrossel
  currentSlideIndex = 0;
  autoPlayInterval: any;
  carouselSlides: CarouselSlide[] = [
    {
      badge: 'Seu Usado Vale Mais',
      title: 'Programa Troca Smart',
      description: 'Traga seu iPhone usado para a ApexStore e garanta um descontão exclusivo na compra do seu novo aparelho.',
      image: 'assets/carrossel/troca-1.jpeg',
      actionText: 'Simular Desconto',
      bgClass: ''
    },
    {
      badge: 'Sua Sorte na ApexStore',
      title: 'Raspou, Achou, Ganhou!',
      description: 'Participe da nossa promoção exclusiva! Você pode ganhar 1 iPhone novinho ou cupons de R$ 25 e R$ 50 em cashback.',
      image: 'assets/carrossel/premio.jpeg',
      actionText: 'Saber Mais',
      bgClass: 'green-light'
    },
    {
      badge: 'Especialista Apple',
      title: 'Upgrade Completo',
      description: 'Além de renovar seu iPhone com desconto, aproveite condições especiais em toda a nossa linha de áudio e acessórios.',
      image: 'assets/carrossel/troca-2.jpeg',
      actionText: 'Falar com Especialista',
      bgClass: ''
    },
    {
      badge: 'iPhones Americanos',
      title: 'Novos e Seminovos',
      description: 'Aparelhos com procedência 100% original, garantia Apple e da loja. Acompanham carregador + brindes exclusivos e parcelamento em até 12x.',
      image: 'assets/carrossel/iphones-novos-seminovos.jpeg',
      actionText: 'Ver Catálogo',
      bgClass: ''
    },
    {
      badge: 'Facilitamos sua Entrega',
      title: 'Delivery Grátis',
      description: 'Receba seu aparelho com total segurança e comodidade em shoppings e locais públicos. Fale conosco e faça já o seu pedido!',
      image: 'assets/carrossel/delivery.jpeg',
      actionText: 'Fazer Pedido',
      bgClass: ''
    },
    {
      badge: 'Assistência Especializada',
      title: 'Micro Soldagem',
      description: 'Seu iPhone precisa de um reparo avançado? Na ApexStore você conta com serviço de manutenção em placas e micro soldagem com profissionais qualificados.',
      image: 'assets/carrossel/manutencao.jpeg',
      actionText: 'Solicitar Orçamento',
      bgClass: ''
    }
  ];

  // Captura uma referência do rodapé para fazer o scroll automático
  @ViewChild('footerSection', { read: ElementRef }) footerElement!: ElementRef;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // Carrega produtos em destaque (um de cada categoria para diversificar)
  loadFeaturedProducts(): void {
    const all = this.productService.getAllProducts();
    const celular = all.find(p => p.category === 'celulares' && p.id === 6); // iPhone 16
    const watch = all.find(p => p.category === 'smartwatches' && p.id === 10); // Watch Ultra 2
    const acessorio = all.find(p => p.category === 'acessorios' && p.id === 14); // Fone M10
    
    this.featuredProducts = [
      celular || all.find(p => p.category === 'celulares'),
      watch || all.find(p => p.category === 'smartwatches'),
      acessorio || all.find(p => p.category === 'acessorios')
    ].filter(p => p !== undefined) as Product[];
  }

  // Termo de busca digitado pelo usuário
  searchQuery = '';

  // Retorna os produtos filtrados pela categoria selecionada e busca
  getFilteredProducts(): Product[] {
    const all = this.productService.getAllProducts();
    let categoryProducts: Product[] = [];
    
    if (this.currentView === 'celulares') {
      categoryProducts = all.filter(p => p.category === 'celulares');
    } else if (this.currentView === 'smartwatches') {
      categoryProducts = all.filter(p => p.category === 'smartwatches');
    } else if (this.currentView === 'acessorios') {
      categoryProducts = all.filter(p => p.category === 'acessorios');
    } else {
      return [];
    }

    if (this.searchQuery && this.searchQuery.trim() !== '') {
      const query = this.searchQuery.toLowerCase().trim();
      return categoryProducts.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    return categoryProducts;
  }

  // Altera a seção exibida no meio da página
  setView(view: StoreViews): void {
    this.currentView = view;
    this.searchQuery = ''; // Reseta a busca ao mudar de página
    if (view === 'home') {
      this.resetAutoPlay();
    } else {
      this.stopAutoPlay();
    }
  }

  // Executa a rolagem suave até o rodapé
  scrollToContacts(): void {
    if (this.footerElement) {
      this.footerElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  // Métodos de Controle do Carrossel
  nextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.carouselSlides.length;
  }

  prevSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.carouselSlides.length) % this.carouselSlides.length;
  }

  setSlide(index: number): void {
    this.currentSlideIndex = index;
    this.resetAutoPlay();
  }

  startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  resetAutoPlay(): void {
    this.startAutoPlay();
  }

  // Métodos do Simulador de Troca e Modais
  calculateTradeValue(): void {
    if (!this.tradeModel) {
      this.tradeValue = 0;
      return;
    }
    let baseValue = 0;
    switch (this.tradeModel) {
      case 'iphone11': baseValue = 1500; break;
      case 'iphone12': baseValue = 2200; break;
      case 'iphone13': baseValue = 3000; break;
      case 'iphone14': baseValue = 4200; break;
      case 'iphone15': baseValue = 5800; break;
    }
    
    let multiplier = 1.0;
    if (this.tradeCondition === 'good') multiplier = 0.8;
    else if (this.tradeCondition === 'fair') multiplier = 0.6;
    
    this.tradeValue = Math.round(baseValue * multiplier);
  }

  openRepairModal(): void {
    this.modalType = 'repair';
    this.isModalOpen = true;
  }

  openTradeModal(): void {
    this.modalType = 'trade';
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  applyPhoneMask(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '').slice(0, 11);

    if (value.length > 0) {
      if (value.length <= 2) {
        value = `(${value}`;
      } else if (value.length <= 7) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      }
    }

    input.value = value;
  }

  getTradeDetailsSummary(): string {
    let modelName = '';
    switch (this.tradeModel) {
      case 'iphone11': modelName = 'iPhone 11'; break;
      case 'iphone12': modelName = 'iPhone 12'; break;
      case 'iphone13': modelName = 'iPhone 13'; break;
      case 'iphone14': modelName = 'iPhone 14'; break;
      case 'iphone15': modelName = 'iPhone 15'; break;
    }
    let conditionName = 'Excelente';
    if (this.tradeCondition === 'good') conditionName = 'Bom';
    else if (this.tradeCondition === 'fair') conditionName = 'Regular';
    
    return `${modelName} (${conditionName}) - Desconto estimado: R$ ${this.tradeValue}`;
  }

  submitModalForm(event: Event): void {
    event.preventDefault();
    const targetPhone = '5571999999999';
    let text = '';
    if (this.modalType === 'repair') {
      text = `Olá ApexStore, gostaria de solicitar um orçamento para consertar meu aparelho.`;
    } else {
      text = `Olá ApexStore, fiz a simulação de troca do meu usado pelo Programa Troca Smart: ${this.getTradeDetailsSummary()}.`;
    }
    const url = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    this.isModalOpen = false;
  }

  buyProduct(product: Product): void {
    const targetPhone = '5571999999999';
    const text = `Olá ApexStore, gostaria de comprar o ${product.name}.`;
    const url = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }
}