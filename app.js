const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,

function promptEmployeeData() {

    return inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
            validate: function (input) {
               if (input === '') {
                   console.log("Please enter valid name with at least one character!");
                   return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID number?",
            validate: function (input) {
                if (isNaN (input) || input < 1) {
                    console.log("User ID must be a number greater than '0'!");
                    return false;
                 } else {
                     return true;
                 }
             }
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?",
            validate: function (input) {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input))
                {
                  return true
                }
                  console.log("You have entered an invalid email address!")
                  return false
            }

        },
        {
            type: "list",
            name: "role",
            message: "What is your role in the company?",
            choices: ["Intern","Engineer","Manager"],
        },
        {
            type: "input",
            name: "github",
            message: "What is your github username?",
            when: function (answers) {
                if (answers.role === "Engineer") {
                    return true;
                } else {
                    return false;
                }
            } 
        },
        {
            type: "input",
            name: "school",
            message: "What school do you go to?",
            when: function (answers) {
                if (answers.role === "Intern") {
                    return true;
                } else {
                    return false;
                }
            } 
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your office number?",
            when: function (answers) {
                if (answers.role === "Manager") {
                    return true;
                } else {
                    return false;
                }
            } 
        },
        {
            type: "confirm",
            name: "askAddEmployee",
            message: "Would you like to add another employee?",
        },
    ]);
    
}

async function getEmployeesData() {

    try {
        // Get information about employees from the user
        let employeeData = {};
        let collectData = "";
        let employeeList = [];
        let employee = {};
        do {
            employeeData = await promptEmployeeData(); // initialization for first employee (at least 1)
            collectData = employeeData.askAddEmployee;
            console.log (collectData);
            // and to create objects for each team member (using the correct classes as blueprints!)
            switch (employeeData.role) {
                case "Intern":
                        employee = new Intern(
                        employeeData.name,
                        employeeData.id,
                        employeeData.email,
                        employeeData.school
                    );
                    employeeList.push(employee);
                    break;
                case "Engineer":
                        employee = new Engineer(
                        employeeData.name,
                        employeeData.id,
                        employeeData.email,
                        employeeData.github
                    );
                    employeeList.push(employee);
                    break;
                 
                case "Manager":
                        employee = new Manager(
                        employeeData.name,
                        employeeData.id,
                        employeeData.email,
                        employeeData.officeNumber
                    );
                    employeeList.push(employee);
                    break;
            }
        }
        while (collectData); // Loop if collectData is true i.e. askAddEmployee answer is YES
        console.log(employeeList);

        const html = render(employeeList);

        //Check if folder exists
        fs.existsSync(OUTPUT_DIR) || fs.mkdirSync(OUTPUT_DIR) 
        writeFileAsync(outputPath, html, (err) => {
            if (err) throw err;
        });   

    } catch(err) {
        console.error(err.message);
    }
}

getEmployeesData();

//       //Github API request
//       const queryRepoUrl = `https://api.github.com/repos/${answers.githubUsername}/${answers.githubRepo}`;
//       const response = await axios.get(queryRepoUrl);
//       const githubRepoData = response.data;


//       // Get user data from Github API
//       const profPicUrl = githubRepoData.owner.avatar_url;
//       const githubUrl = githubRepoData.owner.url;
      


