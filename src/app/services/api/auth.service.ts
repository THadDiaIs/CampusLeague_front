import { Login } from "../../types/login";
import { ApiService } from "./api.generic";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  async login(params: Login): Promise<number> {
    try {
      const response = await this.post<any>("auth/login", params, false);
      const { token } = response;
      if (token) {
        window.localStorage.setItem("token", token);
      }
      return 200;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}