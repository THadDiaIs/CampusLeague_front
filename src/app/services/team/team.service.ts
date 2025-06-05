import { Team } from '../../types/team';
import { ApiService } from '../api/api.generic';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private apiService: ApiService) {
  }

  async getTeam(id: number): Promise<Team> {
    try {
      return await this.apiService.get<Team>(`equipo/${id}`, {}, true);
    } catch (error) {
      console.error('Error fetching team:', error);
      throw error;
    }
  }

  async getMyTeam(code: string): Promise<Team | any> {
    try {
      return await this.apiService.get<Team>(`mi-equipo/${code}`, false);
    } catch (error) {
      console.error('Error fetching my team');
      return error;
    }
  }

  async updateTeam(id: number, teamData: Team): Promise<Team> {
    try {
      return await this.apiService.post<Team>(`equipo/${id}`, teamData, true);
    } catch (error) {
      console.error('Error updating team:', error);
      throw error;
    }
  }

  async aceptTeam(id: number): Promise<Team | any> {
    try {
      const response = await this.apiService.put<Team>(`equipo/aceptado/${id}`, true);
      return response;
    } catch (error) {
      console.error('Error acept team:', error);
      return error;
    }
  }

  async deleteTeam(id: number): Promise<Team> {
    try {
      return await this.apiService.delete<Team>(`equipo/${id}`);
    } catch (error) {
      console.error('Error deleting team:', error);
      throw error;
    }
  }

  async getAllTeams(): Promise<Team[]> {
    try {
      return await this.apiService.get<Team[]>(`equipo`, {}, true);
    } catch (error) {
      console.error('Error fetching all teams:', error);
      throw error;
    }
  }

  async saveTeam(team: Team): Promise<Team | any> {
    try {
      const response = await this.apiService.post<Team>("equipo", team, false);
      return response;
    } catch (error) {
      console.log("Error on saving team:", error);
      return error; 
    }
  }
}
