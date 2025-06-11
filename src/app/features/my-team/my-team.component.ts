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
import { TeamPlayer } from '../../types/teamPlayer';
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
  async updateMyTeam() {
    if (!this.myTeamInfo) return;

    try {
      const updatedData: Team = {
        id: this.myTeamInfo.id!,
        name: this.myTeamInfo.name,
        captain: this.myTeamInfo.captain,
        contact_email: this.myTeamInfo.contact_email,
        contact_phone: this.myTeamInfo.contact_phone,
        status: this.myTeamInfo.status!,
        players: this.myTeamInfo.players
      };


      const id = this.myTeamInfo.id;

      if (id !== undefined) {
        const response = await this.teamService.updateTeam(id, updatedData);
        if (response?.error) {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: response.error
          });
        } else {
          this.messageService.add({
            severity: "success",
            summary: "Equipo actualizado",
            detail: "Los datos del equipo se actualizaron correctamente"
          });
        }
      }

    } catch (error) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "No se pudo actualizar el equipo"
      });
      console.error(error);
    }
  }



  isReadOnly(): boolean {
    const statusId = this.myTeamInfo?.status?.id;
    return statusId === 1 || statusId === 5;
  }

  canUpdateFields(): boolean {
    return this.myTeamInfo !== null;
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
