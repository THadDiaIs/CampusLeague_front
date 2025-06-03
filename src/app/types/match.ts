import { Team } from "./team";
import { Tournament } from "./tournament";

export interface Match {
    id?: number;
    match_date: Date;
    team1_score: number;
    team2_score: number;
    field_id: number;
    referee_id: number;
    status_id?: number;
    team1_id: Team;
    team2_id: Team;
    tournament: Tournament;
}