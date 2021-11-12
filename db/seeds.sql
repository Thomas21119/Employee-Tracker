INSERT INTO all_departments (department_name)
VALUES ('Sales'),
('Opperations'),
('Finance'),
('Human Resources');

INSERT INTO all_roles (job_title, department_id, salary)
VALUES ('Lead Salesman', 1, 150000),
('Lead Opperations', 2, 120000),
('Lead Finance', 3, 170000),
('Human Resources Manager', 4, 100000),
('Salesman', 1, 75000),
('Opperations', 2, 60000),
('Accountant', 3, 85000),
('Team Trainer', 4, 50000)

INSERT INTO all_employees (employee_first, employee_last, role_id, manager_id)
VALUES ('first', 'last', 1, null),

