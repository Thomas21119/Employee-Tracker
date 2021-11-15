const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const e = require('express');
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
  db.query('SELECT * FROM all_departments;', function (err, res) {
    if (err) {
      throw err;
    } else {
      console.table(res);
      menu();
    }
  });
}

function viewAllRoles() {
  db.query('SELECT * FROM all_roles;', function (err, res) {
    if (err) {
      throw err;
    } else {
      console.table(res);
      menu();
    }
  });
}

function viewAllEmployees() {
  db.query('SELECT * FROM all_employees;', function (err, res) {
    if (err) {
      throw err;
    } else {
      console.table(res);
      menu();
    }
  });
}

function updateEmployee() {
  let employeeUpdate = inquirer.prompt([
    {
      type: 'input',
      name: 'newRole',
      message: 'What is this employees new role',
    },
  ]);
}

function addEmployee() {
  let employeeAdd = inquirer.prompt([
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
    {
      type: 'input',
      name: 'employeeRole',
      message: "What is the employee's role ID",
    },
    {
      type: 'input',
      name: 'employeeManager',
      message: "What is the employee's Manager's ID",
    },
  ]);
}

function addRole() {
  let sql = 'SELECT * FROM all_departments';
  db.query(sql, (err, res) => {
    if (err) {
      throw err;
    } else {
      let departmentNamesArray = [];
      res.forEach((department) => {
        departmentNamesArray.push(department.department_name);
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
          let departmentId;
          res.forEach((department) => {
            if (answer.departmentName === department.department_name) {
              departmentId = department.id;
            }
            console.log('departmentid' + departmentId);
          });
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

              let sql =
                'INSERT INTO all_roles (job_title, salary, department_id) VALUES (?,?,?)';
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

// works as expected
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
      let sql = 'INSERT INTO all_departments (department_name) VALUES (?)';
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
