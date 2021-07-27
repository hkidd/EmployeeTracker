-- Need a database to hold all employee info
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

-- Main employee db table
CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    CONSTRAINT fk_role
    FOREIGN KEY (role_id)
    REFERENCES roles(id),
    manager_id INT,
    REFERENCES employees
);

-- Create a table to just hold the departments. If there is no employee in a certain department in the employee db, would need to be able to still access all department values
CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Create a table to just hold the roles. As new roles are created, they can be inserted into this table with the relevant info
CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);

-- Join function for all employees
SELECT e.id employee_id, 
CONCAT(e.first_name, ' ', e.last_name) AS employee_name, 
roles.title, departments.name AS department, 
roles.salary, 
CONCAT(m.first_name, ' ', m.last_name) AS manager_name 
FROM employees e 
LEFT JOIN employees m ON e.manager_id = m.id
INNER JOIN roles ON (roles.id = e.role_id)
INNER JOIN departments ON (departments.id = roles.department_id)
ORDER BY e.id;

-- Join function for all roles
SELECT r.id, r.title, d.name AS department, r.salary
FROM roles r
INNER JOIN departments d 
ON r.department_id = d.id;

-- INSERT newEmployee
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (${newEmployee.emFirstName}, ${newEmployee.emLastName}, ${newEmployee.emRole}, ${newEmployee.emManager})