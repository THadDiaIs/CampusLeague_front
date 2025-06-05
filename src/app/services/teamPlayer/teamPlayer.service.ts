import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.generic";
import { TeamPlayer } from "../../types/teamPlayer";
import { Player } from "../../types/player";

@Injectable({
    providedIn: 'root'
})
export class TeamPlayerService {
    constructor(private apiService: ApiService) {
    }

    async getTeamPlayerPositions(id: number): Promise<TeamPlayer | any> {
        try {
            return await this.apiService.get<TeamPlayer>(`equipo/jugadores-info/${id}`, {}, true);
        } catch (error) {
            console.error('Error fetching players info: ', error)
            return error
        }
    }

    async getPlayerForTeam(id: number): Promise<Player | any> {
        try {
            return await this.apiService.get<Player>(`equipo/jugadores/${id}`, {}, false);
        } catch (error) {
            console.error('Error fetching players for team: ', error)
            return error
        }
    }
}