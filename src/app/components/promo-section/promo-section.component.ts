import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgStyle } from '@angular/common';

@Component({
  selector: 'app-promo-section',
  standalone: true,
  imports: [NgFor, NgStyle],
  templateUrl: './promo-section.component.html',
  styleUrls: ['./promo-section.component.scss']
})
export class PromoSectionComponent implements OnInit, OnDestroy {
  promoSlides = [
    {
      image: 'assets/promo-rations.png',
      title: 'Ração Premium com até 40% OFF',
      subtitle: 'As melhores marcas de ração com descontos imperdíveis.',
      background: 'linear-gradient(90deg, #5c2d91 60%, #7e3ee9 100%)',
      cardTitle: 'Super oferta!',
      cardSubtitle: 'Somente hoje!'
    },
    {
      image: 'assets/promo-toys.png',
      title: 'Acessórios e brinquedos com descontos!',
      subtitle:
        'Coleiras, guias, roupinhas e brinquedos para deixar seu pet ainda mais estiloso e feliz.',
      background: 'linear-gradient(90deg, #ff6b6b 60%, #ff9671 100%)',
      cardTitle: 'Promoção Relâmpago!',
      cardSubtitle: 'Descontos até 50%!'
    },
    {
      image: 'assets/promo-cat.png',
      title: 'Até 15% OFF em rações para gatos!',
      subtitle: 'Nutrição de qualidade para seu pet.',
      background: 'linear-gradient(90deg, #4CAF50 60%, #81C784 100%)',
      cardTitle: 'Especial Gatos!',
      cardSubtitle: 'Ofertas limitadas!'
    }
  ];

  currentSlide = 0;
  intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  nextSlide() {
    this.stopAutoSlide();
    this.currentSlide = (this.currentSlide + 1) % this.promoSlides.length;
    this.cdr.detectChanges();
    this.startAutoSlide();
  }

  prevSlide() {
    this.stopAutoSlide();
    this.currentSlide =
      (this.currentSlide - 1 + this.promoSlides.length) % this.promoSlides.length;
    this.cdr.detectChanges();
    this.startAutoSlide();
  }

  goToSlide(index: number) {
    this.stopAutoSlide();
    this.currentSlide = index;
    this.cdr.detectChanges();
    this.startAutoSlide();
  }

  private startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.promoSlides.length;
      this.cdr.detectChanges();
    }, 8000);
  }

  private stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
