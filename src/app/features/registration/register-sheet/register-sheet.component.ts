import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Team } from '../../../types/team';

@Component({
  selector: 'app-register-sheet',
  imports: [NgFor],
  templateUrl: './register-sheet.component.html',
  styleUrl: './register-sheet.component.css'
})
export class RegisterSheetComponent {

  mockTeam: Team = {
    name: "MUMES",
    inscription_date: new Date(),
    players: [
      {names: "Santiago D az", carnet: "12345678", age: 25, position: {name: "PORTERO", description: ""}},
      {names: "Juan P rez", carnet: "90123456", age: 28, position: {name: "DEFENSOR", description: ""}},
      {names: "Pedro  lvarez", carnet: "11111111", age: 30, position: {name: "DEFENSOR", description: ""}},
      {names: "Andr s G mez", carnet: "22222222", age: 22, position: {name: "DEFENSOR", description: ""}},
      {names: "Miguel  ngel", carnet: "33333333", age: 25, position: {name: "DEFENSOR", description: ""}},
      {names: "Mar a Fern ndez", carnet: "44444444", age: 27, position: {name: "MEDIOCAMPISTA", description: ""}},
      {names: "Ignacio Hern ndez", carnet: "55555555", age: 29, position: {name: "MEDIOCAMPISTA", description: ""}},
      {names: "Ana Garc a", carnet: "66666666", age: 26, position: {name: "DELANTERO", description: ""}},
    ],
    captain: ""
  };

}
