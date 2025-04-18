import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterDataService } from '../../services/register/register.service';
import { Router, RouterLink } from '@angular/router';
import { playerPositions } from '../../services/api/api.position.service';

@Component({
  selector: 'app-players',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements OnInit {
  playerForm: FormGroup;
  playerPositions: any[] = [];
  temp = [
    { id: 1, name: 'Portero', description: 'Defiende el arco' },
    { id: 2, name: 'Defensa', description: 'Protege el área' },
    { id: 3, name: 'Delantero', description: 'Ataca y busca goles' }
  ];

  constructor(
    private fb: FormBuilder,
    private registerDataService: RegisterDataService,
    private router: Router
    
  ) {
    this.playerForm = this.fb.group({
      nombre: ['', Validators.required],
      posicion: [null, Validators.required],
      edad: ['', [Validators.required, Validators.min(1)]],
      carnet: ['', [Validators.required, Validators.min(1)]]
    });
  }
  
  async ngOnInit() {
    const data = await playerPositions();
    if (data) {
      this.playerPositions = data;
    } else {
      this.playerPositions = this.temp;
    }
  }

  savePlayer() {
    if (this.playerForm.valid){
      this.registerDataService.saveDataPlayer(this.playerForm.value);
      this.playerForm.reset();
      this.router.navigate(['/registrations']);
    }

  }
}
