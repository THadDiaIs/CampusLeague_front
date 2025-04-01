import { Component } from '@angular/core';
import { LogoComponent } from "../../shared/logo/logo.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [LogoComponent, RouterLink, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
