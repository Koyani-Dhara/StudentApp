import { Component, OnInit } from '@angular/core';
import { CrudserviceService } from '../shared/crudservice.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../shared/Student';
import{ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup;
  student: Student;
  constructor(private fb: FormBuilder,
    public router: Router,
    private crudService: CrudserviceService,
    private toastr: ToastrService,
    private _route:ActivatedRoute) {
      this.studentForm = this.fb.group({  
        name: ['',Validators.required],
        email: ['',[Validators.required,Validators.email]],
        rollNo: ['',Validators.required],
        age: ['',Validators.required],
        date: ['',Validators.required],
        isMale: ['',Validators.required]
      })
  }
  ngOnInit(): void {
  }
  onSubmit(){
    this.student=this.studentForm.value;
    this.crudService.create(this.student).subscribe(student=>{
       this.student = student; 
       console.log('Student Added');
       this.toastr.success('Submitted Successfully','Student Added');
       this.router.navigateByUrl('/StudentList');
    });
    this.studentForm.reset({
     name:'',
     email:'',
     rollNo:'',
     age:'',
     date:'',
     isMale:''
   });   
 }
 changeGender(e) {
  console.log(e.target.value);
}
}
