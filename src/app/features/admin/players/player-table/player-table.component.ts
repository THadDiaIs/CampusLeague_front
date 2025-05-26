import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PlayerService } from '../../../../../app/services/player/player.service';
import { Player } from '../../../../types/player';
import { FormsModule } from '@angular/forms';
import { Status } from '../../../../types/status';
import { StatusService } from '../../../../services/status/status.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown'; 

@Component({
  selector: 'app-player-table',
  standalone: true,
  templateUrl: './player-table.component.html',
  imports: [
    CommonModule,
    InputTextModule,
    ToastModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
    ButtonModule,
    DropdownModule
  ],
  providers: [PlayerService, StatusService, MessageService]
})
export class PlayerTableComponent implements OnInit {
  players: Player[] = [];
  statuses: Status[] = []
  filteredPlayers: Player[] = [];
  searchPlayer: string = '';
  showPlayerModal: boolean = false;

  newPlayer: Player = {
    names: '',
    carnet: '',
    age: 0
  };

  constructor(
    private playerService: PlayerService,
    private statusService: StatusService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
   await Promise.all([
      this.loadPlayers(),
      this.loadStatuses()
    ]);
    
  }

  async loadPlayers() {
    this.players = await this.playerService.getAllPlayers();
    this.filteredPlayers = this.players;
  }

  async loadStatuses() {
    this.statuses = await this.statusService.getAllStatus();
  }
  
  filterPlayers() {
    const term = this.searchPlayer.toLowerCase();
    this.filteredPlayers = this.players.filter(player =>
      player.names.toLowerCase().includes(term)
    );
  }

  removePlayer(id: number): void {
    this.playerService.deletePlayer(id).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Jugador eliminado',
        detail: 'El jugador fue eliminado correctamente.'
      });
      this.loadPlayers();
    }).catch(error => {
      console.error('Error eliminando jugador', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo eliminar el jugador.'
      });
    });
  }

  editPlayer(player: Player): void {
    this.newPlayer = { ...player };
    this.showPlayerModal = true;
  }

  updatePlayer(): void {
    console.log("Aca esta elplayer" , this.newPlayer)
    if (this.newPlayer.id) {
      this.playerService.updatePlayer(this.newPlayer.id, this.newPlayer).then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Jugador actualizado',
          detail: 'Los datos fueron guardados correctamente.'
        });
        this.showPlayerModal = false;
        this.loadPlayers();
      }).catch(err => {
        console.error(err);
        
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el jugador.'
        });
      });
    }
  }
}
