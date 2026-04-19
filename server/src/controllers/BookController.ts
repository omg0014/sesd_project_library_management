import { Request, Response } from 'express';
import { BookService } from '../services/BookService';

export class BookController {
    private bookService = new BookService();

    addBook = async (req: Request, res: Response) => {
        try {
            const book = await this.bookService.addBook(req.body);
            res.status(201).json({ success: true, data: book });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    };

    updateBook = async (req: Request, res: Response) => {
        try {
            const book = await this.bookService.updateBook(req.params.id as string, req.body);
            res.status(200).json({ success: true, data: book });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    };

    deleteBook = async (req: Request, res: Response) => {
        try {
            await this.bookService.deleteBook(req.params.id as string);
            res.status(200).json({ success: true, data: {} });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    };

    searchBooks = async (req: Request, res: Response) => {
        try {
            const query = req.query.q as string || '';
            const books = await this.bookService.searchBooks(query);
            res.status(200).json({ success: true, data: books });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    };

    checkAvailability = async (req: Request, res: Response) => {
        try {
            const copies = await this.bookService.checkAvailability(req.params.id as string);
            res.status(200).json({ success: true, data: { availableCopies: copies } });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    };
}
