import { Component } from '@angular/core';
import { LogoComponent } from "../../shared/logo/logo.component";
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../shared/footer/footer.component";
import { QuoteComponent } from "../../shared/quote/quote.component";
import { OnInit } from '@angular/core';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [LogoComponent, RouterLink, FooterComponent, QuoteComponent, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  currentIndex = 0;
  sections: string[] = ['tournaments', 'inscriptions', 'matchs', 'img'];

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.sections.length;
    }, 15000);
  }
}
