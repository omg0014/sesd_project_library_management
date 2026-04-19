import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';

export class AuthService {
    private userRepository = new UserRepository();

    async register(userData: any, role: string) {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        userData.password = hashedPassword;
        
        if (role === 'ADMIN') {
            return await this.userRepository.createAdmin(userData);
        }
        return await this.userRepository.createMember(userData);
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password!);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign(
            { id: (user as any)._id, role: user.role, name: user.name },
            process.env.JWT_SECRET || 'super_secret_jwt_key_here',
            { expiresIn: '1d' }
        );
        return { user, token };
    }
    
    async getAllUsers() {
        return await this.userRepository.findAllMembers();
    }
}
