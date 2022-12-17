import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth-guard';
import { GuestGuard } from './guards/guest-guard';

import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetailsComponent } from './components/details/details.component';
import { CreateComponent } from './components/create/create.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/landing' },
  { path: 'landing', component: LandingComponent, canActivate: [GuestGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
  {
    path: 'projects/:id',
    component: DetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: ErrorPageComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
