import { Match } from '../../types/match';
import { Get, Post } from '../api/api.generic';

export const getMatch = async (id: number): Promise<Match> => {
  const response = await Get<Match>(`/partido/${id}`, {}, true);
  return response.data;
};

export const updateMatch = async (id: number, matchData: Match): Promise<Match> => {
  const response = await Post<Match>(`/partido/${id}`, matchData, true);
  return response.data;
};

export const deleteMatch = async (id: number): Promise<Match> => {
  const response = await Post<Match>(`/partido/${id}`, {}, true);
  return response.data;
};

export const getAllMatches = async (): Promise<Match[]> => {
  const response = await Get<Match[]>(`/partido`, {}, true);
  return response.data;
};
