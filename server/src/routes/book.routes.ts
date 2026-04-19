import { Router } from 'express';
import { BookController } from '../controllers/BookController';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();
const bookController = new BookController();

router.get('/search', protect, bookController.searchBooks);
router.get('/:id/availability', protect, bookController.checkAvailability);

// Admin only routes
router.post('/', protect, authorize('ADMIN'), bookController.addBook);
router.put('/:id', protect, authorize('ADMIN'), bookController.updateBook);
router.delete('/:id', protect, authorize('ADMIN'), bookController.deleteBook);

export default router;
