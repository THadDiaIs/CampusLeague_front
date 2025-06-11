import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, CommonModule, NgFor, registerLocaleData } from '@angular/common';
import { Tournament } from '../../types/tournament';
import { Match } from '../../types/match';
import { Winner } from '../../types/winner';
import { TournamentService } from '../../services/tournament/tournament.service';
import { MatchService } from '../../services/match/match.service';
import { WinnerService } from '../../services/winner/winner.service';
import localEs from '@angular/common/locales/es';
import { LogoComponent } from '../../shared/logo/logo.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { QuoteComponent } from '../../shared/quote/quote.component';

registerLocaleData(localEs);

@Component({
  selector: 'app-home',
  imports: [LogoComponent, RouterLink, FooterComponent, QuoteComponent, NgIf, NgFor, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class HomeComponent implements OnInit {
  selectedTournamentIdx: number = 0;
  currentIndex = 0;
  sections: string[] = ['tournaments', 'matchs'];

  tournaments: Tournament[] = [];
  matches: Match[] = [];
  winners: Winner[] = [];

  constructor(
    private tournamentService: TournamentService,
    private matchService: MatchService,
    private winnerService: WinnerService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadTournaments();
    await this.loadMatches();
    await this.loadWinners();

    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.sections.length;
      if (this.sections[this.currentIndex] === 'tournaments') {
        this.nextTournament();
      }
    }, 15000);
  }

  async loadTournaments(): Promise<void> {
    try {
      const data = await this.tournamentService.getAllTournaments();
      this.tournaments = data
        .map(t => ({
          ...t,
          start_date: new Date(t.start_date),
          end_date: new Date(t.end_date),
          inscriptions_open_date: new Date(t.inscriptions_open_date),
          inscriptions_close_date: new Date(t.inscriptions_close_date),
        }))
        .filter(tour => tour.status?.id !== undefined && [1].includes(tour.status.id));
    } catch (error) {
      console.error('Error loading tournaments:', error);
    }
  }

  async loadMatches(): Promise<void> {
    try {
      const data = await this.matchService.getAllMatches();
      const now = new Date();
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(now.getDate() + 7);

      this.matches = data.filter(match => {
        const matchDate = new Date(match.match_date);
        return matchDate >= now && matchDate <= sevenDaysFromNow;
      });
    } catch (error) {
      console.error('Error loading matches:', error);
    }
  }

  async loadWinners(): Promise<void> {
    try {
      const data = await this.winnerService.getAllWinners();
      this.winners = data
        .filter(w => w.position === 1)
        .slice(-3); 
    } catch (error) {
      console.error('Error loading winners:', error);
    }
  }

  previousTournament(): void {
    if (this.tournaments.length > 0) {
      this.selectedTournamentIdx =
        (this.selectedTournamentIdx - 1 + this.tournaments.length) % this.tournaments.length;
    }
  }

  nextTournament(): void {
    if (this.tournaments.length > 0) {
      this.selectedTournamentIdx = (this.selectedTournamentIdx + 1) % this.tournaments.length;
    }
  }
}
