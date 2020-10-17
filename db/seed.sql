INSERT INTO department (name)
VALUES
("Sales"),
("Engineering"),
("Legal"),
("Finance");

INSERT INTO role (title, salary, department_id)
VALUES 
('Floor Sales', 50000, 1), 
('Sales Manager', 80000, 1),
('Engineer', 100000, 2),
('Engineering Manager', 120000, 2),
('Lawyer', 200000, 3),
('Accountant', 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Bob', 'Bobberson', 1, 2),
('Jimmy', 'John', 2, null),
('Fred', 'Flintstone', 3, 4),
('Shaggy', 'Rogers', 4, null);
