import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { LoginComponent } from './login/login.component';
import { SearchPeopleComponent } from './SearchPeople/SearchPeople.component';
import { EventViewJoinComponent } from './EventViewJoin/EventViewJoin.component';
import { EventListComponent } from './event-list/event-list.component';
import { LocationFilterComponent } from './location-filter/location-filter.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { LoginService } from './login.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    UserInformationComponent, 
    ProfileComponent, 
    UpdateProfileComponent, 
    LoginComponent, 
    SearchPeopleComponent, 
    EventViewJoinComponent, 
    EventListComponent, 
    LocationFilterComponent,
    EventListComponent,
    CreateEventComponent,
    EditEventComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'user-information', component: UserInformationComponent},
      { path: 'profile', component: ProfileComponent}, 
      { path: 'update', component: UpdateProfileComponent},
      { path: 'login', component: LoginComponent}, 
      { path: 'searchPeople', component: SearchPeopleComponent},
      { path: 'eventview/:eventId', component: EventViewJoinComponent}, 
      { path: 'location-filter', component: LocationFilterComponent},
      { path: 'event-list', component: EventListComponent},
      { path: 'create-event', component: CreateEventComponent},
      { path: 'edit-event/:eventId', component:EditEventComponent},
      { path: 'profile/:userId', component:ProfileComponent}, 
      { path: 'SearchPeople', component:SearchPeopleComponent}, 
    ])
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
