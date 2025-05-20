import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from '../../../types/team';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { PlayersComponent } from "../players/players.component";
import { getPlayerPositions, saveTeam } from '../../../services/api/register.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Position } from '../../../types/position';
import { Tournament } from '../../../types/tournament';

@Component({
  selector: 'app-team',
  imports: [FormsModule, NgFor, PlayersComponent, NgIf, ToastModule],
  providers: [MessageService],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {

  public team: Team = {
    name: "",
    inscription_date: new Date(),
    players: [],
  };
  logoUrl: String = "";
  shirtColor: String = "";
  showPlayerModal: boolean = false;
  currentEdittingPlayer: number | undefined = undefined;
  
  positions: Position[] = [];
  tournaments: Tournament[] = [];

  constructor(
    private router: Router,
    private messageService: MessageService
  ) { 
    this.loadPositions();
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

    console.log(this.team);
    const registred = await saveTeam(this.team);
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
    const data = await getPlayerPositions();
    if (data && data.length > 0) {
      this.positions = data;
    } else {
      this.positions = [];
      console.log("No player positions in the db");
    }
  }
}
