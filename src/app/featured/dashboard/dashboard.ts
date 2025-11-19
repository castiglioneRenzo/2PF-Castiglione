import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  listItems = [
    {
      name: 'Inicio',
      description: 'Overview of the platform and recent activities.',
      url: '/dashboard',
      icon: 'home'
    },
    {
      name: 'Cursos',
      description: 'Manage and explore the courses offered in the platform.',
      url: '/dashboard/courses',
      icon: 'school'
    },
    {
      name: 'Estudiantes',
      description: 'View and manage student information and progress.',
      url: '/dashboard/students',
      icon: 'people'
    },
    {
      name: 'Login',
      description: 'Access the login page to authenticate users.',
      url: '/login',
      icon: 'login'
    }
    
  ]
}
