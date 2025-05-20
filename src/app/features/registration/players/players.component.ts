import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { getPlayerPositions } from '../../../services/api/register.service';
import { Position } from '../../../types/position';
import { MessageService } from 'primeng/api';
import { Player } from '../../../types/player';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-players',
  imports: [NgFor, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent {
  @Input() positions: Position[] = [];
  @Input() players: Player[] = [];
  @Input() currPlayer: number | undefined = undefined;
  @Output() done = new EventEmitter<void>();

  public newPlayer: Player = {
    names: "",
    carnet: "",
    age: 0,
    position: {
      description: "",
      name: ""
    }
  }

  constructor(
    private msgService: MessageService
  ) { }

  closeModal(){
    this.done.emit();
  }

  savePlayer() {
    if (this.newPlayer.names.split(" ").length < 2) {
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: "Ingrese el nombre completo"
      });
      return;
    }

    if (String(this.newPlayer.carnet).length < 9
      || String(this.newPlayer.carnet).length > 15) {
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: "Parece que el carnet es incorrecto"
      });
      return;
    }

    if (Number(this.newPlayer.age) < 15 ||
      Number(this.newPlayer.age) > 80) {
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: "Ingrese una edad correcta entre 15 y 80"
      });
      return;
    }

    if (this.currPlayer != undefined) {
      const existingPlayer = this.players.filter((player, idx) => player.carnet == this.newPlayer.carnet &&  this.currPlayer != idx );

      if (existingPlayer.length > 1) {
        this.msgService.add({
          severity: "error",
          summary: "Error",
          detail: "Este carnet ya se encuentra registrado"
        });
        return;
      }

      this.players[this.currPlayer] = { ...this.newPlayer }
    } else {

      const existingPlayer = this.players.filter((player) => player.carnet == this.newPlayer.carnet );

      if (existingPlayer.length > 0) {
        this.msgService.add({
          severity: "error",
          summary: "Error",
          detail: "Este jugador ya se encuentra inscrito"
        });
        return;
      }

      this.players.push({
        ...this.newPlayer,
      });
    }
    this.done.emit();
  }
}
