import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PromoSectionComponent } from '../promo-section/promo-section.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../design/navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, NavbarComponent, PromoSectionComponent, FooterComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
