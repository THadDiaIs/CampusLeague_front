import { Player } from "./player";
import { Position } from "./position";
import { Team } from "./team";

export interface TeamPlayer {
    id?: number;
    team?: Team;
    player?: Player;
    playerPosition?: Position;
}