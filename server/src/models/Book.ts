import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    category: string;
    totalCopies: number;
    availableCopies: number;
    createdAt: Date;
    updatedAt: Date;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String },
    totalCopies: { type: Number, required: true, min: 0 },
    availableCopies: { type: Number, required: true, min: 0 },
}, { timestamps: true });

export const Book = mongoose.model<IBook>('Book', BookSchema);
