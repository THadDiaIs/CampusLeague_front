import { Authority } from "./authority";
import { Status } from "./status";

export interface User {
    id:                    number;
    username:              string;
    password:              string;
    email:                 string;
    created_at:            Date;
    status:                Status;
    created_by:            number;
    enabled:               boolean;
    accountNonExpired:     boolean;
    accountNonLocked:      boolean;
    credentialsNonExpired: boolean;
    authorities:           Authority[];
}