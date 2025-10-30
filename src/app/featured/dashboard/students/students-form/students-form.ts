import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../../../core/services/students/students';
import { Student } from '../../../../core/services/students/model/Student';

@Component({
  selector: 'app-students-form',
  standalone: false,
  templateUrl: './students-form.html',
  styleUrl: './students-form.css'
})
export class StudentsForm implements OnInit {
  studentForm!: FormGroup;
  isEditMode = false;
  studentId?: number;

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.studentId = +params['id'];
        this.loadStudent(this.studentId);
      }
    });
  }

  initForm(): void {
    this.studentForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(16), Validators.max(100)]],
      fechaIngreso: ['', Validators.required],
      curso: ['']
    });
  }

  loadStudent(id: number): void {
    const student = this.studentsService.getStudentById(id);
    if (student) {
      this.studentForm.patchValue({
        nombre: student.nombre,
        apellido: student.apellido,
        email: student.email,
        edad: student.edad,
        fechaIngreso: student.fechaIngreso,
        curso: student.curso || ''
      });
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const studentData: Student = {
        id: this.studentId || 0,
        ...this.studentForm.value
      };

      if (this.isEditMode) {
        this.studentsService.updateStudent(studentData);
      } else {
        this.studentsService.addStudent(studentData);
      }

      this.router.navigate(['/dashboard/students']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/students']);
  }

  get nombre() {
    return this.studentForm.get('nombre');
  }

  get apellido() {
    return this.studentForm.get('apellido');
  }

  get email() {
    return this.studentForm.get('email');
  }

  get edad() {
    return this.studentForm.get('edad');
  }

  get fechaIngreso() {
    return this.studentForm.get('fechaIngreso');
  }
}
