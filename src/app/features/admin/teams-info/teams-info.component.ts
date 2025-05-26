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

@Component({
  selector: 'app-teams-info',
  standalone: true,
  imports: [CommonModule, InputTextModule, ToastModule, FormsModule, IconFieldModule, InputIconModule, DialogModule, ButtonModule],
  templateUrl: './teams-info.component.html',
  styleUrls: ['./teams-info.component.css'],
  providers: [TeamService, MessageService]
})

export class TeamsInfoComponent implements OnInit {
  teams: Team[] = [];
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

  constructor(
    private teamService: TeamService,
    private messageService: MessageService
  ) {}

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

  async editTeam(id: number): Promise<void> {
    try {
      this.teamPlayer = await this.teamService.getTeam(id);
      console.log("aca estra ", this.teamPlayer)
      this.showTeamModal = true;
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al obtener el equipo'
      });
    }
  }
}