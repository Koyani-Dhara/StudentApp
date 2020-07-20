import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse ,HttpHeaders} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Observable} from "rxjs";

import { Student } from './Student';
@Injectable({
  providedIn: 'root'
})
export class CrudserviceService {

  private apiServer = "http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  create(student: Student): Observable<Student> {
    debugger
    console.log(student);
    return this.httpClient.post<Student>(this.apiServer, JSON.stringify(student), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
   
  }  
  getById(id): Observable<Student> {
    debugger
    return this.httpClient.get<Student>(this.apiServer + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Student[]> {
    debugger
    return this.httpClient.get<Student[]>(this.apiServer)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(student: Student,id: string): Observable<Student> {
   
    return this.httpClient.put<Student>(this.apiServer + id, JSON.stringify(student), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id){
    return this.httpClient.delete<Student>(this.apiServer +  id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
     
       errorMessage = error.error.message;
     } else {
     
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}
