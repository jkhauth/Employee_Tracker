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
        choices: ["Add Department", "Add Job Role", "Add Employee"]
    }).then(function(answer){
        if(answer.choice=="Add Department"){
            addDepartment();
        }
        else if (answer.choice=="Add Job Role"){
            addJobRole();
        }
        else if (answer.choice=="Add Employee"){
            addEmployee();
        }
    })
}


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
        connection.query("INSERT INTO role SET ?", {
            title: answer.jobtitle,
            salary: answer.salary,
            deparment_id: answer.deparmentnumber
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

