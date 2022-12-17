import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { appInterceptorProvider } from './app.interceptor';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DetailsComponent } from './components/details/details.component';
import { CreateComponent } from './components/create/create.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ProjectsComponent,
    NavComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    LoadingComponent,
    DetailsComponent,
    CreateComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
