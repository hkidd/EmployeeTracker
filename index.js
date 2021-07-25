// TODO: Create an array of questions for user input
// Probably will start with the task question, which will then branch off to different question arrays
const questions = [
    {
    type: 'list',
    message: 'What would you like to do?',
    name: 'task',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
    },
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

inquirer.prompt(questions)
    .then((responses) => {

    });

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
