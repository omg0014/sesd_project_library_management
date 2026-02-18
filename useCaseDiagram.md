# Use Case Diagram - Library Management System

Actors:
1. Admin
2. Member

Use Cases:

Admin:
- Login
- Add Book
- Update Book
- Delete Book
- View All Books
- View Issued Books
- Manage Users

Member:
- Register
- Login
- Search Book
- View Book Details
- Issue Book
- Return Book
- View My Issued Books
- View Fine Details

Relationships:

Member --> Issue Book
Member --> Return Book
Admin --> Manage Books
Admin --> Manage Users

Issue Book --> Check Availability
Return Book --> Calculate Fine
