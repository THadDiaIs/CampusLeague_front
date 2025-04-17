import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
<<<<<<< HEAD
import { RegistrationsComponent } from './features/registrations/registrations.component';
=======
import { PlayersComponent } from './features/players/players.component';
>>>>>>> 2286808bdb17aeae41b4b94c15665e76e1d2bfae

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
<<<<<<< HEAD
    { path: 'registrations', component: RegistrationsComponent},
=======
    { path: 'players', component: PlayersComponent },
>>>>>>> 2286808bdb17aeae41b4b94c15665e76e1d2bfae
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
