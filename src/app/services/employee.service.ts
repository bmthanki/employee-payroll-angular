import Employee from '../models/empmst.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RxJS operator for mapping the observable

import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {

  api_url = 'http://datis-emp.herokuapp.com';
  EmployeeUrl = `${this.api_url}/api/employees`;
  DeductionUrl = `${this.api_url}/api/employees/deduction`;

  constructor(
    private http: HttpClient
  ) { }


  // Create Employee, takes a Employee Object
  createEmployee(employee: Employee): Observable<any> {
    // returns the observable of http post request
    return this.http.post(`${this.EmployeeUrl}`, employee);
  }

  // Read Employee, takes no arguments
  getEmployees(): Observable<Employee[]> {
    return this.http.get(this.EmployeeUrl)
      .map(res  => {
        // Maps the response object sent from the server

        return res['data'].docs as Employee[];
      });
  }
  // Update Employee, takes a Employee Object as parameter
  editEmployee(employee: Employee) {
    // returns the observable of http put request
    return this.http.put(`${this.EmployeeUrl}`, employee);
  }

  deleteEmployee(id: string): any {
    // Delete the object by the id
    const deleteUrl = `${this.EmployeeUrl}/${id}`;
    return this.http.delete(deleteUrl)
      .map(res  => {
        return res;
      });
  }

  // Create Deduction, takes a Employee Object
  createDeductions(employee: Employee): Observable<any> {
    // returns the observable of http post request
    return this.http.post(`${this.DeductionUrl}`, employee);
  }

  // Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
