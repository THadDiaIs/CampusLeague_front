import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.generic";
import { Winner } from "../../types/winner";

@Injectable({
    providedIn: 'root'
})
export class WinnerService {
    constructor(private apiService: ApiService) {
    }

    async getWinner(id: number): Promise<Winner> {
        try {
            return await this.apiService.get<Winner>(`ganador/${id}`, {}, false);
        } catch (error) {
            console.error('Error fetching winner:', error);
            throw error;
        }
    }

    async updateWinner(id: number, winnerData: Winner): Promise<Winner> {
        try {
            return await this.apiService.put<Winner>(`ganador/${id}`, winnerData, true);
        } catch (error) {
            console.error('Error updating winner:', error);
            throw error;
        }
    }

    async deleteWinner(id: number): Promise<Winner> {
        try {
            return await this.apiService.delete<Winner>(`ganador/${id}`);
        } catch (error) {
            console.error('Error deleting winner:', error);
            throw error;
        }
    }

    async saveWinner(winner: Winner): Promise<Winner | any> {
        try {
            const response = await this.apiService.post<Winner>("ganador", winner, true);
            return response;
        } catch (error) {
            console.log("Error on saving winner:", error);
            return error;
        }
    }

    async getAllWinners(): Promise<Winner[]> {
        try {
            return await this.apiService.get<Winner[]>(`ganador`, {}, false);
        } catch (error) {
            console.error('Error fetching all winners:', error);
            throw error;
        }
    }
}
