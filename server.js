const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'employee_db',
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
        ],
      },
    ])
    .then(function (choice) {
      console.log('before case');
      switch (choice.menuChoice) {
        case 'View All Departments':
          viewAllDepartments();
          break;

        case 'View all Roles':
          console.log('after case');
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
