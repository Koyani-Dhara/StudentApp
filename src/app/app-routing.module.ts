import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list/student-list.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

const routes: Routes = [
  { path: '', redirectTo: 'StudentList', pathMatch: 'full'},
 
  { path: 'StudentList', component:StudentListComponent },
  { path: 'AddStudent', component: AddStudentComponent},
  { path: 'EditStudent/:Id', component: EditStudentComponent } ,
 
  
];

@NgModule({
  declarations: [],
  imports: [CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
