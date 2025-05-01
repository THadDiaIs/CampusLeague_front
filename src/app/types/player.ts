import { Position } from "./position";
import { Status } from "./status";

export interface Player {
  id?: number;
  names: string;
  age: number;
  carnet: string;
  position?: Position;
  team?: string;
  status?: Status;
  created_at?: Date;
}