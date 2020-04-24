import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Student } from '../models/student';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
 studentForm: FormGroup;
  data: Student;
  @ViewChild('chipList', {static:false}) chipList;
  @ViewChild('resetStudentForm', {static:false}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit() {  this.submitBookForm();
  }
  
  constructor(
    public apiService: ApiService,
    public router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone
  ) {
    // this.studentForm = new FormGroup({
    //   name: new FormControl(),
    //   age: new FormControl(),
    //   address: new FormControl()
    // })
    // this.data = new Student();
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


        this.router.navigateByUrl('list');
      });
    }

 
  }
 
}