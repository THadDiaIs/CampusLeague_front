import { Get, Post } from '../api/api.generic';
import { Tournament } from '../../types/tournament';

export const getTournament = async (id: number): Promise<Tournament> => {
  const response = await Get<Tournament>(`/torneo/${id}`, {}, true);
  return response.data;
};

export const updateTournament = async (id: number, tournamentData: Tournament): Promise<Tournament> => {
  const response = await Post<Tournament>(`/torneo/${id}`, tournamentData, true);
  return response.data;
};

export const deleteTournament = async (id: number): Promise<Tournament> => {
  const response = await Post<Tournament>(`/torneo/${id}`, {}, true);
  return response.data;
};

export const getAllTournaments = async (): Promise<Tournament[]> => {
  const response = await Get<Tournament[]>(`/torneo`, {}, false);
  return response.data;
};
