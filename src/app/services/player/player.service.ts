import { Player } from '../../types/player';
import { ApiService } from '../api/api.generic';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private apiService: ApiService) {
  }

  async getPlayer(id: number): Promise<Player> {
    try {
      return await this.apiService.get<Player>(`jugador/${id}`, {}, true);
    } catch (error) {
      console.error('Error fetching player:', error);
      throw error;
    }
  }

  async updatePlayer(id: number, playerData: Player): Promise<Player> {
    try {
      return await this.apiService.put<Player>(`jugador/${id}`, playerData, true);
    } catch (error) {
      console.error('Error updating player:', error);
      throw error;
    }
  }

  async deletePlayer(id: number): Promise<Player> {
    try {
      return await this.apiService.delete<Player>(`jugador/${id}`);
    } catch (error) {
      console.error('Error deleting player:', error);
      throw error;
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    try {
      
      return await this.apiService.get<Player[]>(`jugador`, {}, true);
    } catch (error) {
      console.error('Error fetching all players:', error);
      throw error;
    }
  }
}
