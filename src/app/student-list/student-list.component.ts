import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Student } from '../models/student';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DialogModalExampleComponent } from '../dialog-modal-example/dialog-modal-example.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentCreateComponent } from '../student-create/student-create.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  name: string;
  age: string;
  address: string;
  studentForm: FormGroup;
  studentsData: any;
   dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;
  displayedColumns: string[] = [ 'name', 'age', 'address', 'action'];
  constructor(
    public dialog: MatDialog,
    public apiService: ApiService, 
    private spinner: NgxSpinnerService,
    public router: Router,
    private fb: FormBuilder,
    public activatedRoute: ActivatedRoute
  ) {
    this.studentsData = [];
  }
   
  getAllStudents() {
  
    //Get saved list of students
    this.apiService.getList().subscribe(response => {
      this.spinner.show();
      this.studentsData = response;
      this.dataSource = new MatTableDataSource<Student>(this.studentsData);
      setTimeout(() => {
        this.spinner.hide();
        this.dataSource.paginator = this.paginator;
      }, 0);
      console.log(response);
  
    })

}
  ngOnInit() {
    this.studentForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      address: ['', [Validators.required]],
    })
    this.getAllStudents();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogModalExampleComponent, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getAllStudents();
    });
  }
  

  deleteStudent(id, index){
    this.spinner.show();
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.apiService.deleteItem(id).subscribe(data => {
        this.spinner.hide();
        this.getAllStudents();
      })  
  }
  
}