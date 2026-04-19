export class FineService {
    private readonly finePerDay = 10;

    calculateFine(dueDate: Date, returnDate: Date): number {
        if (returnDate > dueDate) {
            const diffTime = Math.abs(returnDate.getTime() - dueDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            return diffDays * this.finePerDay;
        }
        return 0;
    }
}
