const server = require('./server');
const inquirer = require('inquirer');


// TODO: Create an arrays of questions for user input

// Probably will start with the task question, which will then branch off to different question arrays
const mainQuestion = {
    type: 'list',
    message: 'What would you like to do?',
    name: 'task',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
    }

    // View All Employees needs to show the entire table of employees from the database. SELECT * FROM employees

    // View All Departments needs to show the entire table of departments from the database. SELECT * FROM departments 

    // Add Employee should prompt the user to type the first name of the employee, followed by last name, then select a role from an inquirer list and selet the employee's manager from an inquirer list as well (This adds the employee to the database.  INSERT INTO employees?)

    // Add Role should then prompt the user to type the name of the role, followed by the salary of the role, and then using a list choose which department the role belongs to (Push into an array of role objects?)

    // Update Employee Role should prompt the user to select an employee from an inquirer list (Keep an array of employee objects, as well as the database?  Or pull from the database? Will need to grab the employee id), then they are presented another list of roles to assign to this employee id.  When the new role is selected, the database is updated (UPDATE).

// 
const questions = [
    {
    type: 'input',
    message: 'What is the name of the department?',
    name: 'depName',
    },
    {
    type: 'input',
    message: 'What is the name of the role?',
    name: 'roleName',
    },
    {
    type: 'input',
    message: 'What is the name of the role?',
    name: 'description',
    },
    {
    type: 'input',
    message: 'What is the salary of the role?',
    name: 'roleSalary',
    },
    {
    type: 'input',
    message: 'Which department does the role belong to?',
    name: 'roleDep',
    },
    {
    type: 'list',
    message: 'What is the employee\'s first name?',
    name: 'emFirstName',
    },
    {
    type: 'list',
    message: 'What is the employee\'s last name?',
    name: 'emLastName',
    },
    {
    type: 'list',
    message: 'What is the employee\'s role?',
    name: 'emRole',
    },
    {
    type: 'list',
    message: 'Who is the employee\'s manager?',
    name: 'emRole',
    },
];


inquirer.prompt(mainQuestion)
    .then((response) => {
        console.log(response);

        if (response.task == 'View All Employees') {

        }
    });



// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
