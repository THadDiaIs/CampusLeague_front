import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RegistrationsComponent } from './features/registrations/registrations.component';
import { PlayersComponent } from './features/players/players.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'registrations', component: RegistrationsComponent},
    { path: 'players', component: PlayersComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
