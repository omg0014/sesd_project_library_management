# Library Management System

## Project Overview

The Library Management System is a full stack web application designed to automate and manage the operations of a library such as managing books, users, issuing and returning books in a systematic and efficient manner.

This project uses a layered backend architecture and clean separation of concerns to achieve high code quality, maintainability, and scalability. Auth, roles, book lifecycle, issuance and fine tracking form the core backend logic.

---

## Scope

The system will support:
- User registration & login
- Role based access: Admin and Member
- Book catalog management
- Issue and return of books
- Fine calculation for late returns
- Search & filter books

---

## Key Features

### Authentication & Authorization
- Users can register and login
- JWT or session based authentication
- Role based access control (Admin vs Member)

### Book Management
- CRUD operations on books
- Availability status
- Search & filter by title/author/category

### Book Issue & Return
- Member issues a book if available
- Admin/member returns the book
- Due date tracking
- Fine generation for overdue returns

---

## Architecture & Design

Backend follows:
- Layered architecture (Controller → Service → Repository)
- OOP features (Inheritance, Abstraction, Encapsulation, Polymorphism)
- Design Patterns: Repository, Service Layer, DTO pattern

Frontend is simple interface (can be React/HTML/CSS)

---

## Backend Technologies (suggestion)
- Java Spring Boot or Node.js + Express
- MySQL or PostgreSQL
- JWT Authentication
- REST APIs
