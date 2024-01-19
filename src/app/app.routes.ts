import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './pages/form/form.component';
import { SearchComponent } from './pages/search/search.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'form',
        component: FormComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { 
    path: '**',
    redirectTo: '/login'
  }
];
