import { PositionsPlayers } from "../../types/positions.players.type";
import { Get } from "./api.generic";

export async function playerPositions() {
  console.log("Aca ")
    try {
        const response = await Get("player-position", false);
        return response.data;
      } catch (error: any) {
        console.error("Error al obtener las posiciones de jugadores:", error);
        return null;
      }
    
}