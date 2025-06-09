import { Match } from '../../types/match';
import { ApiService } from '../api/api.generic';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  constructor(private apiService: ApiService) {
  }

  async getMatch(id: number): Promise<Match> {
    try {
      return await this.apiService.get<Match>(`partido/${id}`, {}, true);
    } catch (error) {
      console.error('Error fetching match:', error);
      throw error;
    }
  }

  async updateMatch(id: number, matchData: Match): Promise<Match> {
    try {
      return await this.apiService.put<Match>(`partido/${id}`, matchData, true);
    } catch (error) {
      console.error('Error updating match:', error);
      throw error;
    }
  }

  async deleteMatch(id: number): Promise<Match> {
    try {
      return await this.apiService.post<Match>(`partido/${id}`, {}, true);
    } catch (error) {
      console.error('Error deleting match:', error);
      throw error;
    }
  }

  async saveMatch(matchData: Match): Promise<Match | any> {
    try {
      return await this.apiService.post<Match>(`partido`, matchData, true);
    } catch (error) {
      console.error('Error save match:', error);
      return error;
    }
  }

  async getAllMatches(): Promise<Match[]> {
    try {
      return await this.apiService.get<Match[]>(`partido`, {}, true);
    } catch (error) {
      console.error('Error fetching all matches:', error);
      throw error;
    }
  }
}
