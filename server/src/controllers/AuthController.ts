import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
    private authService = new AuthService();

    register = async (req: Request, res: Response) => {
        try {
            const { name, email, password, phoneNumber, role } = req.body;
            const user = await this.authService.register({ name, email, password, phoneNumber }, role || 'MEMBER');
            res.status(201).json({ success: true, data: user });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const data = await this.authService.login(email, password);
            res.status(200).json({ success: true, data });
        } catch (error: any) {
            res.status(401).json({ success: false, error: error.message });
        }
    };
    
    getUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.authService.getAllUsers();
            res.status(200).json({ success: true, data: users });
        } catch (error: any) {
            res.status(400).json({ success: false, error: error.message });
        }
    }
}
