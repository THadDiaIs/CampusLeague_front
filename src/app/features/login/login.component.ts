import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuoteComponent } from "../../shared/quote/quote.component";
import { OutlinedButtonComponent } from "../../shared/outlined-button/outlined-button.component";

@Component({
  selector: 'app-login',
  imports: [RouterLink, QuoteComponent, OutlinedButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
