# LMS Premium - Library Management System

This repository contains the source code for LMS Premium, a comprehensive full-stack library management solution consisting of an advanced React-based frontend and an Express/MongoDB backend. It features specialized portals for both Library Members and Administrators, enabling seamless book borrowing, fine tracking, and detailed repository management.

## System Architecture

The application is built using a modern decoupled architecture:

- **Frontend (`/client`)**: Built with React, TypeScript, and Vite. Features routing via React Router and a robust context-based state management mechanism for authentication. The user interface leverages a highly customized design system, focusing on usability, fast transitions, and aesthetic, modern design principles.
- **Backend (`/server`)**: A Node.js API built with Express, TypeScript, and Mongoose (MongoDB). The backend is architected around Model-View-Controller (MVC) principles, isolating routes, controllers, services, and repositories to ensure maximum testability and a clean separation of concerns.

## Key Features

- **Role-Based Authentication**: Distinct member and administrative authorization using JSON Web Tokens (JWT).
- **Core Entity Management**: Administrators can perform complete CRUD operations on the book inventory, tracking total copies and available copies.
- **Transaction Processing**: Members can borrow and return books through an issue tracking system.
- **Fine Management**: Automatic tracking and calculation of late fees with administrative override capabilities.
- **Modern Unified Dashboard**: Clean, responsive, minimal dashboards customized dynamically for the authenticated user's role.

## Prerequisites

Before setting up the project, ensure you have the following installed on your machine:
- Node.js (v18 or higher recommended)
- Default package manager (`npm` or `yarn`)
- A MongoDB cluster or local instance running

## Backend Setup Guide (`/server`)

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install all necessary Node modules:**
   ```bash
   npm install
   ```

3. **Configure the Environment:**
   Open the `.env` file in the `/server` directory and ensure the variables match your setup:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_signing_secret
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The backend will start and synchronize with MongoDB (typically running on `http://localhost:5000`).

## Frontend Setup Guide (`/client`)

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Install all required dependencies:**
   ```bash
   npm install
   ```

3. **Start the Application Frontend:**
   ```bash
   npm run dev
   ```
   The Vite development server will start the application, which usually launches on `http://localhost:5173`.

## Default Access & Usage

After launching both the frontend and backend sequentially, access the frontend URL in your browser.

1. **Registration**: 
   You can register a standard user by navigating to the "Register" process. This will create a standard Member account.

2. **Administration**:
   To access the Administrator dashboard, an admin user must be manually provisioned or elevated in the database by setting the `role` field on a user document to `ADMIN`.

3. **General Workflow**:
   - Admins use their dashboard to add available books and manage active issue records.
   - Members log in, view available books, verify their "My Issues" tab, and monitor their active borrowing records or active fines.

## Project Structure Highlights

- `/client/src/components`: Reusable user interface segments (e.g., Navbar, Protected Routes).
- `/client/src/pages`: Distinct application views tailored for auth flows and individual role dashboards.
- `/server/src/controllers`: Request handlers bridging incoming API routes and backend services.
- `/server/src/services`: Core, reusable functional business logic supporting book operations and user interactions.
- `/server/src/repositories`: Database abstraction layers directly interacting with Mongoose schemas.
