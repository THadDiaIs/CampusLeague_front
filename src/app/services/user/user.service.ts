import { User } from '../../types/user';
import { ApiService } from '../api/api.generic';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {
  }

  async getUserById(id: number): Promise<User> {
    try {
      return await this.apiService.get<User>(`usuario/${id}`, {}, true);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async updateUser(id: number, userData: User): Promise<User> {
    try {
      return await this.apiService.post<User>(`usuario/${id}`, userData, true);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      return await this.apiService.post<User>(`usuario/${id}`, {}, true);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}
