import { Referee } from '../../types/referee';
import { ApiService } from '../api/api.generic';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefereeService {
  constructor(private apiService: ApiService) {
  }

  async getReferee(id: number): Promise<Referee> {
    try {
      return await this.apiService.get<Referee>(`arbitro/${id}`, {}, true);
    } catch (error) {
      console.error('Error fetching referee:', error);
      throw error;
    }
  }

  async updateReferee(id: number, refereeData: Referee): Promise<Referee> {
    try {
      return await this.apiService.post<Referee>(`arbitro/${id}`, refereeData, true);
    } catch (error) {
      console.error('Error updating referee:', error);
      throw error;
    }
  }

  async deleteReferee(id: number): Promise<Referee> {
    try {
      return await this.apiService.post<Referee>(`arbitro/${id}`, {}, true);
    } catch (error) {
      console.error('Error deleting referee:', error);
      throw error;
    }
  }

  async getAllReferees(): Promise<Referee[]> {
    try {
      return await this.apiService.get<Referee[]>(`arbitro`, {}, true);
    } catch (error) {
      console.error('Error fetching all referees:', error);
      throw error;
    }
  }
}
