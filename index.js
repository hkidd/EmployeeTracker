const server = require("./server");
const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Department = require("./lib/Department");
const Role = require("./lib/Role");
const cTable = require("console.table");
const db = require("./server");

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
    "I'm Done",
  ],
};

// Update Employee Role should prompt the user to select an employee from an inquirer list (Keep an array of employee objects, as well as the database?  Or pull from the database? Will need to grab the employee id), then they are presented another list of roles to assign to this employee id.  When the new role is selected, the database is updated (UPDATE).
let allEmps = [
  "Leah",
  "Tom",
  "Christian",
  "Neil",
  "Harrison",
  "Christyn",
  "Jacob",
  "Jessamyn",
];
let allDeps = ["Sales", "Engineering", "Finance", "Legal"];
let allRoles = [
  "Full Stack Web Dev",
  "Data Scientist",
  "Software Salesman",
  "Accountant",
  "Lawyer",
  "Senior Manager",
  "CEO",
];

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
    type: "list",
    message: "What is the employee's role?",
    name: "emRole",
    choices: allRoles, //Array of all roles that have been added, pulled from db
  },
  {
    type: "list",
    message: "Who is the employee's manager?",
    name: "emManager",
    choices: allEmps, //Array of all employees that have been added, pulled from db
  },
];

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
    choices: allDeps, //Array of all deps that have been added, pulled from db
  },
];

function mainPrompt() {
  getAllRoles();
  getAllDeps();
  getAllEmps();

  inquirer.prompt(mainQuestion).then((response) => {

    switch (response.task) {
      case "View All Employees":
        viewAllEmployees();
        break;

      case "View All Departments":
        viewAllDeps();
        break;

      case "View All Roles":
        viewAllRoles();
        break;

      case "Add Employee":
        empQues();
        break;

      case "Add Role":
        roleQues();
        break;

      case "Add Department":
        depQues();
        break;

      case "I'm Done":
        // End the server connection/program
        db.end();
        return;
    }
  });
}

function viewAllEmployees() {
  // Need to join the tables
  db.query(
    "SELECT e.id employee_id, CONCAT(e.first_name, ' ', e.last_name) AS employee_name, roles.title, departments.name AS department, roles.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name FROM employees e LEFT JOIN employees m ON e.manager_id = m.id INNER JOIN roles ON (roles.id = e.role_id) INNER JOIN departments ON (departments.id = roles.department_id) ORDER BY e.id;",
    function (err, results) {
      if (err) {
        console.log(err);
      }

      console.log("\n");
      console.table(results);
      console.log("\n");
    }
  );

  // Check for what to do next
  mainPrompt();
}

function viewAllDeps() {
  // Need to join the tables
  db.query(
    "SELECT id, name AS department FROM departments",
    function (err, results) {
      if (err) {
        console.log(err);
      }

      console.log("\n");
      console.table(results);
      console.log("\n");

      // console.log(results);
    }
  );

  // Check for what to do next
  mainPrompt();
}

function viewAllRoles() {
  // Need to join the tables
  db.query(
    "SELECT r.id, r.title, d.name AS department, r.salary FROM roles r INNER JOIN departments d ON r.department_id = d.id;",
    function (err, results) {
      if (err) {
        console.log(err);
      }

      console.log("\n");
      console.table(results);
      console.log("\n");

      // console.log(results);
    }
  );

  // Check for what to do next
  mainPrompt();
}

// Put all roles in an array for the questions
function getAllRoles() {
  db.query(
    "SELECT id, title, salary, department_id FROM roles;",
    function (err, results) {
      if (err) {
        console.log(err);
      }

      results.forEach((title) => {
        allRoles.push(title);
      });
    }
  );
  // console.log(allRoles);
  return allRoles;
}

// Put all roles in an array for the questions
function getAllDeps() {
  db.query("SELECT id, name FROM departments;", function (err, results) {
    if (err) {
      console.log(err);
    }

    results.forEach((name) => {
      allDeps.push(name);
    });
  });
  // console.log(allDeps);
  return allDeps;
}

// Put all roles in an array for the questions
function getAllEmps() {
  db.query(
    "SELECT id, first_name, last_name, role_id, manager_id FROM employees;",
    function (err, results) {
      if (err) {
        console.log(err);
      }

      results.forEach((first_name) => {
        allEmps.push(first_name);
      });
    }
  );
  console.log(allEmps);
  return allEmps;
}

function empQues() {
  getAllEmps();

  inquirer.prompt(empQuestions).then((response) => {
    // console.log(response);

    let emFirstName = response.emFirstName;
    let emLastName = response.emLastName;
    let eRole = response.emRole;
    let emManager = response.emManager;

    let roleId;

    // get id for role
    for (i = 0; i < allRoles.length; i++) {
      if (eRole == allRoles[i].title) {
        roleId = allRoles[i].id;
      }
    }

    console.log(roleId);

    let managerId = null; // can be null by default

    // get id for manager
    for (i = 0; i < allEmps.length; i++) {
      if (emManager == allEmps[i].first_name) {
        managerId = allEmps[i].id;
      }
    }

    console.log(managerId);

    db.query(
      `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${emFirstName}", "${emLastName}", ${roleId}, ${managerId});`,
      function (err, results) {
        if (err) return err;

        console.log("\n Added Employee! \n");
      }
    );

    // Check for what to do next
    mainPrompt();
  });
}

function roleQues() {
  inquirer.prompt(roleQuestions).then((response) => {
    let roleName = response.roleName;
    let roleSalary = response.roleSalary;
    let roleDep = response.roleDep;

    let deptId;

    // get deptId for role
    for (i = 0; i < allDeps.length; i++) {
      if (roleDep == allDeps[i].name) {
        deptId = allDeps[i].id;
      }
    }

    console.log(deptId);

    db.query(
      `INSERT INTO roles (title, salary, department_id) VALUES ("${roleName}", ${roleSalary}, ${deptId});`,
      function (err, results) {
        if (err) return err;

        console.log("\n Added Role! \n");
      }
    );
    // Check for what to do next
    mainPrompt();
  });
}

function depQues() {
  inquirer.prompt(depQuestion).then((response) => {
    // console.log(response);

    let newDep = response.depName;

    // Create a new department with this name
    allDeps.push(newDep);

    db.query(
      `INSERT INTO departments (name) VALUES ("${newDep}");`,
      function (err, results) {
        if (err) return err;

        console.log("\n Added Department! \n");
      }
    );
    // Check for what to do next
    mainPrompt();
  });
}

mainPrompt();
