import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promo-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promo-section.component.html',
  styleUrls: ['./promo-section.component.scss']
})
export class PromoSectionComponent implements OnInit, OnDestroy {
  promoSlides = [
  {
    image: 'assets/promo-rations.png',
    title: 'Ração Premium com até 40% OFF',
    subtitle: 'As melhores marcas de ração com descontos imperdíveis.',
    link: '#',
    background: 'linear-gradient(90deg, #5c2d91 60%, #7e3ee9 100%)'
  },
  {
    image: 'assets/promo-toys.png',
    title: 'Acessórios e brinquedos com descontos!',
    subtitle: 'Coleiras, guias, roupinhas e brinquedos para deixar seu pet ainda mais estiloso e feliz.',
    link: '#',
    background: 'linear-gradient(90deg, #ff6b6b 60%, #ff9671 100%)'
  },
  {
  image: 'assets/promo-cat.png',
  title: 'Até 15% OFF em rações para gatos!',
  subtitle: 'Nutrição de qualidade para seu pet.',
  link: '#',
  background: 'linear-gradient(90deg, #4CAF50 60%, #81C784 100%)' // ✅ novo (verde)
}
];

  currentSlide = 0;
  intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Pré-carrega imagens
    this.promoSlides.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
    });

    // Inicia o carrossel automático
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  // 👉 Avança manualmente
  nextSlide() {
    this.stopAutoSlide();
    this.currentSlide = (this.currentSlide + 1) % this.promoSlides.length;
    this.cdr.detectChanges();
    this.startAutoSlide();
  }

  // 👉 Retrocede manualmente
  prevSlide() {
    this.stopAutoSlide();
    this.currentSlide =
      (this.currentSlide - 1 + this.promoSlides.length) % this.promoSlides.length;
    this.cdr.detectChanges();
    this.startAutoSlide();
  }

  // 👉 Vai direto para um índice específico
  goToSlide(index: number) {
    this.stopAutoSlide();
    this.currentSlide = index;
    this.cdr.detectChanges();
    this.startAutoSlide();
  }

  // 🕒 Inicia o carrossel automático
  private startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.promoSlides.length;
      this.cdr.detectChanges();
    }, 10000); // a cada 10 segundos
  }

  // 🛑 Para o carrossel automático temporariamente
  private stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
