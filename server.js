const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const e = require('express');
const { rightPadder } = require('easy-table');
const { query } = require('express');
const PORT = process.env.PORT || 3001;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'employee_db',
  port: '',
});

db.connect(function (err) {
  if (err) throw err;
  console.log('mysql succesfully connected');
  menu();
});

function menu() {
  let menuChoice = inquirer
    .prompt([
      {
        type: 'list',
        message: 'what would you like to do?',
        name: 'menuChoice',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Update an Employee',
          'Add an Employee',
          'Add a Role',
          'Add a Department',
          'quit menu',
        ],
      },
    ])
    .then(function (choice) {
      switch (choice.menuChoice) {
        case 'View All Departments':
          viewAllDepartments();
          break;

        case 'View All Roles':
          viewAllRoles();
          break;

        case 'View All Employees':
          viewAllEmployees();
          break;

        case 'Update an Employee':
          updateEmployee();
          break;

        case 'Add an Employee':
          addEmployee();
          break;

        case 'Add a Role':
          addRole();
          break;

        case 'Add a Department':
          addDepartment();
          break;
        default:
          return;
      }
    });
}

function viewAllDepartments() {
  let sql = `SELECT all_departments.id AS id, all_departments.department_name AS all_departments FROM all_departments`;
  db.query(sql, function (err, res) {
    if (err) {
      throw err;
    } else {
      console.table(res);
      menu();
    }
  });
}

// perfect
function viewAllRoles() {
  let sql = `SELECT all_roles.id, all_roles.job_title, all_departments.department_name AS all_departments
                  FROM all_roles
                  INNER JOIN all_departments ON all_roles.department_id = all_departments.id`;
  db.query(sql, function (err, res) {
    if (err) {
      throw err;
    } else {
      console.table(res);
      menu();
    }
  });
}

// perfect
function viewAllEmployees() {
  let sql = `SELECT all_employees.id, 
                  all_employees.employee_first, 
                  all_employees.employee_last, 
                  all_roles.job_title, 
                  all_departments.department_name AS 'all_departments', 
                  all_roles.salary
                  FROM all_employees, all_roles, all_departments 
                  WHERE all_departments.id = all_roles.department_id 
                  AND all_roles.id = all_employees.role_id
                  ORDER BY all_employees.id ASC`;
  db.query(sql, function (err, res) {
    if (err) {
      throw err;
    } else {
      console.table(res);
      menu();
    }
  });
}

// as expected
function updateEmployee() {
  let sql = `SELECT all_employees.id, all_employees.employee_first, all_employees.employee_last, all_roles.id AS "role_id"
  FROM all_employees, all_roles, all_departments WHERE all_departments.id = all_roles.department_id AND all_roles.id = all_employees.role_id`;
  db.query(sql, (err, response) => {
    if (err) {
      throw err;
    } else {
      let employeeNamesArray = [];
      response.forEach((employee) => {
        employeeNamesArray.push(
          `${employee.employee_first} ${employee.employee_last}`
        );
      });
      let sql = `SELECT all_roles.id, all_roles.job_title FROM all_roles`;
      db.query(sql, (err, res) => {
        if (err) {
          throw err;
        } else {
          let rolesArray = [];
          res.forEach((role) => {
            rolesArray.push(role.job_title);
          });
          inquirer
            .prompt([
              {
                name: 'chosenEmployee',
                type: 'list',
                message: 'which employee is being updated',
                choices: employeeNamesArray,
              },
              {
                name: 'chosenRole',
                type: 'list',
                message: 'what is this employees New role',
                choices: rolesArray,
              },
            ])
            .then((answer) => {
              let newRoleId;
              let employeeId;

              res.forEach((role) => {
                if (answer.chosenRole === role.job_title) {
                  newRoleId = role.id;
                }
              });

              response.forEach((employee) => {
                if (
                  answer.chosenEmployee ===
                  `${employee.employee_first} ${employee.employee_last}`
                ) {
                  employeeId = employee.id;
                }
              });
              console.log(newRoleId);
              let sql = `UPDATE all_employees SET all_employees.role_id = ? WHERE all_employees.id = ?`;
              db.query(sql, [newRoleId, employeeId], (err) => {
                if (err) {
                  throw err;
                } else {
                  console.log('employee role updated');
                  menu();
                }
              });
            });
        }
      });
    }
  });
}

