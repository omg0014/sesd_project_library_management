import { BookRepository } from '../repositories/BookRepository';

export class BookService {
    private bookRepository = new BookRepository();
    
    async addBook(bookData: any) {
        // Ensure totalCopies == availableCopies initially
        bookData.availableCopies = bookData.totalCopies;
        return await this.bookRepository.create(bookData);
    }

    async updateBook(id: string, updateData: any) {
        return await this.bookRepository.update(id, updateData);
    }

    async deleteBook(id: string) {
        return await this.bookRepository.delete(id);
    }

    async searchBooks(query: string) {
        if (!query) return await this.getAllBooks();
        return await this.bookRepository.findByTitleOrAuthor(query);
    }

    async checkAvailability(id: string) {
        const book = await this.bookRepository.findById(id);
        if (!book) throw new Error('Book not found');
        return book.availableCopies;
    }
    
    async getAllBooks() {
        return await this.bookRepository.findAll();
    }
}
