import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { BadgeModule } from 'primeng/badge';
import { Ripple } from 'primeng/ripple';
import { NgFor, NgIf } from '@angular/common';
import { NgClass } from '@angular/common';
import { TournamentService } from '../../services/tournament/tournament.service';
import { TeamService } from '../../services/team/team.service';
import { MatchService } from '../../services/match/match.service';
import { PlayerService } from '../../services/player/player.service';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, PanelMenu, BadgeModule, Ripple, NgFor, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  activeTournaments: number = 0;
  todaysMatches: number = 0;
  teamsCountR: number = 0;
  teamsCountA: number = 0;
  playersCount: number = 0;
  activeDropdown: string | null = null;

  constructor(
    private tournamentService: TournamentService,
    private matchService: MatchService,
    private teamService: TeamService,
    private playerService: PlayerService
  ) { }

  async ngOnInit() {
    this.loadCountData();
  }

  async loadCountData() {
    try {
      const tournaments = await this.tournamentService.getAllTournaments();
      const matches = await this.matchService.getAllMatches();
      const teams = await this.teamService.getAllTeams();
      const players = await this.playerService.getAllPlayers();

      this.activeTournaments = tournaments
        .filter(tournament => tournament.status?.id !== undefined && [1].includes(tournament.status.id))
        .length;

      const today = new Date().toISOString().split('T')[0];
      this.todaysMatches = matches.filter(match => {
        const matchDate = new Date(match.match_date).toISOString().split('T')[0];
        return matchDate === today;
      }).length;

      this.teamsCountR = teams
        .filter(team => team.status?.id !== undefined && [2,10,13].includes(team.status.id))
        .length;

      this.teamsCountA = teams
        .filter(team => team.status?.id !== undefined && [1,3,5,8].includes(team.status.id))
        .length;

      this.playersCount = players
      .filter(player => player.status?.id !== undefined && [1,2,5,8,].includes(player.status.id))
      .length;
    } catch (error) {
      console.error('Error loading Data:', error);
      this.activeTournaments = 0;
    }

  }

  toggleDropdown(dropdown: string) {
    this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
  }

  closeDropdown() {
    this.activeDropdown = null;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('.relative')) {
      this.closeDropdown();
    }
  }
}
