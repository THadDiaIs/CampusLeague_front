import { Position } from "../../types/position";
import { Team } from "../../types/team";
import { Get, Post } from "./api.generic";

export async function getPlayerPositions(): Promise<Position[]> {
  try {
    const response = await Get<Position[]>("posicion-jugador", undefined, false);
    return response.data;
  } catch (error: any) {
    console.error("Error on loading positions:", error);
    return [];
  }
}

export async function saveTeam(team: Team): Promise<Team | undefined> {
  try {
    const response = await Post<Team>("equipo", team, true);
    return response.data;
  } catch (error) {
    console.log("Error on saving team:", error);
    return;
  }
}