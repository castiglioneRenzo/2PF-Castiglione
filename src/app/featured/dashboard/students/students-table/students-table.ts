import { Component, ViewChild } from '@angular/core';
import { Student, studentColumns } from '../../../../core/services/students/model/Student';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StudentsService } from '../../../../core/services/students/students';

@Component({
  selector: 'app-students-table',
  standalone: false,
  templateUrl: './students-table.html',
  styleUrl: './students-table.css'
})
export class StudentsTable {
  displayedColumns: string[] = studentColumns;
  dataSource = new MatTableDataSource<Student>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private studentsService: StudentsService) {
    this.dataSource = new MatTableDataSource<Student>([]);
    this.studentsService.students$.subscribe(students => {
      this.dataSource.data = students;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void {
    this.studentsService.getStudents();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteStudent(id: number): void {
    this.studentsService.deleteStudent(id);
  }
}
