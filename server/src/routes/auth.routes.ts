import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users', protect, authorize('ADMIN'), authController.getUsers);

export default router;
