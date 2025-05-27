import { Status } from "./status";

export interface Field {
    id?: number,
    capacity: number,
    location: string,
    name: string,
    status?: Status,
}