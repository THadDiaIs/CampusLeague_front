import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PlayerTableComponent } from './player-table/player-table.component';

@Component({
  selector: 'app-players',
  imports: [PlayerTableComponent],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent {

}
