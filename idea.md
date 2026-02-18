# Library Management System

## 1. Project Overview

The Library Management System is a full-stack web application that allows administrators to manage books and users, and allows registered users to issue and return books.

The system focuses mainly on backend architecture using proper software engineering principles such as OOP, layered architecture, and clean separation of concerns.

Backend Weightage: 75%
Frontend Weightage: 25%

---

## 2. Scope of the Project

This system will allow:

- Admin to manage books (add, update, delete)
- Admin to manage users
- Users to search books
- Users to issue books
- Users to return books
- Automatic fine calculation for late return
- View issued books history

This is a multi-role system:
- Admin
- Member (User)

---

## 3. Key Features

### Authentication & Authorization
- User Registration
- Login (JWT/session-based authentication)
- Role-based access control

### Book Management
- Add new book
- Update book details
- Delete book
- Search book by title/author/category
- View availability status

### Issue & Return System
- Issue book (if available)
- Return book
- Due date tracking
- Fine calculation for late return

### Reports
- View issued books
- View overdue books
- View fine history

---

## 4. Backend Architecture

The backend will follow a layered architecture:

- Controller Layer
- Service Layer
- Repository Layer
- Model/Entity Layer

OOP Principles Used:
- Encapsulation (private fields with getters/setters)
- Abstraction (service interfaces)
- Inheritance (User → Admin, Member)
- Polymorphism (method overriding where required)

Design Patterns:
- Repository Pattern
- Service Layer Pattern
- Factory Pattern (optional for user creation)
- Singleton (configuration)

---

## 5. Future Enhancements (Optional)

- Book reservation system
- Email notifications
- Pagination & sorting
- Fine payment integration
- Admin analytics dashboard
