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
       name: 'choices',
       type: 'list',
       message: 'What would you like to do?',
       choices: [
           'View all Employees',
           'View all Employees by Department',
           'View all Employees by Manager',
           'Add Employee',
           'Remove Employee',
           'Update Employee Role',
           'Update Employee Manager',
           'Quit'
       ]
    }).then(choices =>{
        if ('View all Employees'){
            viewEmployees();
        }
        else if ('View all Employees by Department'){
            viewDepartment();
        }
        else if ('View all Employees by Manager'){
            viewManager();
        }
        else if ('Add Employee'){
            addEmployee();
        }
        else if ('Update Employee Role'){
            updateRole();
        }
        else if ('Update Employee Manager'){
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
    console.log(res.length + " employees found!");
    console.table('All Employees:', res); 
    
    })
}