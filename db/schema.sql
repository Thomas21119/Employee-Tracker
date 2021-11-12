DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE all_departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);

CREATE TABLE all_roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(100) NOT NULL,
    department_id INT NOT NULL,
    salary INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES all_departments(id)
);

CREATE TABLE all_employees (
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_first VARCHAR(100) NOT NULL,
    employee_last VARCHAR(100) NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    salary INT NOT NULL,
    report_to_manager VARCHAR(100) NOT NULL,
    FOREIGN KEY (department_name) REFERENCES all_departments(department_name),
    FOREIGN KEY (job_title) REFERENCES all_roles(job_title),
    FOREIGN KEY (report_to_manager) REFERENCES all_employees(employee_id),
);