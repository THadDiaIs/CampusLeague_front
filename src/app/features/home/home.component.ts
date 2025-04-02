import { Component } from '@angular/core';
import { LogoComponent } from "../../shared/logo/logo.component";
import { RouterLink } from '@angular/router';
import { apiGet } from '../../services/api/api.service';
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [LogoComponent, RouterLink, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
