import { Component, Inject, Optional, OnInit, ViewChild } from '@angular/core'; 
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, } from '@angular/material';
import { Student } from '../models/student';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-dialog-modal-example',
  templateUrl: './dialog-modal-example.component.html',
  styleUrls: ['./dialog-modal-example.component.css']
})
export class DialogModalExampleComponent implements OnInit {
  studentForm: FormGroup;
  studentsData: any;
  dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;
  @ViewChild('chipList', {static:false}) chipList;
  @ViewChild('resetStudentForm', {static:false}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

 
  constructor(
    private fb: FormBuilder,
    public apiService: ApiService,
    public router: Router,
    private spinner : NgxSpinnerService,
    public dialog: MatDialog,
    
    public dialogRef: MatDialogRef<DialogModalExampleComponent>,
    @Inject(MAT_DIALOG_DATA)  public data: any
    ) {
      this.getAllStudents();
      
    }


    ngOnInit() {
      this.getAllStudents();
      this.submitBookForm();
      
    }
    actionFunction() {
      alert("You have logged out.");
      this.closeModal();
    }
  
    // If the user clicks the cancel button a.k.a. the go back button, then\
    // just close the modal
    closeModal() {
      this.dialogRef.close();
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
    submitBookForm() {
      this.studentForm = this.fb.group({
        id: [''],
        name: ['', [Validators.required]],
        age: ['', [Validators.required]],
        address: ['', [Validators.required]],
      })
 
    }
    submitForm() {
      
      if (this.studentForm.valid) {
        this.apiService.createItem(this.studentForm.value).subscribe(res => {
          this.spinner.show();
          this.dialogRef.close(res => {
            this.getAllStudents();
          })  
          this.spinner.hide();
        });
        
      }
      
  
    }
  
  }