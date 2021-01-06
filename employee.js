var mysql = require('mysql')
var inquirer = require('inquirer')

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "sophie2492!",
    database: "employee_db"
})

connection.connect(function (err) {  
    console.log("Connected as id: " + connection.threadId)
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