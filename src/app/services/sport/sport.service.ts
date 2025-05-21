import { Sport } from '../../types/sport';
import { ApiService } from '../api/api.generic';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportService {
  constructor(private apiService: ApiService) {
  }

  async getSport(id: number): Promise<Sport> {
    try {
      return await this.apiService.get<Sport>(`deporte/${id}`, {}, true);
    } catch (error) {
      console.error('Error fetching sport:', error);
      throw error;
    }
  }

  async getAllSports(): Promise<Sport[]> {
    try {
      return await this.apiService.get<Sport[]>(`deporte`, {}, true);
    } catch (error) {
      console.error('Error fetching all sports:', error);
      throw error;
    }
  }
}
