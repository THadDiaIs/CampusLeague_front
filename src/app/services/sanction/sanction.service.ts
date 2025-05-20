import { Sanction } from '../../types/sanction';
import { Get, Post } from '../api/api.generic';

export const getSanction = async (id: number): Promise<Sanction> => {
  const response = await Get<Sanction>(`/sanciones/${id}`, {}, true);
  return response.data;
};

export const getAllSanctions = async (): Promise<Sanction[]> => {
  const response = await Get<Sanction[]>(`/sanciones`, {}, true);
  return response.data;
};
