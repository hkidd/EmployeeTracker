// TODO: Create an array of questions for user input
const questions = [
    {
    type: 'list',
    message: 'What would you like to do?',
    name: 'task',
    choices: []
    },
    {
    type: 'input',
    message: 'What is the name of the department?',
    name: 'email',
    },
    {
    type: 'input',
    message: 'What is the name of the role?',
    name: 'title',
    },
    {
    type: 'input',
    message: 'What is the name of the role?',
    name: 'description',
    },
    {
    type: 'input',
    message: 'What is the salary of the role?',
    name: 'salary',
    },
    {
    type: 'input',
    message: 'Which department does the role belong to?',
    name: 'usage',
    },
    {
    type: 'list',
    message: 'What type of license does this project use?',
    name: 'license',
    choices: ["MIT", "Apache 2.0", "GNU v3.0", "BSD 2-Clause", "BSD 3-Clause", "Boost 1.0", "Creative Commons Zero v1.0", "Eclipse Public 2.0", "GNU Affero v3.0", "GNU Gen Pub v2.0", "Moz Pub 2.0", "The Unilicense", "Open"],
    },
];

inquirer.prompt(questions)
    .then((responses) => {

    });

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
