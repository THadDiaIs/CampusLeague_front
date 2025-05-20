import { Get, Post } from '../api/api.generic';
import { Player } from '../../types/player';

export const getPlayer = async (id: number): Promise<Player> => {
  const response = await Get<Player>(`/jugador/${id}`, {}, true);
  return response.data;
};

export const updatePlayer = async (id: number, playerData: Player): Promise<Player> => {
  const response = await Post<Player>(`/jugador/${id}`, playerData, true);
  return response.data;
};

export const deletePlayer = async (id: number): Promise<Player> => {
  const response = await Post<Player>(`/jugador/${id}`, {}, true);
  return response.data;
};

export const getAllPlayers = async (): Promise<Player[]> => {
  const response = await Get<Player[]>(`/jugador`, {}, true);
  return response.data;
};
