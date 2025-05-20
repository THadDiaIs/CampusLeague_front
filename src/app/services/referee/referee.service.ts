import { Referee } from '../../types/referee';
import { Get, Post } from '../api/api.generic';

export const getReferee = async (id: number): Promise<Referee> => {
  const response = await Get<Referee>(`/arbitro/${id}`, {}, true);
  return response.data;
};

export const updateReferee = async (id: number, refereeData: Referee): Promise<Referee> => {
  const response = await Post<Referee>(`/arbitro/${id}`, refereeData, true);
  return response.data;
};

export const deleteReferee = async (id: number): Promise<Referee> => {
  const response = await Post<Referee>(`/arbitro/${id}`, {}, true);
  return response.data;
};

export const getAllReferees = async (): Promise<Referee[]> => {
  const response = await Get<Referee[]>(`/arbitro`, {}, true);
  return response.data;
};
