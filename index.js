const server = require("./server");
const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Department = require("./lib/Department");
const Role = require("./lib/Role");

// Start with the task question, which will then branch off to different question arrays
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

// View All Roles needs to show all roles currently present in the database.  SELECT * FROM roles

// Add Employee should prompt the user to type the first name of the employee, followed by last name, then select a role from an inquirer list and selet the employee's manager from an inquirer list as well (This adds the employee to the database.  INSERT INTO employees?)

// Add Role should prompt the user to type the name of the role, followed by the salary of the role, and then using a list choose which department the role belongs to (Push into an array of role objects?)

// Add Department should prompt the user to type the name of the new department, which is then added to the database (INSERT INTO departments?)

// Update Employee Role should prompt the user to select an employee from an inquirer list (Keep an array of employee objects, as well as the database?  Or pull from the database? Will need to grab the employee id), then they are presented another list of roles to assign to this employee id.  When the new role is selected, the database is updated (UPDATE).

// Array of questions for adding a new employee
const empQuestions = [
  {
    type: "input",
    message: "What is the employee's first name?",
    name: "emFirstName",
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "emLastName",
  },
  {
    type: "input",
    message: "What is the employee's role?",
    name: "emRole",
  },
  {
    type: "input",
    message: "Who is the employee's manager?",
    name: "emManager",
  },
];

let depArray = ["Sales", "Engineering", "Finance", "Legal"];

// Question for adding a new department
const depQuestion = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "depName",
  },
];

// Array of questions for adding a new role
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
    choices: [depArray], //Array of all roles that have been added, or pull from database?
  },
];

inquirer.prompt(mainQuestion).then((response) => {
  console.log(response);

  let task = response.task;
  console.log(task);

  checkTask(task);
  return task;
});

function checkTask(task) {
  if (task == "View All Employees") {
    // This should run the SELECT * FROM employees query
  } else if (task == "View All Departments") {
    // This should run the SELECT * FROM departments query
  } else if (task == "View All Roles") {
    // This should run the SELECT * FROM roles query
  } else if (task == "Add Employee") {
    // This should activate the employee questions prompts
    empQues();
  } else if (task == "Add Role") {
    // This should activate the role questions prompts
    roleQues();
  } else if (task == "Add Department") {
    // This should activate the add department prompt
    depQues();
  }
};

function empQues() {
  inquirer.prompt(empQuestions).then((response) => {
    console.log(response);

    let task = response.task;
    let emFirstName = response.emFirstName;
    let emLastName = response.emLastName;
    let emRole = response.emRole;
    let emManager = response.emManager;

    // Create a new employee with these values
    const newEmployee = new Employee(
        emFirstName,
        emLastName,
        emRole,
        emManager
    ); 

    console.log(newEmployee);

    // Check for what to do next
    inquirer.prompt(mainQuestion).then((response) => {
        console.log(response);
      
        let task = response.task;
        console.log(task);
      
        checkTask(task);
        return task;
      });

    checkTask(task);
  });
};

function roleQues() {
  inquirer.prompt(roleQuestions).then((response) => {
    console.log(response);

    let task = response.task;
    let roleName = response.roleName;
    let roleSalary = response.roleSalary;
    let roleDep = response.roleDep;

    // Create a new role with these values
    const newRole = new Role(
        roleName,
        roleSalary,
        roleDep,
    );

    console.log(newRole);

    // Check for what to do next
    inquirer.prompt(mainQuestion).then((response) => {
        console.log(response);
      
        let task = response.task;
        console.log(task);
      
        checkTask(task);
        return task;
      });

    checkTask(task);
  });
};

function depQues() {
  inquirer.prompt(depQuestion).then((response) => {
    console.log(response);

    let task = response.task;
    let newDep = response.depName;

    // Create a new department with this name
    depArray.push(newDep);
    const newDepartment = new Department(
        newDep,
    );

    console.log(newDepartment);

    // Check for what to do next
    inquirer.prompt(mainQuestion).then((response) => {
        console.log(response);
      
        let task = response.task;
        console.log(task);
      
        checkTask(task);
        return task;
      });

    checkTask(task);
  });
};

// Function to initialize app
function init() {}

// Function call to initialize app
init();