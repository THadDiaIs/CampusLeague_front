import axios from "axios";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/campus-league/api/';

  constructor() { }

  private getToken(): string {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : '';
  }

  private getHeaders(needAuth: boolean = false): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };

    if (needAuth) {
      const token = this.getToken();
      if (token) {
        headers['Authorization'] = token;
      }
    }

    return headers;
  }

  async get<T>(endpoint: string, params: any = {}, needAuth: boolean = false): Promise<T> {
    const instance = axios.create({
      baseURL: this.apiUrl,
      headers: this.getHeaders(needAuth)
    });

    return instance.get<T>(endpoint, {
      params,
    }).then(response => {
      return response.data
    })
      .catch(error => {
        throw error.response?.data || error;
      });
  }

  async post<T>(endpoint: string, data: any, needAuth: boolean = true): Promise<T> {
    const instance = axios.create({
      baseURL: this.apiUrl,
      headers: this.getHeaders(needAuth)
    });

    return instance.post<T>(endpoint, data).then(response => response.data)
      .catch(error => {
        throw error.response?.data || error;
      });
  }

  async put<T>(endpoint: string, data: any, needAuth: boolean = true): Promise<T> {
  const instance = axios.create({
    baseURL: this.apiUrl,
    headers: this.getHeaders(needAuth)
  });

  return instance.put<T>(endpoint, data)
    .then(response => response.data)
    .catch(error => {
      throw error.response?.data || error;
    });
}
  async delete<T>(endpoint: string, needAuth: boolean = true): Promise<T> {
    const instance = axios.create({
      baseURL: this.apiUrl,
      headers: this.getHeaders(needAuth)
    });

    return instance.delete<T>(endpoint)
      .then(response => response.data)
      .catch(error => {
        throw error.response?.data || error;
      });
  }
}