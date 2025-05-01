import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PlayersComponent } from './features/registration/players/players.component';
import { TeamComponent } from './features/registration/team/team.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'register-team', component: TeamComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
