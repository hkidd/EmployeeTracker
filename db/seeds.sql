-- Need to provide all the various employee related items here to be inserted into the main table --
INSERT INTO departments (id, name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal"),
       (5, "Executive")

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, 'Full Stack Web Dev', 75000, 2),
       (2, 'Data Scientist', 80000, 2),
       (3, 'Software Salesman', 65000, 1),
       (4, 'Accountant', 82000, 3),
       (5, 'Lawyer', 100000, 4),
       (6, 'Senior Manager', 93000, 2),
       (7, 'CEO', '350000', 5) 

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Leah', 'Nelson', 7, NULL),
       ('Tom', 'Myspace', 2, 3),
       ('Christian', 'Henry', 6, 1),
       ('Neil', 'Denver', 6, 1),
       ('Harrison', 'Kidd', 5, NULL),
       ('Christyn', 'Garcia', 4, 1),
       ('Jacob', 'Guiro', 3, 3),
       ('Jessamyn', 'McTwigan', 2, 3)
