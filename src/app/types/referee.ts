import { Status } from "./status";

export interface Referee {
    id?: number,
    experience_years: number,
    name: string,
    status?: Status
}