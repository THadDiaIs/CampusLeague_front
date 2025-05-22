import { Coach } from "./coach";
import { Player } from "./player";
import { Status } from "./status";
import { User } from "./user";

export interface Team {
  id?: number;
  name: string;
  inscription_date?: Date;
  approved_date?: Date;
  user?: User;
  status?: Status;
  coach?: Coach;
  players: Player[];
  captain: string;
}