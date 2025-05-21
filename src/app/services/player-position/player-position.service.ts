import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.generic';
import { Position } from '../../types/position';

@Injectable({
  providedIn: 'root'
})
export class PlayerPositionService {
  constructor(private apiService: ApiService) {}

  async getPlayerPositions(): Promise<Position[]> {
    try {
      return await this.apiService.get<Position[]>('posicion-jugador', {}, false);
    } catch (error) {
      console.error('Error fetching player positions:', error);
      throw error;
    }
  }

  async updatePlayerPosition(playerId: number, position: Position): Promise<Position> {
    try {
      return await this.apiService.post<Position>(`posicion-jugador/${playerId}`, position, true);
    } catch (error) {
      console.error('Error updating player position:', error);
      throw error;
    }
  }

  async deletePlayerPosition(playerId: number): Promise<void> {
    try {
      await this.apiService.post<void>(`posicion-jugador/${playerId}`, {}, true);
    } catch (error) {
      console.error('Error deleting player position:', error);
      throw error;
    }
  }

  async removePlayerPosition(playerId: number): Promise<void> {
    try {
      await this.apiService.post<void>(`jugador/${playerId}/posicion`, {}, true);
    } catch (error) {
      console.error('Error removing player position:', error);
      throw error;
    }
  }

  
  async getPlayerPositionsBySport(sportId: number): Promise<Position[]> {
    try {
      return await this.apiService.get<Position[]>(`posicion-jugador/deporte/${sportId}`, {}, false);
    } catch (error) {
      console.error('Error fetching player positions by sport:', error);
      throw error;
    }
  }

}
