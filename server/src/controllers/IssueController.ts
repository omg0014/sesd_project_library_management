import { Request, Response } from 'express';
import { IssueService } from '../services/IssueService';
import { AuthRequest } from '../middlewares/auth.middleware';

export class IssueController {
    private issueService = new IssueService();

    issueBook = async (req: AuthRequest, res: Response) => {
        try {
            const { bookId, requestedDueDate } = req.body;
            const issue = await this.issueService.issueBook(req.user.id, bookId, requestedDueDate);
            res.status(201).json({ success: true, data: issue });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    };

    returnBook = async (req: AuthRequest, res: Response) => {
        try {
            const { bookId } = req.body;
            const result = await this.issueService.returnBook(req.user.id, bookId);
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    };

    getMyIssuedBooks = async (req: AuthRequest, res: Response) => {
        try {
            const issues = await this.issueService.getMyIssuedBooks(req.user.id);
            res.status(200).json({ success: true, data: issues });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    };

    getAllIssuedBooks = async (req: Request, res: Response) => {
        try {
            const issues = await this.issueService.getAllIssuedBooks();
            res.status(200).json({ success: true, data: issues });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    };
}
