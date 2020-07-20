import { Component, OnInit } from '@angular/core';
import { CrudserviceService } from '../shared/crudservice.service';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../shared/Student';
import{ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  updateForm: FormGroup;
  student: Student;
  constructor(private fb: FormBuilder,
    public router: Router,
    private crudService: CrudserviceService,
    private toastr: ToastrService,
    private _route:ActivatedRoute) {
      this.updateForm = this.fb.group({
        id:'',
        name: ['',Validators.required],
        email: ['',[Validators.required,Validators.email]],
        rollNo: ['',Validators.required],
        age: ['',Validators.required],
        date: ['',Validators.required],
        isMale: ['',Validators.required]              
      })
     }
  ngOnInit(): void {
      this._route.paramMap.subscribe(parameterMap=>{
        const id= parameterMap.get('Id')
        this.getStudent(id);   
      });
  }
  onSubmit(){
    this.student=this.updateForm.value;
    console.log(this.student);
    this.crudService.update(this.student,this.student.id).subscribe(student=>{
      this.student = student; 
      console.log('Student Updated!');
      this.toastr.success('Updated Successfully','Student Update');
      this.router.navigateByUrl('/StudentList');
   });
   this.updateForm.reset({
    name:'',
    email:'',
    rollNo: '',
    age: '',
    date: '',
    isMale: ''
  });
  }
  public getStudent(id)
  { 
    this.crudService.getById(id).subscribe(student=>{
         this.student=student; 
         this.updateForm.patchValue(this.student[0]);
    }); 
  }
  changeGender(e) {
    console.log(e.target.value);
  }
}
