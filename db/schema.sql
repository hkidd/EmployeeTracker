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
    manager_id INT 
);

-- Create a table to just hold the departments. If there is no employee in a certain department in the employee db, would need to be able to still access all department values
CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Create a table to just hold the roles. As new roles are created, they can be inserted into this table with the relevant info
CREATE TABLE roles(
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);

-- Need to be able to list all employees using a CLI response
SELECT * FROM employees

-- Need to be able to list all departments using a CLI response
SELECT * FROM departments