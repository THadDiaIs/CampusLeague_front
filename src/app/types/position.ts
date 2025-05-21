import { Sport } from "./sport";

export interface Position {
    id?: number;
    name: string;
    description: string;
    sport?: Sport;
}