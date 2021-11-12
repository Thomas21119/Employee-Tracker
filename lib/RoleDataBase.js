// class so all details can be taken

class RoleDataBase {
  constructor(name, salary, department) {
    this.name = name;
    this.salary = salary;
    this.department = department;
  }
  getName() {
    return this.name;
  }
  getSalary() {
    return this.salary;
  }
  getDepartment() {
    return this.department;
  }
}

module.exports = RoleDataBase;
