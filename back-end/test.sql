USE db_name;

CREATE TABLE users (
    id int  AUTO_INCREMENT NOT NULL,
    name varchar(255),
    email varchar(255),
    country varchar(255),
    city varchar(255),
    created_at DATETIME,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

 SELECT * FROM users