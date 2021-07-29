# EmployeeTracker_HW12
Employee Tracker is a command-line application that can be used to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input

WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids

WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Walkthrough Video
<iframe src="https://drive.google.com/file/d/1bBy8VxH2C_ZCyk6Khzc-tYxl4erZ5EFt/preview" width="640" height="480"></iframe>
<br>

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) <br>
This project is covered under the MIT license.

## Installation
What's needed to run:
```
node.js
npm init
npm i inquirer
npm i express
npm i mysql2
npm i console.table
```

## Contributing
Harrison Kidd<br>
<br>
With the help of:<br>
<br>
Jacob Guiro<br>
Jessamyn McTwigan<br>
Brandon Norsworthy<br>
Christyn Garcia<br>

## Questions
Contact me with any questions here: [harrisonakidd@gmail.com](mailto:harrisonakidd@gmail.com)
