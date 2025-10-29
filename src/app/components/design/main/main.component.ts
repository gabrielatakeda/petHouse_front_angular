import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
