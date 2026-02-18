# Sequence Diagram — Library Management System

## Main Flow: End-to-End Book Issue & Return Lifecycle

This sequence diagram illustrates the complete lifecycle of a book transaction — 
from a member logging in, searching and issuing a book, to returning it and fine settlement.

System follows layered architecture:
Controller → Service → Repository → Database

---

=========================================================
PHASE 1: Authentication
=========================================================

Member → AuthController : login(email, password)
AuthController → AuthService : validateCredentials()
AuthService → UserRepository : findByEmail()
UserRepository → Database : SELECT * FROM USERS
Database → UserRepository : user record
UserRepository → AuthService : user
AuthService → AuthController : generateJWT()
AuthController → Member : Auth Token

Key Pattern Used:
- Service Layer
- Repository Pattern
- Singleton (JWT Utility)

---

=========================================================
PHASE 2: Search & Book Availability Check
=========================================================

Member → BookController : searchBook(title/author)
BookController → BookService : searchBooks()
BookService → BookRepository : findByTitleOrAuthor()
BookRepository → Database : SELECT * FROM BOOKS
Database → BookRepository : book list
BookRepository → BookService : results
BookService → BookController : response
BookController → Member : Book List

Member → BookController : checkAvailability(bookId)
BookController → BookService : checkAvailability()
BookService → BookRepository : findById()
BookRepository → Database : SELECT * FROM BOOKS WHERE id=?
Database → BookRepository : book
BookService → BookController : availableCopies
BookController → Member : Availability Status

Key Pattern Used:
- Repository Pattern
- DTO Pattern

---

=========================================================
PHASE 3: Issue Book
=========================================================

Member → BookController : issueBook(bookId)
BookController → IssueService : createIssueRecord(memberId, bookId)

IssueService → BookRepository : findById()
BookRepository → Database : SELECT BOOK
Database → BookRepository : book

IssueService → IssueRepository : checkActiveIssue(memberId, bookId)
IssueRepository → Database : SELECT ISSUE_RECORDS
Database → IssueRepository : result

[Condition Check]
If availableCopies > 0 AND no active issue:

IssueService → IssueRepository : saveIssueRecord()
IssueRepository → Database : INSERT INTO ISSUE_RECORDS

IssueService → BookRepository : decrementAvailableCopies()
BookRepository → Database : UPDATE BOOKS

IssueService → BookController : Issue Success
BookController → Member : Book Issued Successfully

Else:
IssueService → BookController : Book Not Available
BookController → Member : Error Message

Key Patterns Used:
- Service Layer Pattern
- Transaction Management
- Strategy (Fine Calculation Strategy prepared)

---

=========================================================
PHASE 4: Return Book
=========================================================

Member → BookController : returnBook(bookId)
BookController → IssueService : processReturn(memberId, bookId)

IssueService → IssueRepository : findActiveIssue()
IssueRepository → Database : SELECT active record
Database → IssueRepository : issue record

IssueService → FineService : calculateFine(dueDate, returnDate)

FineService:
If returnDate > dueDate:
    fine = daysLate × finePerDay
Else:
    fine = 0

FineService → IssueService : fineAmount

IssueService → IssueRepository : updateReturnDetails()
IssueRepository → Database : UPDATE ISSUE_RECORDS

IssueService → BookRepository : incrementAvailableCopies()
BookRepository → Database : UPDATE BOOKS

IssueService → BookController : Return Success + Fine Info
BookController → Member : Return Confirmation

Key Patterns Used:
- Strategy Pattern (Fine Calculation)
- Template Method (Return Processing Flow)
- Repository Pattern

---

=========================================================
PHASE 5: Reporting & Audit
=========================================================

Admin → ReportController : getIssuedBooks()
ReportController → ReportService : fetchIssuedRecords()
ReportService → IssueRepository : findAll()
IssueRepository → Database : SELECT * FROM ISSUE_RECORDS
Database → IssueRepository : records
ReportService → ReportController : response
ReportController → Admin : Issued Book Report

Admin → ReportController : getOverdueBooks()
ReportController → ReportService : findOverdue()
ReportService → IssueRepository : findByStatus(OVERDUE)
IssueRepository → Database : SELECT OVERDUE
Database → IssueRepository : records
ReportController → Admin : Overdue List

Key Patterns Used:
- Repository Pattern
- Service Layer Pattern
- DTO Pattern


---

# Flow Summary

| Phase | Description | Key Patterns Used |
|-------|------------|------------------|
| 1. Authentication | User login & token generation | Service Layer, Repository |
| 2. Search | Book search & availability check | Repository, DTO |
| 3. Issue Book | Validate & create issue record | Transaction, Service Layer |
| 4. Return Book | Fine calculation & update records | Strategy, Template Method |
| 5. Reporting | View issued & overdue books | Repository, DTO |
