const server = require("./server");
const inquirer = require("inquirer");

// TODO: Create an arrays of questions for user input

// Probably will start with the task question, which will then branch off to different question arrays
const mainQuestion = {
  type: "list",
  message: "What would you like to do?",
  name: "task",
  choices: [
    "View All Employees",
    "Add Employee",
    "Update Employee Role",
    "View All Roles",
    "Add Role",
    "View All Departments",
    "Add Department",
  ],
};

// View All Employees needs to show the entire table of employees from the database. SELECT * FROM employees

// View All Departments needs to show the entire table of departments from the database. SELECT * FROM departments

// View All Roles needs to show all roles currently present in the database

// Add Employee should prompt the user to type the first name of the employee, followed by last name, then select a role from an inquirer list and selet the employee's manager from an inquirer list as well (This adds the employee to the database.  INSERT INTO employees?)

// Add Role should prompt the user to type the name of the role, followed by the salary of the role, and then using a list choose which department the role belongs to (Push into an array of role objects?)

// Add Department should prompt the user to type the name of the new department, which is then added to the database (INSERT INTO departments?)

// Update Employee Role should prompt the user to select an employee from an inquirer list (Keep an array of employee objects, as well as the database?  Or pull from the database? Will need to grab the employee id), then they are presented another list of roles to assign to this employee id.  When the new role is selected, the database is updated (UPDATE).

//

const empQuestions = [
  {
    type: "list",
    message: "What is the employee's first name?",
    name: "emFirstName",
  },
  {
    type: "list",
    message: "What is the employee's last name?",
    name: "emLastName",
  },
  {
    type: "list",
    message: "What is the employee's role?",
    name: "emRole",
  },
  {
    type: "list",
    message: "Who is the employee's manager?",
    name: "emRole",
  },
];

const depQuestion = [
{
    type: "input",
    message: "What is the name of the department?",
    name: "depName",
  },
]

const roleQuestions = [
  {
    type: "input",
    message: "What is the name of the role?",
    name: "roleName",
  },
  {
    type: "input",
    message: "What is the salary of the role?",
    name: "roleSalary",
  },
  {
    type: "list",
    message: "Which department does the role belong to?",
    name: "roleDep",
    choices: [] //Array of all roles that have been added, or pull from database?
  },
];

inquirer.prompt(mainQuestion).then((response) => {
  console.log(response);

    let task = response.task;
    console.log(task);

  if (task == "View All Employees") {
    // This should run the SELECT * FROM employees query
  }
  else if (task == "View All Departments") {
    // This should run the SELECT * FROM departments query
  }
  else if (task == "View All Roles") {
    // This should run the SELECT * FROM roles query
  } 
  else if (task == "Add Employee") {
    // This should activate the employee questions prompts
  } 
  else if (task == "Add Role") {
    // This should activate the role questions prompts
  } 
  else if (task == "Add Department") {
    // This should activate the add department prompt
  }

});

// Function to initialize app
function init() {}

// Function call to initialize app
init();
