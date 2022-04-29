CREATE DATABASE user_db;

USE DATABASE user_db;

CREATE TABLE user(
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    user_id UUID(36) NOT NULL, 
    user_password varchar(25) NOT NULL,
    primary key(id)
);