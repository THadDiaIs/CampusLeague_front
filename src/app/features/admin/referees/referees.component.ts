import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RefereeService } from '../../../services/referee/referee.service';
import { Referee } from '../../../types/referee';
import { MessageService } from 'primeng/api';
import { StatusService } from '../../../services/status/status.service';
import { Status } from '../../../types/status';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-referees',
  imports: [CommonModule, InputTextModule, ToastModule, FormsModule, IconFieldModule, InputIconModule, DialogModule, ButtonModule, DropdownModule],
  templateUrl: './referees.component.html',
  styleUrl: './referees.component.css',
  providers: [RefereeService, StatusService, MessageService]
})
export class RefereesComponent implements OnInit {

  isEditing: boolean = false;
  referees: Referee[] = [];
  statuses: Status[] = [];
  public referee: Referee = {
    name: "",
    experience_years: 0
  }
  filteredReferees: Referee[] = [];
  loading = true;
  searchReferee: string = '';
  showRefereeModal: boolean = false;

  constructor(
    private refereeService: RefereeService,
    private statusService: StatusService,
    private messageService: MessageService
  ) { }

  async ngOnInit() {
    try {
      this.referees = await this.refereeService.getAllReferees();
      this.loadStatus();
      this.filteredReferees = this.referees;
    } finally {
      this.loading = false;
    }
  }

 async loadStatus() {
  this.statuses = (await this.statusService.getAllStatus())
    .filter(status => [1, 2].includes(status.id));
}

  async registerReferee() {
    this.referee.name = this.referee.name.trim();

    if (!(this.referee.name.length > 5)) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Ingrese un nombre para el arbitro, debe tener al menos 6 caracteres"
      });
      return;
    }
    if (this.referee.experience_years < 0) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "La experiencia míninma de 0 años"
      });
      return;
    }

    try {

      let response;
      if (this.isEditing) {
        if (this.referee.id === undefined || this.referee.id < 0) {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Error al registrar el referee, intente de nuevo mas tarde"
          });
          return;
        }
        response = await this.refereeService.updateReferee(this.referee?.id, this.referee);
      } else {
        response = await this.refereeService.saveReferee(this.referee);
      }
      if (response?.id) {
        this.messageService.add({
          severity: "success",
          summary: "Done",
          detail: `Arbitro ${this.isEditing ? 'actualizada' : 'creado'} correctamente.`
        });
        this.referee = response;
        this.referee = { name: "", experience_years: 0 };
        this.showRefereeModal = false;
        this.ngOnInit();
      }
      if (response?.error) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: response.error
        });
        return;
      }
    } catch (error) {
      console.log("Error on saving referee:", error);
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Error al registrar el referee, intente de nuevo mas tarde"
      });
      return;
    }
  }

  editReferee(ref: Referee) {
    this.referee = { ...ref };
    this.isEditing = true;
    this.showRefereeModal = true;
  }

  cancelReferee() {
    this.referee = { name: "", experience_years: 0 };
    this.isEditing = false;
    this.showRefereeModal = false;
  }
  filterTeams() {
    const ref = this.searchReferee.toLowerCase();
    this.filteredReferees = this.referees.filter(referee =>
      referee.name.toLowerCase().includes(ref)
    );
  }
}
