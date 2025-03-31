# Pet Adoption App

## Overview
The **Pet Adoption Application** is a Spring Boot-based web application that connects pets with potential adopters. Users can browse available pets, submit adoption requests, and manage their accounts, while administrators handle pet listings and adoption approvals.


## Features
Browse and search available pets  
Submit and track adoption requests  
User authentication and profile management  
Admin panel for pet and request management  


## Tech Stack
- **Backend**: Java, Spring Boot  
- **Database**: MySQL  
- **ORM**: Spring Data JPA  
- **API Documentation**: Swagger (optional)  
- **Build Tool**: Maven  

## Project Structure
```
src/
│── controller/      # Handles HTTP requests
│── service/         # Business logic layer
│── dao/             # Data access layer
│── repository/      # Database interaction layer
│── model/           # Entity classes (User, Pet, Request)
```

##  API Endpoints

### **Pets**
| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| GET    | `/api/pets`          | Retrieve all pets         |
| GET    | `/api/pets/{id}`     | Retrieve pet by ID        |
| POST   | `/api/pets`          | Add a new pet             |
| PUT    | `/api/pets/{id}`     | Update pet details        |
| DELETE | `/api/pets/{id}`     | Remove a pet              |

### **Requests**
| Method | Endpoint               | Description                 |
|--------|------------------------|-----------------------------|
| GET    | `/api/requests`        | View all adoption requests |
| GET    | `/api/request/{id}`    | View a specific request    |
| POST   | `/api/request`         | Submit a new adoption request |
| PUT    | `/api/request/{id}`    | Update a request           |
| DELETE | `/api/request/{id}`    | Cancel a request           |

### **Users**
| Method | Endpoint                  | Description                           |
|--------|---------------------------|--------------------------------------|
| GET    | `/api/users/{id}`          | Retrieve user by ID                 |
| POST   | `/api/users`               | Create a new user                   |
| PUT    | `/api/users/{id}`          | Update user details                 |
| DELETE | `/api/users/{id}`          | Remove a user account               |
| GET    | `/api/users/{id}/info`     | Retrieve user profile information   |
| PUT    | `/api/users/{id}/info`     | Update user profile information     |

## **Entity-Relationship Diagram (ERD)**
![ERD](https://github.com/user-attachments/assets/61a80541-e74c-4dcc-a1ea-0e70384894ba)

---

##  **Application Flowchart**
![Flowchart](https://github.com/user-attachments/assets/c519d484-f643-4a29-b0cf-0e1baade1871)

---

##  **Application UML**
![UML](https://github.com/user-attachments/assets/7daaf0a6-a27c-4900-b0be-da5c46e81c8d)

