import { Response } from '@angular/http';
import { EmployeeService } from './services/employee.service';
import Employee, {Deductions} from './models/empmst.model';
import { Component, OnInit } from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  editEmployees: Employee[] = [];
  constructor(
    // Private todoservice will be injected into the component by Angular Dependency Injector
    private employeeService: EmployeeService
  ) { }

  // Declaring the new todo Object and initilizing it
  public newEmployee: Employee = new Employee();

  // Declaring the new todo Object and initilizing it
  public newDeductions: Deductions = new Deductions();

  // An Empty list for the visible todo list
  employeesList: Employee[];


  showMe = false;

  ngOnInit(): void {

    // At component initialization the
    this.employeeService.getEmployees()
      .subscribe(employees => {
        // assign the todolist property to the proper http response
        this.employeesList = employees;
        console.log(employees);
      });
  }

  // This method will get called on Create button event

  create() {
    this.employeeService.createEmployee(this.newEmployee)
      .subscribe((res) => {
        this.employeesList.push(res.data);
        this.newEmployee = new Employee();
      });
  }

  editEmployee(employee: Employee) {
    console.log(employee);
    if (this.employeesList.includes(employee)) {
      if (!this.editEmployees.includes(employee)) {
        this.editEmployees.push(employee);
      } else {
        this.editEmployees.splice(this.editEmployees.indexOf(employee), 1);
        this.employeeService.editEmployee(employee).subscribe(res => {
          console.log('Update Succesful');
        }, err => {
          this.editEmployee(employee);
          console.error('Update Unsuccesful');
        });
      }
    }
  }


  editDeductions() {

    if (this.showMe == true) {
      this.showMe = false;
    } else {
      this.showMe = true;
    }

  }

  createDeductions(employee, newDeductions) {
    employee.deductions.push(newDeductions);
    this.employeeService.createDeductions(employee)
      .subscribe((res) => {
        this.employeesList.push(res.data);
        this.newEmployee = new Employee();
      });
  }

  deleteDeductions(employee) {

    console.log(employee);

  }

  submitEmployee(event, employee: Employee) {
    if (event.keyCode == 13) {
      this.editEmployee(employee);
    }
  }

  deleteEmployee(employee: Employee) {
    this.employeeService.deleteEmployee(employee._id).subscribe(res => {
      this.employeesList.splice(this.employeesList.indexOf(employee), 1);
    });
  }
}
