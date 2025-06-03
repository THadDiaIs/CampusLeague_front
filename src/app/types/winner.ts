import { Team } from "./team";
import { Tournament } from "./tournament";

export interface Winner {
    id?: number,
    team: Team,
    position: number,
    tournament: Tournament
}