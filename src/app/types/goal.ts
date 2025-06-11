import { Match } from "./match";
import { Player } from "./player";
import { Team } from "./team";

export interface Goal {
    id?: number,
    player: Player,
    team: Team,
    match: Match,
    goal_time: Date,
    points: number,
}