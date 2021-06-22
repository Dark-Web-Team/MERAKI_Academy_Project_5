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
CREATE TABLE businesses (
   business_id INT AUTO_INCREMENT NOT NULL,
   type varchar(255) NOT NULL,  
   displayName varchar(255) NOT NULL,
   main_img varchar(255),
   city varchar(255) NOT NULL, 
   owner_id INT,
   FOREIGN KEY (owner_id) REFERENCES users(user_id),
   booking_price INT,
   average_rating INT ,
   number_rating INT ,
   is_deleted TINYINT DEFAULT 0,
   PRIMARY KEY (business_id)

 );

 CREATE TABLE image (
    image_id INT  AUTO_INCREMENT NOT NULL,
    image VARCHAR(255),
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
    rate INT(3),
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














