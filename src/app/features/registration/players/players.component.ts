import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterDataService } from '../../../services/register/register.service';
import { Router, RouterLink } from '@angular/router';
import { getPlayerPositions } from '../../../services/api/player.service';
import { PlayerPosition } from '../../../types/player_position';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-players',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  providers: [MessageService],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent {

  public nombre: string = '';
  public posicion: string = '';
  public edad: number = 0;
  public carnet: string = '';

  playerForm: FormGroup;
  playerPositions: PlayerPosition[] = [];

  constructor(
    private fb: FormBuilder,
    private registerDataService: RegisterDataService,
    private router: Router,
    private msgService: MessageService
    
  ) {
    this.playerForm = this.fb.group({
      nombre: ['', Validators.required],
      posicion: [null, Validators.required],
      edad: ['', [Validators.required, Validators.min(1)]],
      carnet: ['', [Validators.required, Validators.min(1)]]
    });
  }
  
  async ngOnInit() {
    const data = await getPlayerPositions();
    if (data) {
      this.playerPositions = data;
    } else {
      console.log("No player positions in the db");
    }
  }

  savePlayer() {
    if (this.playerForm.valid){
      this.registerDataService.saveDataPlayer(this.playerForm.value);
      this.playerForm.reset();
      this.router.navigate(['/registrations']);
    } else {
      this.msgService.add({
        severity: "error",
        summary: "Error",
        detail: "Llene todos los campos"
      });
    }

  }
}
