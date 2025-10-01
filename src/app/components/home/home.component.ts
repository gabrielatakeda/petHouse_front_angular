import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PromoSectionComponent } from '../promo-section/promo-section.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, PromoSectionComponent, FooterComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
