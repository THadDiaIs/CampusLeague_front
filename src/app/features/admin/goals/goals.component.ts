import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { Goal } from '../../../types/goal';
import { Player } from '../../../types/player';
import { Match } from '../../../types/match';
import { GoalService } from '../../../services/goal/goal.service';
import { PlayerService } from '../../../services/player/player.service';
import { MatchService } from '../../../services/match/match.service';
import { Tournament } from '../../../types/tournament';
import { Team } from '../../../types/team';
import { TournamentService } from '../../../services/tournament/tournament.service';
import { TeamService } from '../../../services/team/team.service';
import { TeamPlayerService } from '../../../services/teamPlayer/teamPlayer.service';

@Component({
  selector: 'app-goals',
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
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css',
  providers: [GoalService, PlayerService, MatchService, MessageService, TournamentService, TeamService, TeamPlayerService]
})
export class GoalsComponent implements OnInit {
  nameTournament: Tournament | null = null;
  tournaments: Tournament[] = [];
  teams: Team[] = [];
  players: Player[] = [];
  goals: Goal[] = [];

  filteredGoals: Goal[] = [];
  matches: Match[] = [];

  filteredTeams: Team[] = [];
  filteredPlayers: Player[] = [];

  searchGoal: string = '';

  public goal: Goal = {
    player: {} as Player,
    team: {} as Team,
    match: {} as Match,
    goal_time: '',
    points: 1
  };

  showGoalModal = false;
  isEditing = false;
  loading = true;
  selectedTournament?: Tournament;
  selectedTeam?: Team;

  constructor(
    private goalService: GoalService,
    private playerService: PlayerService,
    private tournamentService: TournamentService,
    private matchService: MatchService,
    private teamService: TeamService,
    private messageService: MessageService,
    private teamPlayerService: TeamPlayerService,
  ) { }

  async ngOnInit() {
    try {
      this.goals = await this.goalService.getAllGoals();
      this.tournaments = await this.tournamentService.getAllTournaments();
      this.teams = await this.teamService.getAllTeams();
      this.filteredGoals = this.goals;
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo cargar la información'
      });
    } finally {
      this.loading = false;
    }
  }

  onTournamentChange() {
    const tournamentId = this.selectedTournament?.id;
    this.filteredTeams = this.teams.filter(team => team.tournament?.id === tournamentId);
    this.selectedTeam = undefined;
    this.filteredPlayers = [];
    this.goal.player = {} as Player;
  }

  async onTeamChange() {
    if (!this.selectedTeam) return;
    const teamId = this.selectedTeam.id;
    this.filteredPlayers = await this.teamPlayerService.getPlayerForTeam(1);
    this.goal.player = {} as Player;
  }
  filterGoals() {
    const term = this.searchGoal.toLowerCase();
    this.filteredGoals = this.goals.filter(goal =>
      goal.player?.names?.toLowerCase().includes(term)
      || goal.goal_time.toLowerCase().includes(term)
      || goal.points.toString().includes(term)
    );
  }

  editGoal(goal: Goal) {
    this.goal = { ...goal };
    this.isEditing = true;
    this.showGoalModal = true;
  }

  async registerGoal() {
    if (!this.goal.player?.id || !this.goal.match?.id || !this.goal.goal_time.trim() || this.goal.points <= 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Complete todos los campos correctamente'
      });
      return;
    }

    try {
      let response;
      if (this.isEditing && this.goal.id) {
        response = await this.goalService.updateGoal(this.goal.id, this.goal);
      } else {
        response = await this.goalService.saveGoal(this.goal);
      }

      if (response?.id) {
        this.messageService.add({
          severity: 'success',
          summary: 'Hecho',
          detail: `Gol ${this.isEditing ? 'actualizado' : 'registrado'} correctamente.`
        });
        this.showGoalModal = false;
        this.isEditing = false;
        this.goal = { player: {} as Player, team: {} as Team, match: {} as Match, goal_time: '', points: 1 };
        await this.ngOnInit();
      } else if (response?.error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al guardar el gol, intente de nuevo más tarde'
      });
    }
  }

  cancelGoal() {
    this.goal = { player: {} as Player, team: {} as Team,match: {} as Match, goal_time: '', points: 1 };
    this.isEditing = false;
    this.showGoalModal = false;
  }

  async deleteGoal(goal: Goal) {
    if (confirm(`¿Seguro que quieres eliminar el gol de ${goal.player.names}?`)) {
      try {
        await this.goalService.deleteGoal(goal.id!);
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Gol eliminado correctamente.' });
        await this.ngOnInit();
      } catch {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el gol.' });
      }
    }
  }
}
