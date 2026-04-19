import { IssueRecord, IIssueRecord, IssueStatus } from '../models/IssueRecord';

export class IssueRecordRepository {
    async saveIssueRecord(recordData: Partial<IIssueRecord>): Promise<IIssueRecord> {
        return await IssueRecord.create(recordData);
    }

    async findActiveIssue(userId: string, bookId: string): Promise<IIssueRecord | null> {
        return await IssueRecord.findOne({
            userId,
            bookId,
            status: IssueStatus.ISSUED
        });
    }

    async findActiveIssueById(issueId: string): Promise<IIssueRecord | null> {
        return await IssueRecord.findOne({
            _id: issueId,
            status: IssueStatus.ISSUED
        });
    }

    async findAll(): Promise<IIssueRecord[]> {
        return await IssueRecord.find().populate('userId').populate('bookId');
    }

    async findByUserId(userId: string): Promise<IIssueRecord[]> {
        return await IssueRecord.find({ userId }).populate('bookId');
    }

    async findByStatus(status: IssueStatus): Promise<IIssueRecord[]> {
        return await IssueRecord.find({ status }).populate('userId', 'name email').populate('bookId', 'title author');
    }

    async updateReturnDetails(issueId: string, returnDate: Date, fineAmount: number, status: IssueStatus): Promise<IIssueRecord | null> {
        return await IssueRecord.findByIdAndUpdate(issueId, { returnDate, fineAmount, status }, { new: true });
    }
}
