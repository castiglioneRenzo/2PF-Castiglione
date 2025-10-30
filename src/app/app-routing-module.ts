import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Dashboard } from './featured/dashboard/dashboard';
import { Login } from './featured/auth/login/login';

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent },
  // { 
  //   path: 'alumnos', 
  //   loadChildren: () => import('./alumnos/alumnos.module').then(m => m.AlumnosModule)
  // },
  // { path: '**', redirectTo: '/dashboard' },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'dashboard',
    component: Dashboard,
    loadChildren: () =>
      import('./featured/dashboard/dashboard-module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
