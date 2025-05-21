import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from '../../../types/team';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { PlayersComponent } from "../players/players.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Position } from '../../../types/position';
import { Tournament } from '../../../types/tournament';
import { Coach } from '../../../types/coach';
import { TournamentService } from '../../../services/tournament/tournament.service';
import { PlayerPositionService } from '../../../services/player-position/player-position.service';
import { TeamService } from '../../../services/team/team.service';

@Component({
  selector: 'app-team',
  imports: [FormsModule, NgFor, PlayersComponent, NgIf, ToastModule],
  providers: [MessageService, TeamService],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {

  public team: Team = {
    name: "",
    inscription_date: new Date(),
    players: [],
  };
  public coach: Coach = {
    name: "",
    experience_years: 0
  };
  selectedTorunament: number = 0;
  logoUrl: String = "";
  shirtColor: String = "";
  showPlayerModal: boolean = false;
  currentEdittingPlayer: number | undefined = undefined;
  
  positions: Position[] = [];
  tournaments: Tournament[] = [];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private tournamentService: TournamentService,
    private playerPositionService: PlayerPositionService,
    private teamService: TeamService
  ) { 
    this.loadPositions();
    this.loadTournaments();
  }

  registrationsCancel() {
    this.router.navigate(['/home']);
  }

  async registerTeam() {
    if (!(this.team.name.length > 1)) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Ingrese un nombre para el equipo"
      });
      return;
    }

    /*if (!(this.team.shirtColor.length > 1)){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Ingrese un nombre para el equipo"
      });
      return;
    }*/

    /*if (!(this.team.players.length > tournament.miniumPlayers)) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Ingrese un nombre para el equipo"
      });
      return;
    }*/

    const registred = await this.teamService.saveTeam(this.team);
    if (registred?.id) {
      this.messageService.add({
        severity: "success",
        summary: "Done",
        detail: "Equipo registrado correctamente!."
      });
    }
    //naviagte to print register sheet
  }

  removePlayer(idx: number): void {
    this.team.players.splice(idx, 1);
  }

  setEdittingPlayer(idx: number): void {
    this.currentEdittingPlayer = idx;
    this.togglePlayerModal();
  }

  togglePlayerModal(): void {
    this.showPlayerModal = !this.showPlayerModal;
  }

  onPlayerAdded() {
    this.togglePlayerModal();
    this.currentEdittingPlayer = undefined;
  }

  async loadPositions() {
    const data = await this.playerPositionService.getPlayerPositions();
    if (data && data.length > 0) {
      this.positions = data;
    } else {
      this.positions = [];
      console.log("No player positions in the db");
    }
  }

  async loadTournaments() {
    try {
      const data = await this.tournamentService.getAllTournaments();
      if (data && data.length > 0) {
        this.tournaments = data;
      } else {
        this.tournaments = [];
        console.log("No tournaments in the db");
      }
    } catch (error) {
      console.error('Error loading tournaments:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load tournaments'
      });
    }
  }
}
