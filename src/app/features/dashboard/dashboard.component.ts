import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TournamentComponent } from "../registration/tournament/tournament.component";

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, TournamentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
