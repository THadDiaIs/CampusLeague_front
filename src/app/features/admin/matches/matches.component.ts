import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FieldService } from '../../../services/field/field.service';
import { RefereeService } from '../../../services/referee/referee.service';
import { Match } from '../../../types/match';
import { Team } from '../../../types/team';
import { Tournament } from '../../../types/tournament';
import { Field } from '../../../types/field';
import { Referee } from '../../../types/referee';
import { MatchService } from '../../../services/match/match.service';
import { TeamService } from '../../../services/team/team.service';
import { TournamentService } from '../../../services/tournament/tournament.service';

@Component({
  selector: 'app-matches',
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
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  providers: [MatchService, TeamService, TournamentService, FieldService, RefereeService, MessageService]
})
export class MatchesComponent implements OnInit {
  matches: Match[] = [];
  filteredMatches: Match[] = [];
  teams: Team[] = [];
  tournaments: Tournament[] = [];
  searchMatch: string = '';
  matchDateTime: string = '';
  fields: any[] = [];
  referees: any[] = [];

  public match: Match = {
    match_date: new Date(),
    team1_score: 0,
    team2_score: 0,
    field: {} as Field,
    referee: {} as Referee,
    team1: {} as Team,
    team2: {} as Team,
    tournament: {} as Tournament
  };

  showMatchModal = false;
  isEditing = false;
  loading = true;

  constructor(
    private matchService: MatchService,
    private teamService: TeamService,
    private tournamentService: TournamentService,
    private messageService: MessageService,
    private fieldService: FieldService,
    private refereeService: RefereeService
  ) { }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    try {
      this.fields = await this.fieldService.getAllFields();
      this.referees = await this.refereeService.getAllReferees();

      this.matches = await this.matchService.getAllMatches();
      this.teams = await this.teamService.getAllTeams();
      this.tournaments = await this.tournamentService.getAllTournaments();
      this.filteredMatches = [...this.matches];
    } finally {
      this.loading = false;
    }
  }

  filterMatches() {
    const text = this.searchMatch.toLowerCase();
    this.filteredMatches = this.matches.filter(m =>
      m.team1?.name?.toLowerCase().includes(text) || m.team2?.name?.toLowerCase().includes(text)
    );
  }

  async registerMatch() {
    if (!this.match.team1 || !this.match.team2 || !this.match.tournament || !this.match.match_date) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Complete todos los campos correctamente'
      });
      return;
    }
    this.match.match_date = new Date(this.matchDateTime);

    try {
      let response;
      if (this.isEditing && this.match.id) {
        response = await this.matchService.updateMatch(this.match.id, this.match);
      } else {
        response = await this.matchService.saveMatch(this.match);
      }

      if (response?.id) {
        this.messageService.add({
          severity: 'success',
          summary: 'Hecho',
          detail: `Partido ${this.isEditing ? 'actualizado' : 'registrado'} correctamente.`
        });

        await this.loadData();
        this.cancelMatch();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: response.error
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ocurrió un error inesperado'
      });
    }
  }

  editMatch(match: Match) {
    this.isEditing = true;
    this.match = { ...match };
    this.matchDateTime = this.formatDateTime(match.match_date);
    this.showMatchModal = true;
  }

  cancelMatch() {
    this.showMatchModal = false;
    this.match = {
      match_date: new Date(),
      team1_score: 0,
      team2_score: 0,
      field: {} as Field,
      referee: {} as Referee,
      team1: {} as Team,
      team2: {} as Team,
      tournament: {} as Tournament
    };
    this.matchDateTime = '';
    this.isEditing = false;
  }

  async removeMatch(id: number) {
    if (!confirm('¿Está seguro de eliminar este partido?')) {
      return;
    }
    try {
      await this.matchService.deleteMatch(id);
      this.messageService.add({
        severity: 'success',
        summary: 'Hecho',
        detail: 'Partido eliminado correctamente'
      });
      await this.loadData();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo eliminar el partido'
      });
    }
  }

  private formatDateTime(date: Date | string): string {
    const d = new Date(date);
    // Format as yyyy-MM-ddTHH:mm (HTML datetime-local format)
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
}
