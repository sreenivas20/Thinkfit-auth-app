import { Routes } from '@angular/router';
import { Signin } from './components/signin/signin.component';
import { Signup } from './components/signup/signup.component';
import { Home } from './components/home/home.component';
// import { ProfileComponent } from './components/profile/profile';
// import { UserDetailsComponent } from './components/user-details/user-details';

export const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: Signin },
  { path: 'signup', component: Signup },
  { path: 'home', component: Home },
  //  { path: 'profile', component: ProfileComponent },
  // { path: 'user-details', component: UserDetailsComponent },
  // { path: 'user-details/:id', component: UserDetailsComponent },
  { path: '**', redirectTo: '/signin' }
];