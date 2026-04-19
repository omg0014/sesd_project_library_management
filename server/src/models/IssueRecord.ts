import mongoose, { Schema, Document } from 'mongoose';

export enum IssueStatus {
    ISSUED = 'ISSUED',
    RETURNED = 'RETURNED',
    OVERDUE = 'OVERDUE'
}

export interface IIssueRecord extends Document {
    userId: mongoose.Types.ObjectId;
    bookId: mongoose.Types.ObjectId;
    issueDate: Date;
    dueDate: Date;
    returnDate?: Date;
    fineAmount: number;
    status: string;
}

const IssueRecordSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    issueDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date },
    fineAmount: { type: Number, default: 0.00 },
    status: { type: String, enum: Object.values(IssueStatus), default: IssueStatus.ISSUED }
});

export const IssueRecord = mongoose.model<IIssueRecord>('IssueRecord', IssueRecordSchema);
