import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Tournament } from '../../../types/tournament';
import { Sport } from '../../../types/sport';
import { SportService } from '../../../services/sport/sport.service';
import { TournamentService } from '../../../services/tournament/tournament.service'; 
import { Status } from '../../../types/status';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css'],
  imports: [CommonModule, FormsModule, ToastModule, HttpClientModule],
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
    inscriptions_open_date: new Date(),
    inscriptions_close_date: new Date(),
    description: '',
    max_team_members: 0,
    min_team_members: 0,
    status: { id: 0, status_name: '' },
  };

  sports: Sport[] = [];
  statuses: Status[] = [
    { id: 1, status_name: 'Activo' },
    { id: 2, status_name: 'Inactivo' },
    { id: 3, status_name: 'En Progreso' },
    { id: 4, status_name: 'Finalizado' },
  ];

  constructor(
    private messageService: MessageService,
    private sportService: SportService,
    private tournamentService: TournamentService 
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
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar los deportes' });
    }
  }

  compareSports(s1: Sport, s2: Sport): boolean {
    return s1 && s2 ? s1.id === s2.id : s1 === s2;
  }

compareStatuses(st1: Status, st2: Status): boolean {
  return st1 && st2 ? st1.id === st2.id : st1 === st2;
}


async registerTournament() {
  if (!this.tournament.tournament_name || !this.tournament.sport?.id || !this.tournament.status?.id) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor complete todos los campos requeridos' });
    return;
  }

  try {
    console.log(this.tournament)
    await this.tournamentService.save(this.tournament);
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Torneo registrado exitosamente' });
    this.resetForm();
  } catch (error) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar el torneo' });
  }
}


  cancel() {
    this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Registro cancelado' });
    this.resetForm();
  }

  resetForm() {
    this.tournament = {
      id: 0,
      tournament_name: '',
      sport: { id: 0, sport_name: '' },
      start_date: new Date(),
      end_date: new Date(),
      inscriptions_open_date: new Date(),
      inscriptions_close_date: new Date(),
      description: '',
      max_team_members: 0,
      min_team_members: 0,
      status: { id: 0, status_name: '' },
    };
  }
}
