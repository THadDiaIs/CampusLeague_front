import { Status } from '../../types/status';
import { ApiService } from '../api/api.generic';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  constructor(private apiService: ApiService) {
  }

  async getStatus(id: number): Promise<Status> {
    try {
      return await this.apiService.get<Status>(`estado/${id}`, {}, true);
    } catch (error) {
      console.error('Error fetching status:', error);
      throw error;
    }
  }

  async updateStatus(id: number, statusData: Status): Promise<Status> {
    try {
      return await this.apiService.post<Status>(`estado/${id}`, statusData, true);
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  }

  async deleteStatus(id: number): Promise<Status> {
    try {
      return await this.apiService.delete<Status>(`estado/${id}`);
    } catch (error) {
      console.error('Error deleting status:', error);
      throw error;
    }
  }

  async getAllStatus(): Promise<Status[]> {
    try {
      return await this.apiService.get<Status[]>(`estado`, {}, true);
    } catch (error) {
      console.error('Error fetching all status:', error);
      throw error;
    }
  }

  async saveStatus(status: Status): Promise<Status | any> {
    try {
      const response = await this.apiService.post<Status>("estado", status, true);
      return response;
    } catch (error) {
      console.log("Error on saving status:", error);
      return error;
    }
  }
}
