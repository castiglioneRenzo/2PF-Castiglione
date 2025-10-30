import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from '../interfaces/alumno.interface';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private alumnos: Alumno[] = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan.perez@email.com', edad: 20 },
    { id: 2, nombre: 'María', apellido: 'García', email: 'maria.garcia@email.com', edad: 22 },
    { id: 3, nombre: 'Carlos', apellido: 'López', email: 'carlos.lopez@email.com', edad: 19 },
    { id: 4, nombre: 'Ana', apellido: 'Martínez', email: 'ana.martinez@email.com', edad: 21 },
    { id: 5, nombre: 'Pedro', apellido: 'Rodríguez', email: 'pedro.rodriguez@email.com', edad: 23 }
  ];

  private alumnosSubject = new BehaviorSubject<Alumno[]>(this.alumnos);
  public alumnos$ = this.alumnosSubject.asObservable();

  constructor() { }

  getAlumnos(): Observable<Alumno[]> {
    return this.alumnos$;
  }

  addAlumno(alumno: Omit<Alumno, 'id'>): void {
    const newId = this.alumnos.length > 0 ? Math.max(...this.alumnos.map(a => a.id)) + 1 : 1;
    const nuevoAlumno: Alumno = { id: newId, ...alumno };
    
    this.alumnos.push(nuevoAlumno);
    this.alumnosSubject.next([...this.alumnos]); // Emitir la lista actualizada
    
    console.log('Alumno agregado al servicio:', nuevoAlumno);
    console.log('Lista actual:', this.alumnos);
  }

  getAllAlumnos(): Alumno[] {
    return [...this.alumnos];
  }
}