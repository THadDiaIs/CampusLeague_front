import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TeamComponent } from './features/registration/team/team.component';
import { TournamentComponent } from './features/registration/tournament/tournament.component';
import { PlayersComponent } from './features/admin/players/players.component';
import { TeamsInfoComponent } from './features/admin/teams-info/teams-info.component';
import { TournamentInfoComponent } from './features/admin/tournament-info/tournament-info.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard', component: DashboardComponent,
        children: [
            { path: 'tournament', component: TournamentComponent },
            { path: 'players', component: PlayersComponent },
            { path: 'teams-info', component: TeamsInfoComponent },
            { path: 'tournament-info', component: TournamentInfoComponent }

        ]
    },


    { path: 'register-team', component: TeamComponent },
    { path: 'tournament', component: TournamentComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
