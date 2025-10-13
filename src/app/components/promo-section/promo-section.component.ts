import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promo-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promo-section.component.html',
  styleUrls: ['./promo-section.component.scss']
})
export class PromoSectionComponent {
  promoSlides = [
    {
      image: 'assets/promo-rations.png',
      title: 'SEMANA DO CLIENTE - 15% OFF no Pix',
      subtitle: 'Promoção válida até 28/09',
      link: '#'
    },
    {
      image: 'assets/promo-dog.png',
      title: 'Até 15% OFF em rações para cães',
      subtitle: 'Lorem ipsum dolor sit amet',
      link: '#'
    },
    {
      image: 'assets/promo-cat.png',
      title: 'Até 15% OFF em rações para gatos',
      subtitle: 'Lorem ipsum dolor sit',
      link: '#'
    }
  ];

  currentSlide = 0;
  isAnimating = false;


  nextSlide() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      const nextSlide = (this.currentSlide + 1) % this.promoSlides.length;
      setTimeout(() => {
        this.currentSlide = nextSlide;
        this.isAnimating = false;
      }, 50); 
    }
  }


  prevSlide() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      const prevSlide = (this.currentSlide - 1 + this.promoSlides.length) % this.promoSlides.length;
      setTimeout(() => {
        this.currentSlide = prevSlide;
        this.isAnimating = false;
      }, 50); 
    }
  }


  goToSlide(index: number) {
    if (!this.isAnimating && index !== this.currentSlide) {
      this.isAnimating = true;
      setTimeout(() => {
        this.currentSlide = index;
        this.isAnimating = false;
      }, 50); 
    }
  }

 
  autoSlide() {
    setInterval(() => {
      if (!this.isAnimating) {
        this.nextSlide();
      }
    }, 15000);
  }

  ngOnInit() {
    this.autoSlide(); 
  }
}