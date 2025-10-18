import { Component } from '@angular/core';
import { NavbarComponent } from '../../design/navbar/navbar.component';
import { PromoSectionComponent } from '../../promo-section/promo-section.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, PromoSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
