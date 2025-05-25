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
import { RegisterSheetComponent } from "../register-sheet/register-sheet.component";

@Component({
  selector: 'app-team',
  imports: [FormsModule, NgFor, PlayersComponent, NgIf, ToastModule, RegisterSheetComponent],
  providers: [MessageService, TeamService],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {

  public team: Team = {
    name: "",
    inscription_date: new Date(),
    players: [],
    captain: "",
    contact_email: "",
    contact_phone: "",
  };
  public coach: Coach = {
    name: "",
    experience_years: 0
  };
  public hasCoach: boolean = false;

  selectedTournamentIdx: number = -1;
  selectedCaptainIdx: number | undefined = undefined;
  showRegisterForm: boolean = false;
  showPlayerModal: boolean = false;
  currentEdittingPlayer: number | undefined = undefined;

  positions: Position[] = [];
  tournaments: Tournament[] = [];

  registredTeam: Team | null = null;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private tournamentService: TournamentService,
    private playerPositionService: PlayerPositionService,
    private teamService: TeamService
  ) {
    this.loadTournaments();
  }
  onSelectedTournamentChange() {
    if (this.selectedTournamentIdx >= 0) {
      const selectedTournament = this.tournaments[this.selectedTournamentIdx];
      this.playerPositionService.getPlayerPositionsBySport(selectedTournament.sport.id).then((positions) => {
        this.positions = positions;
      });
    }
  }

  registrationsCancel() {
    this.router.navigate(['/home']);
  }

  goToRegisterForm() {
    if (this.selectedTournamentIdx < 0) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Seleccione un torneo"
      });
      return;
    }
    this.showRegisterForm = true;
  }

  isCaptain(idx: number): boolean {
    return idx === this.selectedCaptainIdx;
  }

  selectCapitan(idx: number) {
    this.selectedCaptainIdx = idx;
  }

  async registerTeam() {
    this.team.name = this.team.name.trim();
    this.team.contact_email = this.team.contact_email.trim();
    this.team.contact_phone = this.team.contact_phone.trim();
    
    if (!(this.team.name.length > 5)) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Ingrese un nombre para el equipo, debe tener al menos 6 caracteres"
      });
      return;
    }

    if (!(this.team.contact_email.length > 5)) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Ingrese un correo de contacto"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.team.contact_email)) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Ingrese un correo de contacto válido"
      });
      return;
    }

    if (!(this.team.contact_phone.length === 8)) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Ingrese un telefono de contacto"
      });
      return;
    }

    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(this.team.contact_phone)) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Ingrese un telefono de contacto válido"
      });
        return;
      }

    if (this.team.players.length < this.tournaments[this.selectedTournamentIdx].min_team_members) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "El equipo debe tener al menos " + this.tournaments[this.selectedTournamentIdx].min_team_members + " jugadores"
      });
      return;
    }

    if (this.team.players.length > this.tournaments[this.selectedTournamentIdx].max_team_members) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "El equipo solo puede tener " + this.tournaments[this.selectedTournamentIdx].max_team_members + " jugadores maximos"
      });
      return;
    }

    if (this.selectedCaptainIdx === undefined || this.selectedCaptainIdx < 0) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Seleccione un capitán"
      });
      return;
    }

    try {
      this.team.inscription_date = new Date();
      this.team.captain = this.team.players[this.selectedCaptainIdx!].carnet;
      this.team.tournament = this.tournaments[this.selectedTournamentIdx!];

      if (this.hasCoach){
        if (!(this.coach.name.length > 1)) {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Ingrese un nombre para el entrenador"
          });
          return;
        }
        if (!(this.coach.experience_years > 0)) {
          this.coach.experience_years = 1;
        }
        this.team.coach = this.coach;
      }
      const response = await this.teamService.saveTeam(this.team);
      if (response?.id) {
        this.messageService.add({
          severity: "success",
          summary: "Done",
          detail: "Equipo registrado correctamente!."
        });
        this.registredTeam = response;
      }
      if (response?.error) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: response.error
        });
        return;
      }
    } catch (error) {
      console.log("Error on saving team:", error);
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Error al registrar el equipo, intente de nuevo mas tarde"
      });
      return;
    }
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

  async loadTournaments() {
    try {
      const data = await this.tournamentService.getAllTournaments();
      if (data && data.length > 0) {
        const currentDate = new Date();
        const filteredTournaments = data.filter((tournament) => {
          return [1,9,11,15].includes(tournament.status!.id) &&
            new Date(tournament.inscriptions_open_date) <= currentDate &&
            new Date(tournament.inscriptions_close_date) >= currentDate
        });
        this.tournaments = filteredTournaments;
      } else {
        this.tournaments = [];
        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: "No hay torneos disponibles"
        });
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
