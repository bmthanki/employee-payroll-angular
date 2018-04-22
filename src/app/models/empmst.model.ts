class Employee {
  _id: string;
  name: string;
  designation: string;
  basesalary: number;
  deductions: Deductions;
  takehomesalary: number;

  constructor(
  ) {
    this.name = '';
    this.designation = '';
    this.basesalary = 0;
    this.deductions = new Deductions();
    this.takehomesalary = 0;
  }
}

export class Deductions {
  deduction: string;
  amount: number;

  constructor(
  ) {
    this.deduction = '';
    this.amount = 0;
  }
}
export default Employee;
