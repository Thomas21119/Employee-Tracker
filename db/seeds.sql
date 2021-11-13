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
('Team Trainer', 4, 50000);

INSERT INTO all_employees (employee_first, employee_last, role_id, manager_id)
VALUES 
('first1', 'last1', 1, null),
('first2', 'last2', 2, null),
('first3', 'last3', 3, null),
('first4', 'last4', 4, null),
('first5', 'last5', 5, 1),
('first6', 'last6', 6, 2),
('first7', 'last7', 7, 3),
('first8', 'last8', 8, 4);

