export interface Team {
    id: number;
    name: string;
    approved_date?: Date;
    inscription_date?: Date;
    coach_id?: number | null;
    status_id: number;
    approved_by: number;
  }