import { Field } from "./field";
import { Referee } from "./referee";
import { Status } from "./status";
import { Team } from "./team";
import { Tournament } from "./tournament";

export interface Match {
    id?: number;
    match_date: Date;
    team1_score: number;
    team2_score: number;
    field: Field;
    referee: Referee;
    status?: Status;
    team1: Team;
    team2: Team;
    tournament: Tournament;
}