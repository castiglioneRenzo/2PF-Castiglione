import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../../core/services/courses/courses';
import { Course, CourseStatus } from '../../../../core/services/courses/model/Course';

@Component({
  selector: 'app-courses-form',
  standalone: false,
  templateUrl: './courses-form.html',
  styleUrl: './courses-form.css'
})
export class CoursesForm implements OnInit {
  courseForm!: FormGroup;
  isEditMode = false;
  courseId?: number;
  courseStatuses = Object.values(CourseStatus);

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.courseId = +params['id'];
        this.loadCourse(this.courseId);
      }
    });
  }

  initForm(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      beginDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: [CourseStatus.PLANNED, Validators.required]
    });
  }

  loadCourse(id: number): void {
    const course = this.coursesService.getCourseById(id);
    if (course) {
      this.courseForm.patchValue({
        title: course.title,
        description: course.description,
        beginDate: course.beginDate,
        endDate: course.endDate,
        status: course.status
      });
    }
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const courseData: Course = {
        id: this.courseId || 0,
        ...this.courseForm.value
      };

      if (this.isEditMode) {
        this.coursesService.updateCourse(courseData);
      } else {
        this.coursesService.addCourse(courseData);
      }

      this.router.navigate(['/dashboard/courses']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/courses']);
  }

  get title() {
    return this.courseForm.get('title');
  }

  get description() {
    return this.courseForm.get('description');
  }

  get beginDate() {
    return this.courseForm.get('beginDate');
  }

  get endDate() {
    return this.courseForm.get('endDate');
  }

  get status() {
    return this.courseForm.get('status');
  }
}
