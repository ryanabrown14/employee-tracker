const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');



const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Panic!14',
    database: 'employee_infodb'
  });

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    afterConnection();
  });

afterConnection = () => {
   inquirer
   .prompt({
       name: 'choice',
       type: 'list',
       message: 'What would you like to do?',
       choices: [
           'View all Employees',
           'View all Departments',
           'View all Roles',
           'Add Employee',
           'Remove Employee',
           'Update Employee Role',
           'Update Employee Manager',
           'Quit'
       ]
    }).then(answer =>{
        console.log(answer);
        
        if (answer.choice === 'View all Employees'){
            viewEmployees();
        }
        else if (answer.choice === 'View all Departments'){
            viewDepartments();
        }
        else if (answer.choice === 'View all Roles'){
            viewRoles();
        }
        else if (answer.choice ==='Add Employee'){
            addEmployee();
        }
        else if (answer.choice ==='Update Employee Role'){
            updateRole();
        }
        else if (answer.choice ==='Update Employee Manager'){
            updateManager();
        }
        else {
            end();
        }
       

    });


};

function viewEmployees() {
    //console.log('this works')
    let query = "SELECT * FROM employee;";
    connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res); 
    
    });
};

function viewDepartments() {
    console.log("Whhaaaaat");
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      
    });
  };

  function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
    });
  }

