import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.generic";
import { TeamPlayer } from "../../types/TeamPlayer";

@Injectable({
    providedIn: 'root'
})
export class TeamPlayerService {
    constructor(private apiService: ApiService) {
    }

    async getTeamPlayerPositions(id: number): Promise<TeamPlayer | any> {
        try {
            return await this.apiService.get<TeamPlayer>(`equipo/jugadores/${id}`, {}, false);
        } catch (error) {
            console.error('Error fetching field: ', error)
            return error
        }
    }
}