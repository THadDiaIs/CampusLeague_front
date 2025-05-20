import { Team } from '../../types/team';
import { Get, Post } from '../api/api.generic';

export const getTeam = async (id: number): Promise<Team> => {
  const response = await Get<Team>(`/equipo/${id}`, {}, true);
  return response.data;
};

export const updateTeam = async (id: number, teamData: Team): Promise<Team> => {
  const response = await Post<Team>(`/equipo/${id}`, teamData, true);
  return response.data;
};

export const deleteTeam = async (id: number): Promise<Team> => {
  const response = await Post<Team>(`/equipo/${id}`, {}, true);
  return response.data;
};

export const getAllTeams = async (): Promise<Team[]> => {
  const response = await Get<Team[]>(`/equipo`, {}, true);
  return response.data;
};
