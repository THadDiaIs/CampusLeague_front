import { PlayerPosition } from "../../types/player_position";
import { Get } from "./api.generic";

export async function getPlayerPositions(): Promise<PlayerPosition[]> {
    try {
        const response = await Get("player-position", false);
        return response.data;
      } catch (error: any) {
        console.error("Error al obtener las posiciones de jugadores:", error);
        return [];
      }
    
}