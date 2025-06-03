import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.generic";
import { Goal } from "../../types/goal";

@Injectable({
    providedIn: 'root'
})
export class GoalService {
    constructor(private apiService: ApiService) {
    }

    async getGoal(id: number): Promise<Goal> {
        try {
            return await this.apiService.get<Goal>(`meta/${id}`, {}, false);
        } catch (error) {
            console.error('Error fetching goal:', error);
            throw error;
        }
    }

    async updateGoal(id: number, winnerData: Goal): Promise<Goal> {
        try {
            return await this.apiService.put<Goal>(`meta/${id}`, winnerData, true);
        } catch (error) {
            console.error('Error updating goal:', error);
            throw error;
        }
    }

    async deleteGoal(id: number): Promise<Goal> {
        try {
            return await this.apiService.post<Goal>(`meta/${id}`, {}, true);
        } catch (error) {
            console.error('Error deleting goal:', error);
            throw error;
        }
    }

    async saveGoal(winner: Goal): Promise<Goal | any> {
        try {
            const response = await this.apiService.post<Goal>("meta", winner, true);
            return response;
        } catch (error) {
            console.log("Error on saving goal:", error);
            return error;
        }
    }

    async getAllGoals(): Promise<Goal[]> {
        try {
            return await this.apiService.get<Goal[]>(`meta`, {}, false);
        } catch (error) {
            console.error('Error fetching all goals:', error);
            throw error;
        }
    }
}
