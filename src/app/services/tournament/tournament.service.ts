import { Tournament } from '../../types/tournament';
import { ApiService } from '../api/api.generic';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  constructor(private apiService: ApiService) {
  }

  async getTournament(id: number): Promise<Tournament> {
    try {
      return await this.apiService.get<Tournament>(`torneo/${id}`, {}, false);
    } catch (error) {
      console.error('Error fetching tournament:', error);
      throw error;
    }
  }

  async updateTournament(id: number, tournamentData: Tournament): Promise<Tournament> {
    try {
      return await this.apiService.put<Tournament>(`torneo/${id}`, tournamentData, true);
    } catch (error) {
      console.error('Error updating tournament:', error);
      throw error;
    }
  }
  async save( tournamentData: Tournament): Promise<Tournament | any> {
    try {
      return await this.apiService.post<Tournament>(`torneo`, tournamentData, true);
    } catch (error) {
      console.error('Error save tournament:', error);
      return error;
    }
  }
  async deleteTournament(id: number): Promise<Tournament> {
    try {
      return await this.apiService.delete<Tournament>(`torneo/${id}`);
    } catch (error) {
      console.error('Error deleting tournament:', error);
      throw error;
    }
  }

  async getAllTournaments(): Promise<Tournament[]> {
    try {
      return await this.apiService.get<Tournament[]>(`torneo`, {}, false);
    } catch (error) {
      console.error('Error fetching all tournaments:', error);
      throw error;
    }
  }
}
