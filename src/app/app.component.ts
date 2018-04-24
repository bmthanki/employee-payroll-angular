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
    // Private employeeservice will be injected into the component by Angular Dependency Injector
    private employeeService: EmployeeService
  ) { }

  // Declaring the new employee Object and initilizing it
  public newEmployee: Employee = new Employee();

  // Declaring the new employee Object and initilizing it
  public newDeductions: Deductions = new Deductions();

  // An Empty list for the visible employee list
  employeesList: Employee[];

  message = '';
  deductionmessage = '';

  hideme = [];

  ngOnInit(): void {

    // At component initialization the
    this.employeeService.getEmployees()
      .subscribe(employees => {
        // assign the employeelist property to the proper http response
        this.employeesList = employees;
        console.log(employees);
      });
  }

  // This method will get called on Create button event

  create() {
    console.log(this.newEmployee);
    this.employeeService.createEmployee(this.newEmployee)
      .subscribe((res) => {
        res.
        this.employeesList.push(res.data);
        this.newEmployee = new Employee();
        this.message = res.message;
      });
  }

  editEmployee(employee: Employee) {
    console.log(employee);
    if (this.employeesList.includes(employee)) {
      if (!this.editEmployees.includes(employee)) {
        this.editEmployees.push(employee);
      } else {
        this.editEmployees.splice(this.editEmployees.indexOf(employee), 1);
        this.employeeService.editEmployee(employee).subscribe((res) => {
          const index = this.employeesList.indexOf(employee);
          this.employeesList.splice(index, 1);
          this.employeesList.splice(index, 0, this.setEmployeeData(employee));
          this.message = 'Update Successful';
        }, err => {
          // this.editEmployee(employee);
          this.message = 'Update Unsuccessful. Please try again.';
        });
      }
    }
  }



  createDeductions(employee, newDeductions) {
    if (Number(employee.deductiontotal) + Number(newDeductions.amount) > Number(employee.taxamount)) {
      this.deductionmessage = 'Deduction cannot be greater than tax';
      return false;
    }
    employee.deductions.push(newDeductions);
    this.employeeService.createDeductions(employee)
      .subscribe((res) => {
        const index = this.employeesList.indexOf(employee);
        this.employeesList.splice(index, 1);
        this.employeesList.splice(index, 0, res.data);
        this.newDeductions = new Deductions();
        this.message = res.message;
      });
  }

  deleteDeduction(employee, deduction ) {
    console.log(employee);
    console.log(deduction);
    const emp = employee.deductions.splice(employee.deductions.indexOf(deduction), 1);
    this.employeeService.createDeductions(employee).subscribe(res => {
      const index = this.employeesList.indexOf(employee);
      this.employeesList.splice(index, 1);
      this.employeesList.splice(index, 0, res.data);
      this.message = res.message;
    });

  }

  submitEmployee(event, employee: Employee) {
    if (event.keyCode == 13) {
      this.editEmployee(employee);
    }
  }

  deleteEmployee(employee: Employee) {
    this.employeeService.deleteEmployee(employee._id).subscribe(res => {
      this.employeesList.splice(this.employeesList.indexOf(employee), 1);
      this.message = 'Employee Deleted successfully';
    });
  }

  setEmployeeData(employee) {
    // temp data
    let taxamount = employee.basesalary * Number((0.1));
    taxamount = Number(taxamount.toFixed(2));
    let deductiontotal = 0;
    for (let i = 0; i < employee.deductions.length; i++) {
      deductiontotal = Number(deductiontotal) + Number(employee.deductions[i].amount);
    }
    const takehomesalary = (+employee.basesalary) - (+taxamount - +deductiontotal);
    employee.taxamount = taxamount,
    employee.deductiontotal = deductiontotal,
    employee.takehomesalary = takehomesalary;
    return employee;
  }

}


