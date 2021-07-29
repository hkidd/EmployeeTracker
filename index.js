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

function mainPrompt() {

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

    }
  );

  // Check for what to do next
  mainPrompt();
}

// Put all roles in an array for the questions
function getAllRoles() {
  return new Promise((resolve, reject) => {
  db.query(
    "SELECT id, title, salary, department_id FROM roles;",
    function (err, results) {
      if (err) {
        console.log(err);
      }

      // Map through the array and return the role title from each index
      let allRoles = results.map(i => { return i.title })
      resolve(allRoles);
      });
    }
  );
}

// Put all roles in an array for the questions
function getAllDeps() {
  return new Promise((resolve, reject) => {
  db.query("SELECT id, name FROM departments;", function (err, results) {
    if (err) {
      console.log(err);
    }

    // Map through the array and return the name from each index
    let allDeps = results.map(i => { return i.name })
    resolve(allDeps);
    });
  });
}

// Put all roles in an array for the questions
function getAllEmps() {
  return new Promise((resolve, reject) => {
  db.query(
    "SELECT id, CONCAT(first_name, ' ', last_name) AS employee_name, role_id, manager_id FROM employees;",
    function (err, results) {
      if (err) {
        console.log(err);
      }

      // Map through the array and return the employee name from each index
      let allEmps = results.map(i => { return i.employee_name })
      resolve(allEmps);
      });
    }
  );
}

async function empQues() {
  // To dynamically update these arrays, need to do async and await along with promises
  const roles = await getAllRoles();
  const emps = await getAllEmps();

  inquirer.prompt([
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
      choices: roles, //Array of all roles that have been added, pulled from db
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      name: "emManager",
      choices: emps, //Array of all employees that have been added, pulled from db
    },
  ]).then(async (response) => {
    let emFirstName = response.emFirstName;
    let emLastName = response.emLastName;
    let eRole = response.emRole;
    let emManager = response.emManager;

    let roleId = await getIdFromRole(eRole);

    let managerId = await getIdFromName(emManager) || null; // can be null by default

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

async function roleQues() {
  const deps = await getAllDeps();

  inquirer.prompt([
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
    choices: deps, //Array of all deps that have been added, pulled from db
  },
]).then(async (response) => {
  console.log(response);
    let roleName = response.roleName;
    let roleSalary = response.roleSalary;
    let roleDep = response.roleDep;

    let deptId = await getIdFromDep(roleDep);

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
  inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the department?",
      name: "depName",
    },
  ]).then((response) => {
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
async function updateEmp() {
  // To dynamically update these arrays, need to do async and await along with promises
  const emps = await getAllEmps();
  const roles = await getAllRoles();

  inquirer.prompt([
  {
    type: "list",
    message: "Which employee would you like to update?",
    name: "upEmpName",
    choices: emps,
  },
  {
    type: "list",
    message: "What's their new role'?",
    name: "upEmpRole",
    choices: roles,
  },
]).then(async (response) => {

    let upEmpName = response.upEmpName;
    let newEmpRole = response.upEmpRole;

    let empId = await getIdFromName(upEmpName);

    let roleId = await getIdFromRole(newEmpRole);

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

// Instead of for loops, needed to do more querys to grab the id's for each name, role, and department
function getIdFromName(name) {
  return new Promise(function (resolve, reject) {
    let empId;

    db.query(`SELECT * FROM employees WHERE CONCAT(first_name, ' ', last_name) LIKE '%${name}%';`,
    function (err, results) {
      if (err) {
        console.log(err)
      }

      empId = results[0].id
      resolve(empId);
    })
  })
};

function getIdFromRole(role) {
  return new Promise(function (resolve, reject) {
    let roleId;

    db.query(`SELECT * FROM roles WHERE title LIKE '%${role}%';`,
    function (err, results) {
      if (err) {
        console.log(err)
      }

      roleId = results[0].id
      resolve(roleId);
    })
  })
};

function getIdFromDep(dep) {
  return new Promise(function (resolve, reject) {
    let depId;

    db.query(`SELECT * FROM departments WHERE name LIKE '%${dep}%';`,
    function (err, results) {
      if (err) {
        console.log(err)
      }

      depId = results[0].id
      resolve(depId);
    })
  })
};

mainPrompt();