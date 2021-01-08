create database employee_db;
use employee_db;

CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE jobcode (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

-- Department Creation
INSERT INTO department (name)
VALUES ("sales");
INSERT INTO department (name)
VALUES ("Engineers");
INSERT INTO department (name)
VALUES ("Managers");

-- JOB ROLE Creation
INSERT INTO jobcode (title, salary, department_id)
VALUES ("Sale Associate", 60000, 1);
INSERT INTO jobcode (title, salary, department_id)
VALUES ("Engineer", 85000, 2);
INSERT INTO jobcode (title, salary, department_id)
VALUES ("Managers", 100000, 3);