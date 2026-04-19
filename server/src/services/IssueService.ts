import { IssueRecordRepository } from '../repositories/IssueRecordRepository';
import { BookRepository } from '../repositories/BookRepository';
import { FineService } from './FineService';
import { IssueStatus } from '../models/IssueRecord';

export class IssueService {
    private issueRepository = new IssueRecordRepository();
    private bookRepository = new BookRepository();
    private fineService = new FineService();

    async issueBook(userId: string, bookId: string, requestedDueDate?: Date) {
        const book = await this.bookRepository.findById(bookId);
        if (!book) throw new Error('Book not found');
        if (book.availableCopies <= 0) throw new Error('No copies available');

        const activeIssue = await this.issueRepository.findActiveIssue(userId, bookId);
        if (activeIssue) throw new Error('Book already issued to user');

        const issueDate = new Date();
        let dueDate = new Date();
        if (requestedDueDate) {
            dueDate = new Date(requestedDueDate);
        } else {
            dueDate.setDate(dueDate.getDate() + 14);
        }

        const newIssue = await this.issueRepository.saveIssueRecord({
            userId: userId as any,
            bookId: bookId as any,
            issueDate,
            dueDate
        });

        await this.bookRepository.decrementAvailableCopies(bookId);

        return newIssue;
    }

    async returnBook(userId: string, bookId: string) {
        const activeIssue = await this.issueRepository.findActiveIssue(userId, bookId);
        if (!activeIssue) throw new Error('Active issue record not found for this book');

        const returnDate = new Date();
        const fineAmount = this.fineService.calculateFine(activeIssue.dueDate, returnDate);
        
        await this.issueRepository.updateReturnDetails(
            activeIssue._id as unknown as string,
            returnDate,
            fineAmount,
            IssueStatus.RETURNED
        );

        await this.bookRepository.incrementAvailableCopies(bookId);

        return { fineAmount, returnDate, status: IssueStatus.RETURNED };
    }
    
    async getMyIssuedBooks(userId: string) {
        return await this.issueRepository.findByUserId(userId);
    }
    
    async getAllIssuedBooks() {
        return await this.issueRepository.findAll();
    }
}
