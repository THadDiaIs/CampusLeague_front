import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { Field } from '../../../types/field';
import { Status } from '../../../types/status';
import { FieldService } from '../../../services/field/field.service';
import { StatusService } from '../../../services/status/status.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ToastModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
    ButtonModule,
    DropdownModule
  ],
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css'],
  providers: [FieldService, StatusService, MessageService]
})
export class FieldsComponent implements OnInit {
  fields: Field[] = [];
  filteredFields: Field[] = [];
  searchField = '';
  showFieldModal = false;
  isEditing = false;
  loading = true;
  statuses: Status[] = [];

  field: Field = {
    name: '',
    location: '',
    capacity: 0
  };

  constructor(
    private fieldService: FieldService,
    private statusService: StatusService,
    private messageService: MessageService
  ) { }

  async ngOnInit() {
    try {
      this.fields = await this.fieldService.getAllFields();
      this.filteredFields = this.fields;
      this.loadStatus();
    } finally {
      this.loading = false;
    }
  }

  async loadStatus() {
    this.statuses = (await this.statusService.getAllStatus())
      .filter(status => [1, 2].includes(status.id));
  }
  filterFields() {
    const query = this.searchField.toLowerCase();
    this.filteredFields = this.fields.filter(f =>
      f.name.toLowerCase().includes(query)
    );
  }

  editField(f: Field) {
    this.field = { ...f };
    this.isEditing = true;
    this.showFieldModal = true;
  }

  cancelField() {
    this.field = { name: '', location: '', capacity: 0 };
    this.isEditing = false;
    this.showFieldModal = false;
  }

  async saveField() {
    if (this.field.name.trim().length < 3) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El nombre debe tener al menos 3 caracteres.'
      });
      return;
    }

    if (this.field.capacity < 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'La capacidad no puede ser negativa.'
      });
      return;
    }

    try {
      let response;
      if (this.isEditing) {
        response = await this.fieldService.updateField(this.field.id!, this.field);
      } else {
        response = await this.fieldService.saveField(this.field);
      }
      
      if (response?.id) {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `Cancha ${this.isEditing ? 'actualizada' : 'creada'} correctamente.`
        });
        this.cancelField();
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
    } catch (error: any) {
      const msg = error.error?.error
      || 'Hubo un problema al guardar la cancha, intente mas tarde.';
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: msg
      });
    }
  }

  removeField(id: number): void {
    this.fieldService.deleteField(id).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'cancha eliminada',
        detail: 'La cancha fue eliminada correctamente.'
      });
      this.ngOnInit();
    }).catch(error => {
      console.error('Error eliminando cancha', error);
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'No se puede eliminar la cancha'
      })
    })
  }
}
