import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Tournament } from '../../../types/tournament';
import { Sport } from '../../../types/sport';
import { SportService } from '../../../services/sport/sport.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ToastModule
  ],
  providers: [MessageService],
  standalone: true
})
export class TournamentComponent implements OnInit {
  tournament: Tournament = {
    id: 0,
    tournament_name: '',
    sport: { id: 0, sport_name: '' },
    start_date: new Date(),
    end_date: new Date(),
    description: '',
    max_team_members: 0,
    min_team_members: 0,
    status: {
      id: 0,
      status_name: ''
    }
  };

  sports: Sport[] = [];
  logoUrl: string = '';

  constructor(
    private messageService: MessageService,
    private sportService: SportService
  ) {}

  ngOnInit(): void {
    this.loadSports();
  }

  async loadSports() {
    try {
      const sports = await this.sportService.getAllSports();
      if (sports && sports.length > 0) {
        this.sports = sports;
      }
    } catch (error) {
      console.error('Error loading sports:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al cargar los deportes'
      });
    }
  }


  async registerTournament() {
    if (!this.tournament.tournament_name || !this.tournament.sport.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor complete todos los campos requeridos'
      });
      return;
    }

    // TODO: Implement the tournament registration logic
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Torneo registrado exitosamente'
    });
  }

  cancel() {
    // TODO: Implement cancel logic
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Registro cancelado'
    });
  }
}
