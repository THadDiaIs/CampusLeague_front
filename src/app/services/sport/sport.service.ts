import { Sport } from '../../types/sport';
import { Get, Post } from '../api/api.generic';

export const getSport = async (id: number): Promise<Sport> => {
  const response = await Get<Sport>(`/deporte/${id}`, {}, true);
  return response.data;
};

export const getAllSports = async (): Promise<Sport[]> => {
  const response = await Get<Sport[]>(`/deporte`, {}, true);
  return response.data;
};
