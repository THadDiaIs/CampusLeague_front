import { Component } from '@angular/core';
import { LogoComponent } from "../../shared/logo/logo.component";
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../shared/footer/footer.component";
import { QuoteComponent } from "../../shared/quote/quote.component";
import { RegisterSheetComponent } from "../registration/register-sheet/register-sheet.component";

@Component({
  selector: 'app-home',
  imports: [LogoComponent, RouterLink, FooterComponent, QuoteComponent, RegisterSheetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
