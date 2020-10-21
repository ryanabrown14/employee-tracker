const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');




const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
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
           'Add a Department',
           'Add a Role',
           'Update Employee Role',
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
        else if (answer.choice ==='Add a Department'){
            addDepartment();
        }
        else if (answer.choice ==='Add a Role'){
            addRole();
        }
        else if (answer.choice ==='Update Employee Role'){
            updateRole();
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
    afterConnection(); 
    
    });
};

function viewDepartments() {
    //console.log("test");
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      afterConnection();
      
    });
  };

  function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      afterConnection();
    });
  };

  function addEmployee(){
      inquirer.prompt([
          {
              type: 'input',
              name: 'firstName',
              message: 'New Employees First Name'

          },
          {
            type: 'input',
            name: 'lastName',
            message:'New Employees Last Name?'
          },
          {
              type:'input',
              name: 'roleId',
              message: 'Employees Role ID number'
          },
          {
              type:'input',
              name: 'managerId',
              message: 'New Employees Manger ID'
          }
      ]).then (answer =>{
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleId, answer.managerId], function(err, res){
            if (err) throw err;
            afterConnection();

        }); 
    });

  };

  function addDepartment(){
      inquirer.prompt({
          type:'input',
          name: 'department',
          message: 'New Departments name' 
      }).then (answer => {
        connection.query('INSERT INTO department (name) VALUES (?)', [answer.department], function(err, res){
            if (err) throw err;
            afterConnection();

        });
      });

  };

  function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'New Roles Name'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'New Roles Salary'
        },
        {
            type: 'input',
            name: 'deptId',
            message: 'New Roles Department ID'
        }
    ]).then(answer =>{
        connection.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [answer.name, answer.salary, answer.deptId], function(err, res) {
            if (err) throw err;
            afterConnection();
        });
    });
  };

  function updateRole(){
      inquirer.prompt([
          {
              type: 'input',
              name: 'empId',
              message: 'The Employee Id of the Employee'
          },
          {
              type: 'input',
              name: 'newRoleId',
              message: 'New Role Id'
          }

      ]).then(answer => {
          connection.query('UPDATE employee SET role_id=? WHERE id=?', [answer.newRoleId, answer.empId], function(err, res) {
            if (err) throw err;
            afterConnection();
          });
      })

  };
  function end(){
    process.exit()
  };

