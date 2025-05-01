import { Sport } from "./sport";
import { Status } from "./status";

export interface Tournament {
    id?: number;
    tournament_name: string;
    sport: Sport;
    start_date: Date;
    end_date: Date;
    description: string;
    max_team_members: number;
    min_team_members: number;
    status?: Status;
}