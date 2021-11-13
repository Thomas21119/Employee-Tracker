DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE IF NOT EXISTS all_departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS all_roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  job_title VARCHAR(100) NOT NULL,
  department_id INT NOT NULL,
  salary DECIMAL NOT NULL,
  FOREIGN KEY (department_id) REFERENCES all_departments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS all_employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  employee_first VARCHAR(100) NOT NULL,
  employee_last VARCHAR(100) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES all_roles(id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES all_employees(id) ON DELETE CASCADE
);

