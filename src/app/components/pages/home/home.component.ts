import { Component } from '@angular/core';
import { NavbarComponent } from '../../design/navbar/navbar.component';
import { PromoSectionComponent } from '../../promo-section/promo-section.component';
import { LandingPageProdutoComponent } from "../landing-page-produto/landing-page-produto.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, PromoSectionComponent, LandingPageProdutoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
