CREATE TABLE users
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(25)  NOT NULL,
    email    VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role     ENUM ('ADMIN','ADOPTER') NOT NULL
);

CREATE TABLE user_info
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    user_id      INT,
    firstName    VARCHAR(50) NOT NULL,
    lastName     VARCHAR(50) NOT NULL,
    phone_number CHAR(15),
    birthDate    DATE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE pets
(
    pet_id INT PRIMARY KEY AUTO_INCREMENT,
    species ENUM('dog', 'cat', 'rabbit', 'other') NOT NULL,
    size VARCHAR(50),
    sex VARCHAR(1),
    age VARCHAR(50),
    pet_name VARCHAR(25),
    primary_breed VARCHAR(50),
    secondary_breed VARCHAR(50),
    state_code CHAR(2),
    city VARCHAR(25),
    photo_url VARCHAR(255),
    status ENUM('available', 'pending', 'adopted') NOT NULL
);

CREATE TABLE requests
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    pet_id      INT,
    user_id     INT,
    requestDate DATE,
    message     TEXT,
    status ENUM('pending', 'approved', 'rejected') NOT NULL,
    CONSTRAINT fk_pet FOREIGN KEY (pet_id) REFERENCES pets (pet_id),
    CONSTRAINT fk_request_user FOREIGN KEY (user_id) REFERENCES users (id)
);
