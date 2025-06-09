import { Component } from '@angular/core';
import { LogoComponent } from "../../shared/logo/logo.component";
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../shared/footer/footer.component";
import { QuoteComponent } from "../../shared/quote/quote.component";
import { OnInit } from '@angular/core';
import { NgIf, CommonModule, NgFor } from '@angular/common';
import { Tournament } from '../../types/tournament';
import { TournamentService } from '../../services/tournament/tournament.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [LogoComponent, RouterLink, FooterComponent, QuoteComponent, NgIf, NgFor, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  currentIndex = 0;
  sections: string[] = ['tournaments', 'inscriptions', 'matchs', 'foto'];

  tournaments: Tournament[] = [];

  constructor(private tournamentService: TournamentService) {}

  async ngOnInit(): Promise<void> {
    await this.loadTournaments();

    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.sections.length;
    }, 15000);
  }

async loadTournaments(): Promise<void> {
  try {
    const data = await this.tournamentService.getAllTournaments();
    console.log('Torneos cargados:', data);  // <-- añade esto para verificar
    this.tournaments = data.map(t => ({
      ...t,
      start_date: new Date(t.start_date),
      end_date: new Date(t.end_date),
      inscriptions_open_date: new Date(t.inscriptions_open_date),
      inscriptions_close_date: new Date(t.inscriptions_close_date),
    }));
  } catch (error) {
    console.error('Error loading tournaments:', error);
  }
}

}
