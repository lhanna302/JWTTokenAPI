CREATE DATABASE user_db;

USE user_db;

CREATE TABLE user(
    id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    user_id varchar(36) NOT NULL, 
    user_password varchar(25) NOT NULL
);