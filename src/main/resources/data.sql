INSERT INTO users (username, email, password, role)
VALUES ('jdoe', 'jdoe@example.com', 'hashedpassword123', 'adopter'),
       ('admin1', 'admin@example.com', 'adminpass456', 'admin'),
       ('lily', 'lily@example.com', 'lilypass789', 'adopter'),
       ('max', 'max@example.com', 'maxsecure321', 'adopter');

INSERT INTO user_info (user_id, firstName, lastName, phone_number, birthDate)
VALUES (1, 'John', 'Doe', '1234567890', '1990-01-01'),
       (2, 'Admin', 'User', '0987654321', '1985-05-15'),
       (3, 'Lily', 'Evans', '1112223333', '1995-09-09'),
       (4, 'Max', 'Turner', '4445556666', '1988-12-12');

INSERT INTO requests (pet_id, user_id, request_date, message, status)
VALUES (1, 1, '2025-03-01', 'I would love to adopt this pet!', 'pending'),
       (2, 1, '2025-03-02', 'Can I meet this pet before adopting?', 'approved'),
       (3, 3, '2025-03-05', 'Looking for a calm pet for my apartment.', 'pending'),
       (4, 4, '2025-03-06', 'Perfect companion for my child.', 'rejected');
