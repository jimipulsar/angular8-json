import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/student';
import { ApiService } from '../services/api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
 
  id: number;
  data: Student;
  studentForm: FormGroup;

  @ViewChild('chipList', {static:true}) chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    public fb: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private ngZone: NgZone,
    public apiService: ApiService
  ) {
    
    this.studentForm = new FormGroup({
      name: new FormControl(),
      age: new FormControl(),
      address: new FormControl()
    })
    this.id = this.activatedRoute.snapshot.params["id"];
    this.apiService.getItem(this.id).subscribe(data => {
      console.log(data.id)
      this.studentForm = this.fb.group({
        name: [data.name, [Validators.required]],
        age: [data.age, [Validators.required]],
        address: [data.address, [Validators.required]],
      })      
    })  

  }
 
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    //get item details using id
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }
  updateStudentForm() {
    console.log(this.studentForm.value)
    var id = this.activatedRoute.snapshot.paramMap.get('id');

      this.apiService.updateItem(id, this.studentForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigate(['list']))
      });
  
  }

}