// class so all details can be taken

class Employee {
  constructor(first_name, last_name, job_title, report_to_manager) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.job_title = job_title;
    this.report_to_manager = report_to_manager;
  }
  getFirstName() {
    return this.first_name;
  }
  getLastName() {
    return this.last_name;
  }
  getJobTitle() {
    return this.job_title;
  }
  getManager() {
    return this.report_to_manager;
  }
}
module.exports = Employee;
