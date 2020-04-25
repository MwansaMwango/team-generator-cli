const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,

function promptEmployeeData() {

    return inquirer.prompt ([
        {
            type: "input",
            name: "id",
            message: "What is your ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?",
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
            name: "addEmployee",
            message: "Would you like to add another employee?",
        },
    ]);
    
}

async function getEmployeesData() {

    try {
      // Get number of Team Members from user prompt answer
     // const numOfEmployees = await promptNumOfEmployees();
      
      //console.log (numOfEmployees);
      
      let employeeData = await promptEmployeeData();
      let collectData = employeeData.addEmployee;
      console.log (employeeData.addEmployee);
      while (collectData) {
        employeeData = await promptEmployeeData();
        console.log (employeeData);
        collectData = employeeData.addEmployee;
      }  
    //   for (i = 0; i < numOfEmployees; i++ ) {
        
    //     let employeeData = await promptEmployeeData();
    //     console.log ('#'+i+'---'+ employeeData);

    //   }
    } catch(err) {
      console.error(err.message);
    }}

getEmployeesData();

//       //Github API request
//       const queryRepoUrl = `https://api.github.com/repos/${answers.githubUsername}/${answers.githubRepo}`;
//       const response = await axios.get(queryRepoUrl);
//       const githubRepoData = response.data;
   
   
//       // Get user data from Github API
//       const profPicUrl = githubRepoData.owner.avatar_url;
//       const githubUrl = githubRepoData.owner.url;
      
//       // Generate readme content data
//       let readMeData = 
//   `
//   # ${answers.projectTitle} ![Github Update](${updatedBadgeUrl}) ![Github Forks](${forksBadgeUrl}) ![Github Forks](${starsBadgeUrl}) ![Github Forks](${openIssuesBadgeUrl})
//   ## Description
//   ${answers.description}
  
//   ---
//   ## Table of Contents
  
//    * [Installation](#installation)
//    * [Usage](#usage)
//    * [Licence](#licence)
//    * [Contributing](#contributing)
//    * [Tests](#tests)
//    * [Questions](#questions) 
//   ---
//   ## Installation
//   ${answers.installation}
//   ## Usage
//   ${answers.usage}
//   ## Licence
//   ${answers.licence}
//   ## Contribution
//   ${answers.contribution}
//   ## Tests
//   ${answers.tests}
  
//   ---
//   ## Have any questions?
//   ![Github profile picture](${profPicUrl})
//   * [Github Link](${githubUrl})
//   * Email: ${answers.email}
//   `;
  
//       //Write to new readme file
//       writeFileAsync ('MyReadME.md', readMeData, (err) => {
//       if (err) throw err;
//       });
//       console.log ("Successfully created 'MyReadME.md' file");  
//       //Handle rejected promise
//     } catch(err) {
//       console.error(err.message);
//     }
//   }
  
//   generateReadMe();
// const numberOfEmployee = await 
// for (i = 0, i < prom  )

// // Get Answers from User prompts
// const answers = await promptUser();

// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!``'