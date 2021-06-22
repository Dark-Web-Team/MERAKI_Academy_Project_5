USE Project_5;

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (role_id)
);

CREATE TABLE users(
    user_id INT AUTO_INCREMENT NOT NULL,
    displayName VARCHAR(255),
    city VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    age INT(3),
    gender VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (user_id)
);














