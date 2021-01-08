var mysql = require('mysql')
var inquirer = require('inquirer')

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Sophie2492!",
    database: "employee_db"
})

connection.connect(function (err) {  
    console.log("Connected as id: " + connection.threadId)
    start();
})

var start = function (){
    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Departments","View Roles","View Employees","Add Department", "Add Job Role", "Add Employee", "Update Employee", "Delete Employee"]
    }).then(function(answer){
        if (answer.choice=="View Departments"){
            viewDepartments();
        }
        else if (answer.choice=="View Roles"){
            viewRole();
        }
        else if (answer.choice=="View Employees"){
            viewEmployees();
        }
        else if(answer.choice=="Add Department"){
            addDepartment();
        }
        else if (answer.choice=="Add Job Role"){
            addJobRole();
        }
        else if (answer.choice=="Add Employee"){
            addEmployee();
        }
        else if (answer.choice=="Update Employee"){
            updateEmployee();
        }
        else if (answer.choice=="Delete Employee"){
            deleteEmployee();
        }
    })
}

//=======CREATING INFORMATION TO DATABASE FUNCTIONALITY=======//
var addDepartment = function (){
    inquirer.prompt([{
        name: "deparmentname",
        type: "input",
        message: "What is the name of your the deparment?"
    }
    ]).then(function(answer){
        connection.query("INSERT INTO department SET ?", {
            name:answer.deparmentname
        }, function(err,res){
            console.log("Succesfully Added Department")
            start()
        })
    })
}

var addJobRole = function (){
    inquirer.prompt([
        {
        name: "jobtitle",
        type: "input",
        message: "What is the name of the job title?"
        },
        {
        name: "salary",
        type: "number",
        message: "what is the starting salary?"
        },
        {
        name: "departmentnumber",
        type: "number",
        message: "what is the deparment?"
        }
    ]).then(function(answer){
        connection.query("INSERT INTO jobcode SET ?", {
            title: answer.jobtitle,
            salary: answer.salary,
            department_id: answer.departmentnumber
        }, function(err,res){
            console.log("Succesfully Added Job Role")
            start()
        })
    })
}

var addEmployee = function (){
    inquirer.prompt([{
        name: "first_name",
        type: "input",
        message: "What is the first name of the employee?"
    },{
        name: "last_name",
        type: "input",
        message: "What is the last name of the employee?"
    },
    {
        name: "employeejobcode",
        type: "number",
        message: "What is the employees role id?"
    },
    {
        name: "managercode",
        type: "number",
        message: "What is the employees manager id?"
    }
    ]).then(function(answer){
        connection.query("INSERT INTO employee SET ?", {
        first_name:answer.first_name,
        last_name:answer.last_name,
        role_id:answer.employeejobcode,
        manager_id:answer.managercode
        }, function(err,res){
            console.log("Succesfully Added Employee")
            start()
        })
    })
}

//======READING INFORMATION FROM DATABASE FUNCTIONALITY============//

var viewDepartments = function (){
    console.log("Selecting all departments...\n");
    connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

var viewRole = function (){
    console.log("Selecting all job roles...\n");
    connection.query("SELECT * FROM jobcode", function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

var viewEmployees = function (){
    console.log("Selecting all employees...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

//======UPDATING INFORMATION FROM DATABASE FUNCTIONALITY==============//
var updateEmployee = function (){
    inquirer.prompt([{
        name: "chosenEmployee",
        type: "input",
        message: "What is the employee's id?"
    },{
        name: "newRole",
        type: "input",
        message: "What is the new role id?"
    }
    ]).then(function(answer){
        connection.query("UPDATE employee SET ? WHERE ?", 
        [{role_id:answer.newRole},
        {id:answer.chosenEmployee}], 
        function(err,res){
            console.log("Succesfully Updated Employee")
            console.log()
            start();  
        })
    })
}

//======DELETING INFORMATION FROM DATABASE FUNCTIONALITY==============//
var deleteEmployee = function (){
    inquirer.prompt([{
        name: "chosenEmployee",
        type: "input",
        message: "What is the employee's id?"
    }
    ]).then(function(answer){
        connection.query(
            "DELETE FROM employee WHERE ?",
            {
              id: answer.chosenEmployee
            },
            function(err, res) {
              if (err) throw err;
              start();
            }
          );
    })
}