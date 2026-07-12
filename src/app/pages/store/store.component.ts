import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

// Definição dos tipos de telas internas suportadas
type StoreViews = 'home' | 'celulares' | 'smartwatches' | 'acessorios' | 'manutencao' | 'troca';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  // Estado que dita qual seção ou filtro está visível
  currentView: StoreViews = 'home';
  
  // Captura uma referência do rodapé para fazer o scroll automático
  @ViewChild('footerSection', { read: ElementRef }) footerElement!: ElementRef;

  // Altera a seção exibida no meio da página
  setView(view: StoreViews): void {
    this.currentView = view;
  }

  // Executa a rolagem suave até o rodapé
  scrollToContacts(): void {
    if (this.footerElement) {
      this.footerElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}