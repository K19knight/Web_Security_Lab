# Hotel Reservation Management System

## Overview

This project is a full-stack web application designed to manage hotel
room reservations. Built as part of a master's thesis titled *"Analysis
of Possibilities for Increasing the Security of Web Technologies Using
the Example of an Application Supporting Hotel Room Reservations"*, the
system serves both as a functional hotel booking platform and as a
foundation for security testing and analysis.

## Features

### Unauthenticated Users

-   User registration
-   Login
-   Viewing available rooms
-   Searching rooms with filters

### Authenticated Users

-   All unauthenticated functionalities
-   Creating reservations
-   Viewing personal reservations
-   Canceling reservations
-   Editing user profile

### Administrators

-   Managing users (view, delete, block)
-   Managing rooms (add, edit, delete)
-   Managing reservations

## Technologies Used

### Backend

-   Java 17
-   Spring Boot
-   Spring Security
-   JWT Authentication
-   MySQL
-   JPA / Hibernate

### Frontend

-   React.js
-   Axios
-   Component-based SPA architecture

## Architecture

The system uses a client--server architecture: - The frontend (React)
handles UI and communicates with the backend. - The backend (Spring
Boot) manages business logic, authentication/authorization, and database
communication. - The database (MySQL) stores all application data.

Backend package structure: - `auth` -- authentication, JWT,
login/registration - `controller` -- REST API endpoints - `service` --
business logic - `repository` -- database communication - `model` --
entity definitions

Database tables: - `user` - `room` - `reservation`

## Security Features

The system implements protections against common web attacks,
including: - JWT-based authentication - Rate limiting (Brute Force
protection) - BCrypt password hashing - Input validation - XSS
protection - CSRF prevention - Secure session/token management - SQL
Injection prevention

## Key API Endpoints

### Authentication

    POST /auth/register
    POST /auth/login
    POST /auth/logout
    PUT  /auth/changePassword

### Users

    GET    /api/user/getAll
    GET    /api/user/{userId}
    DELETE /api/user/{userId}
    GET    /api/user/myProfile
    PUT    /api/user/myProfile
    GET    /api/user/myReservation
    DELETE /api/user/myReservation/{reservationId}

## Running the Project

### Backend

1.  Set up MySQL and configure `application.properties`:


    spring.datasource.url=jdbc:mysql://localhost:3306/hotel
    spring.datasource.username=root
    spring.datasource.password=your_password

2.  Start backend:


    mvn spring-boot:run

### Frontend

    cd frontend
    npm install
    npm start

## Security Testing

The project includes testing for: - Brute Force - SQL Injection - XSS -
CSRF - Session Hijacking

## Author

**Konrad Blicharz**\
Master's Thesis -- Cracow University of Technology, 2025
