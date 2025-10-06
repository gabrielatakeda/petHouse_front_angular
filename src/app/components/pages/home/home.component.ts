import { Component } from '@angular/core';
import { NavbarComponent } from '../../design/navbar/navbar.component';
import { PromoSectionComponent } from '../../promo-section/promo-section.component';
import { FooterComponent } from "../../design/footer/footer.component";
import { HeaderComponent } from "../../design/header/header.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, PromoSectionComponent, FooterComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
