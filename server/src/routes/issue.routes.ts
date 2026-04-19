import { Router } from 'express';
import { IssueController } from '../controllers/IssueController';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();
const issueController = new IssueController();

// Member routines (can also let admin use member routing if necessary, but strictly isolating here based on OOP)
router.post('/issue', protect, authorize('MEMBER'), issueController.issueBook);
router.post('/return', protect, authorize('MEMBER'), issueController.returnBook);
router.get('/my-issues', protect, authorize('MEMBER'), issueController.getMyIssuedBooks);

// Admin routines
router.get('/all', protect, authorize('ADMIN'), issueController.getAllIssuedBooks);

export default router;
