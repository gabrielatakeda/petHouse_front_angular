import { Component } from '@angular/core';
import { HeaderAdminComponent } from "../../../design/admin/header-admin/header-admin.component";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../../../design/footer/footer.component";
import { SidebarComponent } from "../../../design/admin/sidebar/sidebar.component";

@Component({
  selector: 'app-principal-admin',
  imports: [HeaderAdminComponent, RouterOutlet, FooterComponent, SidebarComponent],
  templateUrl: './principal-admin.component.html',
  styleUrl: './principal-admin.component.scss'
})
export class PrincipalAdminComponent {

}
