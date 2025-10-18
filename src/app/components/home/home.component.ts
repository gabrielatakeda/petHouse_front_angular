import { Component } from '@angular/core';
import { PromoSectionComponent } from '../promo-section/promo-section.component';

import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../design/navbar/navbar.component';
import { HeaderComponent } from '../design/header/header.component';
import { FooterComponent } from '../design/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, PromoSectionComponent, FooterComponent, RouterOutlet, NavbarComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
