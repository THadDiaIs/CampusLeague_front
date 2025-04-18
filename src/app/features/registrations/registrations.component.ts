import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterDataService } from '../../services/register/register.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-registrations',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './registrations.component.html',
  styleUrl: './registrations.component.css'
})
export class RegistrationsComponent implements OnInit, OnDestroy {
  players: any[] = [];
  private subscription!: Subscription;
  teamName: string = '';
  shirtColor: string = '';

  constructor(
    private registerDataService: RegisterDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.teamName = sessionStorage.getItem('teamName') || '';
    this.shirtColor = sessionStorage.getItem('shirtColor') || '';
    this.subscription = this.registerDataService.data$.subscribe(data => {
      this.players = data;
    });  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deletePlayer(index: number){
    this.registerDataService.deletePlayer(index);
  }

  registrationsCancel(){
    this.registerDataService.registrationsCancel();
    sessionStorage.removeItem('teamName');
    sessionStorage.removeItem('shirtColor');
    this.router.navigate(['/home']);
  }

  saveTeamInfo() {
    sessionStorage.setItem('teamName', this.teamName);
    sessionStorage.setItem('shirtColor', this.shirtColor);
  }
}
