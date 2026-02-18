# Class Diagram - Library Management System

Classes:

User (Abstract)
- id
- name
- email
- password
- role
+ login()
+ logout()

Admin extends User
+ addBook()
+ updateBook()
+ deleteBook()
+ manageUsers()

Member extends User
+ searchBook()
+ issueBook()
+ returnBook()
+ viewIssuedBooks()

Book
- id
- title
- author
- category
- availableCopies
+ updateAvailability()

IssueRecord
- id
- issueDate
- dueDate
- returnDate
- fineAmount
- status
+ calculateFine()

Relationships:

User (1) ---- (M) IssueRecord
Book (1) ---- (M) IssueRecord
Admin ----|> User
Member ----|> User
