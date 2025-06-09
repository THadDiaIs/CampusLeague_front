import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TeamComponent } from './features/registration/team/team.component';
import { TournamentComponent } from './features/registration/tournament/tournament.component';
import { PlayersComponent } from './features/admin/players/players.component';
import { TeamsInfoComponent } from './features/admin/teams-info/teams-info.component';
import { TournamentInfoComponent } from './features/admin/tournament-info/tournament-info.component';
import { RefereesComponent } from './features/admin/referees/referees.component';
import { FieldsComponent } from './features/admin/fields/fields.component';
import { MyTeamComponent } from './features/my-team/my-team.component';
import { GoalsComponent } from './features/admin/goals/goals.component';
import { WinnersComponent } from './features/admin/winners/winners.component';
import { MatchesComponent } from './features/admin/matches/matches.component';
import { CalendarComponent } from './features/calendar/calendar.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'my-team', component: MyTeamComponent },
    { path: 'calendar', component: CalendarComponent},
    
    { path: 'dashboard', component: DashboardComponent,
        children: [
            { path: 'tournament', component: TournamentComponent },
            { path: 'players', component: PlayersComponent },
            { path: 'teams-info', component: TeamsInfoComponent },
            { path: 'tournament-info', component: TournamentInfoComponent },
            { path: 'referees', component: RefereesComponent },
            { path: 'fields', component: FieldsComponent },
            { path: 'matches', component: MatchesComponent },
            { path: 'goals', component: GoalsComponent },
            { path: 'winners', component: WinnersComponent },
            
        ]
    },


    { path: 'register-team', component: TeamComponent },
    { path: 'tournament', component: TournamentComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
