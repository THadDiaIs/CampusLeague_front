import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { WinnerService } from '../../../services/winner/winner.service';
import { TeamService } from '../../../services/team/team.service';
import { TournamentService } from '../../../services/tournament/tournament.service';
import { IconFieldModule } from 'primeng/iconfield';
import { Winner } from '../../../types/winner';
import { Team } from '../../../types/team';
import { Tournament } from '../../../types/tournament';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-winners',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    DropdownModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    InputIconModule,
    IconFieldModule
  ],
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.css',
  providers: [WinnerService, TeamService, TournamentService, MessageService]
})
export class WinnersComponent implements OnInit {

  winners: Winner[] = [];
  teams: Team[] = [];
  filteredTeams: Team[] = [];
  tournaments: Tournament[] = [];
  filteredWinners: Winner[] = [];
  searchWinner: string = '';

  public winner: Winner = { team: {} as Team, position: 1, tournament: {} as Tournament };
  showWinnerModal = false;
  isEditing = false;
  loading = true;

  constructor(
    private winnerService: WinnerService,
    private teamService: TeamService,
    private tournamentService: TournamentService,
    private messageService: MessageService
  ) { }

  async ngOnInit() {
    try {
      this.winners = await this.winnerService.getAllWinners();
      this.teams = await this.teamService.getAllTeams();
      this.filteredWinners = this.winners;
      this.tournamentsForWinners();
    } finally {
      this.loading = false;
    }
  }

  async tournamentsForWinners() {
    const tournamentsNow = await this.tournamentService.getAllTournaments();
    const today = new Date();

    this.tournaments = tournamentsNow.filter(tour => {
      const startDate = new Date(tour.start_date);
      const endDate = new Date(tour.end_date);
      const hasEnded = today >= endDate;
      const oneMonthAfterEnd = new Date(endDate);
      oneMonthAfterEnd.setMonth(oneMonthAfterEnd.getMonth() + 1);
      const notTooOld = today <= oneMonthAfterEnd;

      return startDate <= today && hasEnded && notTooOld;
    });
  }

  filterTeamsByTournament(tournamentId: number) {
    this.filteredTeams = this.teams.filter(team => team.tournament?.id === tournamentId);
    this.winner.team = {} as Team;
  }

  filterWinners() {
    const text = this.searchWinner.toLowerCase();
    this.filteredWinners = this.winners.filter(winner =>
      winner.team?.name?.toLowerCase().includes(text)
    );
  }

  async registerWinner() {
    if (!this.winner.team || !this.winner.tournament || this.winner.position <= 0) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Complete todos los campos correctamente"
      });
      return;
    }
    try {
      let response;
      if (this.isEditing && this.winner.id) {
        response = await this.winnerService.updateWinner(this.winner.id, this.winner);
      } else {
        response = await this.winnerService.saveWinner(this.winner);
      }

      if (response?.id) {
        this.messageService.add({
          severity: "success",
          summary: "Hecho",
          detail: `Ganador ${this.isEditing ? 'actualizado' : 'registrado'} correctamente.`
        });
        this.winner = { team: {} as Team, position: 1, tournament: {} as Tournament };
        this.showWinnerModal = false;
        await this.ngOnInit();
      } else if (response?.error) {
        this.messageService.add({ severity: "error", summary: "Error", detail: response.error });
      }
    } catch (error) {
      console.error("Error al guardar ganador:", error);
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Error al registrar el ganador, intente de nuevo más tarde"
      });
    }
  }

  editWinner(winner: Winner) {
    this.winner = { ...winner };
    this.isEditing = true;
    this.showWinnerModal = true;
    const tournamentId = winner.tournament?.id;
    if (tournamentId !== undefined) {
      this.filterTeamsByTournament(tournamentId);
    } else {
      this.filteredTeams = [];
    }
  }

  onTournamentChange() {
  const tournamentId = this.winner.tournament?.id;
  if (tournamentId !== undefined) {
    this.filterTeamsByTournament(tournamentId);
  } else {
    this.filteredTeams = [];
  }
}


  cancelWinner() {
    this.winner = { team: {} as Team, position: 1, tournament: {} as Tournament };
    this.filteredTeams = [];
    this.isEditing = false;
    this.showWinnerModal = false;
  }
}
