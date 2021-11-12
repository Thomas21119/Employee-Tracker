const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');
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
