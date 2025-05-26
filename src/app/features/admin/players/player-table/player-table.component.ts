import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { PlayerService } from '../../../../../app/services/player/player.service';
import { Player } from '../../../../types/player';

@Component({
  selector: 'app-player-table',
  standalone: true,
  templateUrl: './player-table.component.html',
  imports: [CommonModule, InputTextModule, ToastModule],
  providers: [PlayerService, MessageService]
})
export class PlayerTableComponent implements OnInit {
  players: Player[] = [];
  loading = true;

  constructor(
    private playerService: PlayerService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    try {
      this.players = await this.playerService.getAllPlayers();
    } finally {
      this.loading = false;
    }
  }

  clear(table: any) {
    table.clear();
  }

  removePlayer(id: number): void {
    this.playerService.deletePlayer(id).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Jugador eliminado',
        detail: 'El jugador fue eliminado correctamente.'
      });
      this.ngOnInit();
    }).catch(error => {
      console.error('Error eliminando jugador', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo eliminar el jugador.'
            });
    });
  }
}
