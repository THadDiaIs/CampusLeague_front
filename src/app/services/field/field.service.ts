import { Field } from '../../types/field';
import { ApiService } from '../api/api.generic';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  constructor(private apiService: ApiService) {
  }

  async getField(id: number): Promise<Field> {
    try {
      return await this.apiService.get<Field>(`campo/${id}`, {}, true);
    } catch (error) {
      console.error('Error fetching field:', error);
      throw error;
    }
  }

  async updateField(id: number, fieldData: Field): Promise<Field | any> {
    try {
      return await this.apiService.put<Field>(`campo/${id}`, fieldData, true);
    } catch (error) {
      console.error('Error updating field:', error);
      return error;
    }
  }

  async deleteField(id: number): Promise<Field> {
    try {
      return await this.apiService.delete<Field>(`campo/${id}`);
    } catch (error) {
      console.error('Error deleting field:', error);
      throw error;
    }
  }

  async getAllFields(): Promise<Field[]> {
    try {
      return await this.apiService.get<Field[]>(`campo`, {}, true);
    } catch (error) {
      console.error('Error fetching all fields:', error);
      throw error;
    }
  }

  async saveField(field: Field): Promise<Field | any> {
    try {
      const response = await this.apiService.post<Field>("campo", field, true);
      return response;
    } catch (error) {
      console.log("Error on saving field:", error);
      return error;
    }
  }
}
