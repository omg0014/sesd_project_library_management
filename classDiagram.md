# Class Diagram – Library Management System

## Major Classes

### User (Abstract)
- id
- name
- email
- password
- role
+ login()
+ logout()

### Admin extends User
+ addBook()
+ updateBook()
+ deleteBook()

### Member extends User
+ searchBook()
+ issueBook()
+ returnBook()

### Book
- id
- title
- author
- category
- totalCopies
- availableCopies
+ updateAvailability()

### IssueRecord
- id
- userId
- bookId
- issueDate
- dueDate
- returnDate
- fine
- status
+ calculateFine()

---

## Relationships

User (1) ---- (M) IssueRecord  
Book (1) ---- (M) IssueRecord  
Admin ----|> User  
Member ----|> User
