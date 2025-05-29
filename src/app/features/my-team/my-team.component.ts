import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { TeamService } from '../../services/team/team.service';
import { Team } from '../../types/team';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TeamPlayer } from '../../types/TeamPlayer';
import { TeamPlayerService } from '../../services/teamPlayer/teamPlayer.service';

@Component({
  selector: 'app-my-team',
  imports: [CommonModule, NgIf, NgFor, FormsModule, ToastModule],
  templateUrl: './my-team.component.html',
  styleUrl: './my-team.component.css',
  providers: [MessageService, TeamService]
})
export class MyTeamComponent {
  myTeamInfo: Team | null = null;
  positionTeam: TeamPlayer[] = [];
  showMyTeamInfo: boolean = false;
  codeTeam: string = "";
  constructor(
    private teamService: TeamService,
    private messageService: MessageService,
    private teamPlayerService: TeamPlayerService,
    private router: Router,
  ) { }

  async viewMyTeam() {
    if ((this.codeTeam && this.codeTeam.trim() !== '') && (this.codeTeam.length < 5)) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Coloque un Codigo valido de Equipo, contiene almenos 6 digitos"
      })
      return;
    }

    try {
      const response = await this.teamService.getMyTeam(this.codeTeam);
      if (response?.error) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: response.error
        });
        return;
      }
      this.myTeamInfo = response;
      if (!this.myTeamInfo?.id) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'El equipo no tiene un ID válido, comuniquese con un entrandor.',
        });
        return;
      }
      this.positionTeam = await this.teamPlayerService.getTeamPlayerPositions(this.myTeamInfo?.id);
      if (this.myTeamInfo?.id !== undefined) {
        this.messageService.add({
          severity: "success",
          summary: "Done",
          detail: `Bienvenido capitan de ${this.myTeamInfo.name}`
        });
      }
      this.showMyTeamInfo = true;
      return;


    } catch (error) {
      console.error('error on fetching team', error);
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "No se pudo obtener la información del equipo"
      });
    }

  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
