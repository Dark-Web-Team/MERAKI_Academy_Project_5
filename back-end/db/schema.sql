DROP DATABASE Project_5;


CREATE DATABASE project_5;

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
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    age INT(3),
    gender VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (user_id)
);
CREATE TABLE businesses (
   business_id INT AUTO_INCREMENT NOT NULL,
   type varchar(255) NOT NULL,  
   displayName varchar(255) NOT NULL UNIQUE,
   description VARCHAR(5000),
   main_img varchar(2550),
   city varchar(255) NOT NULL, 
   owner_id INT,
   FOREIGN KEY (owner_id) REFERENCES users(user_id),
   booking_price INT,
   average_rating FLOAT(24) ,
   number_rating INT ,
   opening_time VARCHAR(255),
   closing_time VARCHAR(255),
   lat FLOAT(50),
   lng FLOAT(50),
   is_deleted TINYINT DEFAULT 0,
   PRIMARY KEY (business_id)

 );

 CREATE TABLE image (
    image_id INT  AUTO_INCREMENT NOT NULL,
    image VARCHAR(2550),
    business_id  INT,
    FOREIGN KEY (business_id) REFERENCES businesses(business_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (image_id)
);


 CREATE TABLE comments (
    comment_id INT  AUTO_INCREMENT NOT NULL,
    comment VARCHAR(255) NOT NULL,
    commenter INT,
    FOREIGN KEY (commenter) REFERENCES users(user_id),
    business_id INT,
    FOREIGN KEY (business_id) REFERENCES businesses(business_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (comment_id)
);
CREATE TABLE rating  (
    rating_id INT AUTO_INCREMENT NOT NULL,
    rate FLOAT(24),
    user_id   INT,
    FOREIGN KEY (user_id ) REFERENCES users(user_id),
    business_id INT,
    FOREIGN KEY (business_id ) REFERENCES businesses(business_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (rating_id)
);

CREATE TABLE creditCards (
   card_id INT AUTO_INCREMENT NOT NULL,
   cardNumber INT NOT NULL ,
   cardHolder VARCHAR(255) NOT NULL,
   expiryDate VARCHAR(255) NOT NULL,
   user_id INT, 
   FOREIGN KEY (user_id) REFERENCES users(user_id),
   is_deleted TINYINT DEFAULT 0,
   PRIMARY KEY (card_id)
);

CREATE TABLE reservations(
    reservation_id INT AUTO_INCREMENT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time VARCHAR(255) NOT NULL,
    reservation_maker INT,
    FOREIGN KEY (reservation_maker) REFERENCES users(user_id),
    reserved_business INT,
    FOREIGN KEY (reserved_business) REFERENCES businesses(business_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (reservation_id)
);


CREATE TABLE chat(
    chat_id INT AUTO_INCREMENT NOT NULL,
    chat_content VARCHAR(2550) NOT NULL,
    user_name  VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    user_id INT, 
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    business_id INT,
    FOREIGN KEY (business_id ) REFERENCES businesses(business_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (chat_id)
);

CREATE TABLE privateChat(
    id INT AUTO_INCREMENT NOT NULL,
    user1_id INT, 
    FOREIGN KEY (user1_id) REFERENCES users(user_id),
    user2_id INT, 
    roomId  INT UNIQUE NOT NULL,
    FOREIGN KEY (user2_id) REFERENCES users(user_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);



INSERT INTO roles (role) VALUES ('user');
INSERT INTO roles (role) VALUES ('admin');
INSERT INTO roles (role) VALUES ('owner');



