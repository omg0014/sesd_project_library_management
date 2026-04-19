import { Book, IBook } from '../models/Book';

export class BookRepository {
    async findById(id: string): Promise<IBook | null> {
        return await Book.findById(id);
    }

    async findAll(): Promise<IBook[]> {
        return await Book.find();
    }

    async findByTitleOrAuthor(query: string): Promise<IBook[]> {
        return await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } }
            ]
        });
    }

    async create(bookData: Partial<IBook>): Promise<IBook> {
        return await Book.create(bookData);
    }

    async update(id: string, updateData: Partial<IBook>): Promise<IBook | null> {
        return await Book.findByIdAndUpdate(id, updateData, { new: true });
    }

    async delete(id: string): Promise<IBook | null> {
        return await Book.findByIdAndDelete(id);
    }
    
    async decrementAvailableCopies(id: string): Promise<IBook | null> {
        return await Book.findByIdAndUpdate(id, { $inc: { availableCopies: -1 } }, { new: true });
    }

    async incrementAvailableCopies(id: string): Promise<IBook | null> {
        return await Book.findByIdAndUpdate(id, { $inc: { availableCopies: 1 } }, { new: true });
    }
}
