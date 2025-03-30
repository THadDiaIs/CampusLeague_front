import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "./shared/card/card.component";
import { LogoComponent } from "./shared/logo/logo.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardComponent, LogoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CampusLeague_front';
}