// as expected besides error handling and null is available for name input
function addEmployee() {
  let employeeAdd = inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeFirst',
        message: "What is the employee's first name",
      },
      {
        type: 'input',
        name: 'employeeLast',
        message: "What is the employee's last name",
      },
    ])
    .then((answers) => {
      let newEmployeeData = [answers.employeeFirst, answers.employeeLast];
      let sql = `SELECT id, job_title FROM all_roles`;
      db.query(sql, (err, res) => {
        if (err) {
          throw err;
        } else {
          let rolesIdArray = [];
          let rolesNameArray = [];
          res.forEach((role) => {
            rolesNameArray.push(role.job_title + ' ID:' + role.id);
          });
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: rolesNameArray,
              },
            ])
            .then((roleChoice) => {
              let role = roleChoice.role.split('ID:')[1];
              newEmployeeData.push(role);
              let sql = 'SELECT * FROM all_employees';
              db.query(sql, (err, res) => {
                if (err) {
                  throw err;
                } else {
                  managers = [];
                  res.forEach((employee) => {
                    if (err) {
                      throw err;
                    } else {
                      if (employee.manager_id === null) {
                        managers.push(
                          employee.employee_first +
                            ' ' +
                            employee.employee_last +
                            ' ID:' +
                            employee.id
                        );
                      }
                    }
                  });
                  inquirer
                    .prompt([
                      {
                        type: 'list',
                        name: 'manager',
                        message: 'who is this employees manager',
                        choices: managers,
                      },
                    ])
                    .then((managerChoice) => {
                      let managerId = managerChoice.manager.split('ID:')[1];
                      newEmployeeData.push(managerId);
                      let sql = `INSERT INTO all_employees (employee_first, employee_last, role_id, manager_id)
                      VALUES (?, ?, ?, ?)`;
                      db.query(sql, newEmployeeData, (err) => {
                        if (err) {
                          throw err;
                        } else {
                          console.log('Employee has been added!');
                          viewAllEmployees;
                        }
                      });
                    });
                }
              });
            });
        }
      });
    });
}

// works as expected need error handling
function addRole() {
  let sql = 'SELECT * FROM all_departments;';
  db.query(sql, (err, res) => {
    if (err) {
      throw err;
    } else {
      let departmentNamesArray = [];
      let departmentIdArray = [];
      res.forEach((department) => {
        departmentNamesArray.push(
          department.department_name + '-' + department.id
        );
        departmentIdArray.push(department.id);
      });
      inquirer
        .prompt([
          {
            name: 'departmentChoice',
            type: 'list',
            message: 'which department does the new role belong in',
            choices: departmentNamesArray,
          },
        ])
        .then((answer) => {
          let departmentIdentification = answer.departmentChoice.split('-')[1];
          inquirer
            .prompt([
              {
                name: 'roleName',
                type: 'input',
                message: 'What is the new roles name',
              },
              {
                name: 'roleSalary',
                type: 'input',
                message: 'What is the salary of this new role',
              },
            ])
            .then((answer) => {
              let createdRole = answer.roleName;
              let departmentId = departmentIdentification;
              let sql =
                'INSERT INTO all_roles (job_title, salary, department_id) VALUES (?,?,?);';
              let final = [createdRole, answer.roleSalary, departmentId];
              db.query(sql, final, (err) => {
                if (err) {
                  throw err;
                } else {
                  console.log('role succesfully created');
                  viewAllRoles();
                }
              });
            });
        });
    }
  });
}

// works as expected need error handling
function addDepartment() {
  let departmentAdd = inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'what will this role be called',
      },
    ])
    .then((answer) => {
      let sql = 'INSERT INTO all_departments (department_name) VALUES (?);';
      db.query(sql, answer.departmentName, (err, res) => {
        if (err) {
          throw err;
        } else {
          console.log(`${answer.departmentName} has been succesfully added`);
          viewAllDepartments();
        }
      });
    });
}
