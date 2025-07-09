import { Routes } from '@angular/router';
import { Signin } from './components/signin/signin.component';
import { Signup } from './components/signup/signup.component';
import { Home } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile';
import { UserDetailsComponent } from './components/user-details/user-details';
import { OrganizationDetailsComponent } from './components/orgainzation-details/orgainzation-details.component'; // Import the new component
import { OrganizationProfileComponent } from './components/organization-profile/organization-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: Signin },
  { path: 'signup', component: Signup },
  { path: 'home', component: Home },
  { path: 'profile', component: ProfileComponent },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'user-details/:id', component: UserDetailsComponent },
  // Add the new route for the organization details screen
  { path: 'organization-details', component: OrganizationDetailsComponent },
   { path: 'organization-profile', component: OrganizationProfileComponent },
  { path: '**', redirectTo: '/signin' }
];
