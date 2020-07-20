import { Component, OnInit } from '@angular/core';
import { CrudserviceService } from '../shared/crudservice.service';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../shared/Student';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import{ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students:Student[]; 
  constructor(public crudService: CrudserviceService,private toastr: ToastrService,
    public router: Router) { }

  ngOnInit(): void {
   
    this.crudService.getAll().subscribe(
      (response:any) => { console.log("Response =" , response);
     
          this.students = response
        },

      err => { console.error(err)},
      () => { console.log("ALL Data FETCHED!") } 
   )
  }
  editStudent(student:Student,id){
    debugger
    this.router.navigate(['/EditStudent',id])
   
   }
   deleteStudent(id : string){
     debugger 
     this.crudService.delete(id).subscribe(()=>{  
     console.log('Employee Deleted!');
     this.toastr.success('Deleted Successfully','Employee Delete');
   });
   location.reload();
   
  }

}
