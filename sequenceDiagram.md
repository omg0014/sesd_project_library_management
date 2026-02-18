# Sequence Diagram - Issue Book Flow

Main Flow: Member Issues a Book

1. Member logs into system
2. Member searches for a book
3. Member clicks "Issue Book"

Sequence:

Member -> Controller: requestIssueBook(bookId)
Controller -> Service: issueBook(memberId, bookId)
Service -> Repository: findBookById(bookId)
Repository -> Service: return Book

Service -> Repository: checkIfAlreadyIssued(memberId, bookId)
Repository -> Service: return status

Service -> Repository: createIssueRecord()
Service -> Repository: updateBookAvailability()

Service -> Controller: Issue Success
Controller -> Member: Success Response

Alternative Flow:
If book not available:
Service -> Controller: Book Not Available
Controller -> Member: Error Message
