import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TournamentService } from '../../../services/tournament/tournament.service';
import { Tournament } from '../../../types/tournament';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-tournament-info',
  imports: [CommonModule, InputTextModule, ToastModule, FormsModule, IconFieldModule, InputIconModule],
  templateUrl: './tournament-info.component.html',
  styleUrl: './tournament-info.component.css',
  providers: [TournamentService, MessageService]
})

export class TournamentInfoComponent implements OnInit {
 tournaments: Tournament[] = [];
   filteredTorunament: Tournament[] = [];
   loading = true;
   searchTorunament: string = '';
 
   constructor(
     private tournamentService: TournamentService,
     private messageService: MessageService
   ) {}
 
   async ngOnInit() {
     try {
       this.tournaments = await this.tournamentService.getAllTournaments();
       this.filteredTorunament = this.tournaments;
     } finally {
       this.loading = false;
     }
   }
 
   filterTorunaments() {
     const term = this.searchTorunament.toLowerCase();
     this.filteredTorunament = this.tournaments.filter(tour =>
       tour.tournament_name.toLowerCase().includes(term)
     );
   }
 }
 