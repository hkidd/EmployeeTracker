const server = require("./server");
const inquirer = require("inquirer");
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
    "Update Employee Role",
    "I'm Done",
  ],
};

let allEmps = [
  "None",
  "Leah Nelson",
  "Tom Myspace",
  "Christian Henry",
  "Neil Denver",
  "Harrison Kidd",
  "Christyn Garcia",
  "Jacob Guiro",
  "Jessamyn McTwigan",
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

const updateEmpQues = [
  {
    type: "list",
    message: "Which employee would you like to update?",
    name: "upEmpName",
    choices: allEmps,
  },
  {
    type: "list",
    message: "What's their new role'?",
    name: "upEmpRole",
    choices: allRoles,
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

      case "Update Employee Role":
        updateEmp();
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
    "SELECT id, CONCAT(first_name, ' ', last_name) AS employee_name, role_id, manager_id FROM employees;",
    function (err, results) {
      if (err) {
        console.log(err);
      }

      results.forEach((employee_name) => {
        allEmps.push(employee_name);
      });
    }
  );
  return allEmps;
}

function empQues() {
  // getAllEmps();

  inquirer.prompt(empQuestions).then((response) => {
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

    let managerId = null; // can be null by default

    // get id for manager
    for (i = 0; i < allEmps.length; i++) {
      if (emManager == allEmps[i].employee_name) {
        managerId = allEmps[i].id;
      }
    }

    // db query to insert the new employee info, quotes needed for the strings
    db.query(
      `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${emFirstName}", "${emLastName}", ${roleId}, ${managerId});`,
      function (err, results) {
        if (err) return err;

        console.log(`\n Added ${emFirstName} to the database! \n`);
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

    // db query to insert the new role info, quotes needed for the string
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
    let newDep = response.depName;

    // Create a new department with this name
    allDeps.push(newDep);

    // db query to insert the new department info, quotes needed for the string
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

// Need to be able to update an employee's role
function updateEmp() {
  inquirer.prompt(updateEmpQues).then((response) => {
    let upEmpName = response.upEmpName;
    let newEmpRole = response.upEmpRole;

    let empId;

    // get id for employee
    for (i = 0; i < allEmps.length; i++) {
      if (upEmpName == allEmps[i].employee_name) {
        empId = allEmps[i].id;
      }
    }

    let roleId;

    // get id for role
    for (i = 0; i < allRoles.length; i++) {
      if (newEmpRole == allRoles[i].title) {
        roleId = allRoles[i].id;
      }
    }

    // db query to insert the new employee info
    db.query(
      `UPDATE employees SET role_id = ${roleId} WHERE id = ${empId};`,
      function (err, results) {
        if (err) return err;

        console.log(`\n Updated ${upEmpName}'s role! \n`);
      }
    );

    // Check for what to do next
    mainPrompt();
  });
}

mainPrompt();
