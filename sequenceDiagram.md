# Sequence Diagram – Main Flow

----------------------------------
ISSUE BOOK FLOW
----------------------------------

Member → AuthController : login()
AuthController → AuthService : validateUser()
AuthService → UserRepository : findByEmail()
UserRepository → AuthService : user
AuthService → AuthController : token

Member → BookController : issueBook(bookId)
BookController → BookService : checkAvailability()
BookService → BookRepository : findById()
BookRepository → BookService : book

BookService → IssueService : createIssueRecord()
IssueService → IssueRepository : save()
IssueService → BookRepository : updateAvailableCopies()

BookController → Member : Issue Success

----------------------------------
RETURN BOOK FLOW
----------------------------------

Member → BookController : returnBook(bookId)
BookController → BookService : getIssueRecord()
BookService → IssueRepository : findActiveIssue()

BookService → FineService : calculateFine()
FineService → BookService : fineAmount

BookService → IssueRepository : updateReturnDetails()
BookService → BookRepository : increaseAvailableCopies()

BookController → Member : Return Success + Fine Info
