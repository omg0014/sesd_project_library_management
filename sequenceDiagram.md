# Sequence Diagram – Issue & Return Flow

## Issue Book

Member -> AuthController: login(credentials)
AuthController -> AuthService: validateUser()
AuthService -> DB: fetchUser()
AuthService -> AuthController: return token
Member -> BookController: requestIssue(bookId, token)
BookController -> BookService: checkAvailability(bookId)
BookService -> Repository: fetchBook()
Repository -> BookService: book data
BookService -> IssueService: createIssueRecord(memberId, bookId)
IssueService -> IssueRepository: save()
IssueService -> BookRepository: decrement availableCopies
BookService -> BookController: success
BookController -> Member: Book Issued

## Return Book

Member -> BookController: returnBook(bookId, token)
BookController -> BookService: calculateFine(memberId, bookId)
BookService -> IssueRepository: fetchIssue()
BookService -> FineService: computeFine()
FineService -> BookRepository: increment availableCopies
BookController -> Member: Return Success & Fine Info
