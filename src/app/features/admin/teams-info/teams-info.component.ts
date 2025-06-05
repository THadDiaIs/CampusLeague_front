import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TeamService } from '../../../services/team/team.service';
import { Team } from '../../../types/team';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TeamPlayer } from '../../../types/teamPlayer';
import { TeamPlayerService } from '../../../services/teamPlayer/teamPlayer.service';

@Component({
  selector: 'app-teams-info',
  standalone: true,
  imports: [CommonModule, InputTextModule, ToastModule, FormsModule, IconFieldModule, InputIconModule, DialogModule, ButtonModule],
  templateUrl: './teams-info.component.html',
  styleUrls: ['./teams-info.component.css'],
  providers: [TeamService,TeamPlayerService, MessageService]
})

export class TeamsInfoComponent implements OnInit {
  teams: Team[] = [];
  teamPlayersPosition: TeamPlayer[] = [];
  filteredTeams: Team[] = [];
  teamPlayer: Team = {
    name: '',
    players: [],
    captain: '',
    contact_email: '',
    contact_phone: ''
  };
  loading = true;
  searchTerm: string = '';
  showTeamModal: boolean = false;
  disabledVar: boolean = false;

  constructor(
    private teamService: TeamService,
    private teamPlayerService: TeamPlayerService,
    private messageService: MessageService
  ) { }

  async ngOnInit() {
    try {
      this.teams = await this.teamService.getAllTeams();
      this.filteredTeams = this.teams;
    } finally {
      this.loading = false;
    }
  }

  filterTeams() {
    const term = this.searchTerm.toLowerCase();
    this.filteredTeams = this.teams.filter(team =>
      team.name.toLowerCase().includes(term)
    );
  }


  async editTeam(id: number, bandera: boolean = false): Promise<void> {
    
    if (bandera) {
      this.disabledVar = true;
    } else {
      this.disabledVar = false;
    }

    try {
      this.teamPlayersPosition = await this.teamPlayerService.getTeamPlayerPositions(id);
      this.teamPlayer = await this.teamService.getTeam(id);
      this.showTeamModal = true;
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al obtener el equipo'
      });
    }
  }


  aceptTeam(id: number) {
    this.editTeam(id, true)
  }

  async confirmTeam(id: number) {
    try {
      const response = await this.teamService.aceptTeam(id);
      if (response?.id) {
        this.messageService.add({
          severity: "success",
          summary: "Done",
          detail: "Equipo aceptado correctamente!."
        });
        this.showTeamModal = false;
        this.ngOnInit();
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
      console.log("Error on acept team:", error);
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Error al aceptar el equipo, intente de nuevo mas tarde"
      });
      return;
    } 
  }

  removeTeam(id: number): void {
    this.teamService.deleteTeam(id).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Equipo eliminado',
        detail: 'El equipo fue eliminado correctamente.'
      });
      this.ngOnInit();
    }).catch(error => {
      console.error('Error eliminando equipo', error);
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'No se puede eliminar el equipo.'
      });
    });
  }
}