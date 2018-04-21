class Employee {
  _id: string;
  name: string;
  designation: string;
  basesalary: number;
  deductions: number;
  takehomesalary: number;
  status: string;

  constructor(
  ) {
    this.name = '';
    this.designation = '';
    this.basesalary = 0;
    this.deductions = 0;
    this.takehomesalary = 0;
    this.status = '';
  }
}

export default Employee;
