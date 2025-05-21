import { Sanction } from '../../types/sanction';
import { ApiService } from '../api/api.generic';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SanctionService {
  constructor(private apiService: ApiService) {
  }

  async getSanction(id: number): Promise<Sanction> {
    try {
      return await this.apiService.get<Sanction>(`sanciones/${id}`, {}, true);
    } catch (error) {
      console.error('Error fetching sanction:', error);
      throw error;
    }
  }

  async getAllSanctions(): Promise<Sanction[]> {
    try {
      const response = await this.apiService.get<Sanction[]>(`sanciones`, {}, true);
      return response;
    } catch (error) {
      console.error('Error fetching all sanctions:', error);
      throw error;
    }
  }
}