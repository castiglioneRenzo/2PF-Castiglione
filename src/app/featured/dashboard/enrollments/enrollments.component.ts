import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Enrollment } from '../../../core/models/enrollment.model';
import { Student } from '../../../core/models/student.model';
import { Course } from '../../../core/models/course.model';
import * as EnrollmentsActions from '../../../store/enrollments/enrollments.actions';
import * as StudentsActions from '../../../store/students/students.actions';
import * as CoursesActions from '../../../store/courses/courses.actions';
import { selectAllEnrollments } from '../../../store/enrollments/enrollments.selectors';
import { selectAllStudents } from '../../../store/students/students.selectors';
import { selectAllCourses } from '../../../store/courses/courses.selectors';
import { selectIsAdmin } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-enrollments',
  standalone: false,
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css'],
})
export class EnrollmentsComponent implements OnInit {
  enrollments$: Observable<Enrollment[]>;
  students$: Observable<Student[]>;
  courses$: Observable<Course[]>;
  isAdmin$: Observable<boolean>;
  displayedColumns: string[] = [
    'id',
    'student',
    'course',
    'enrollmentDate',
    'status',
    'grade',
    'actions',
  ];

  constructor(private store: Store) {
    this.enrollments$ = this.store.select(selectAllEnrollments);
    this.students$ = this.store.select(selectAllStudents);
    this.courses$ = this.store.select(selectAllCourses);
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  ngOnInit(): void {
    this.store.dispatch(EnrollmentsActions.loadEnrollments());
    this.store.dispatch(StudentsActions.loadStudents());
    this.store.dispatch(CoursesActions.loadCourses());
  }

  getStudentName(studentId: number, students: Student[]): string {
    const student = students.find((s) => s.id === studentId);
    return student ? `${student.firstName} ${student.lastName}` : 'N/A';
  }

  getCourseName(courseId: number, courses: Course[]): string {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.name : 'N/A';
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta inscripción?')) {
      this.store.dispatch(EnrollmentsActions.deleteEnrollment({ id }));
    }
  }
}
