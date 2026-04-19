import { User, IUser, Admin, Member } from '../models/User';

export class UserRepository {
    async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email }).select('+password');
    }

    async findById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }

    async createAdmin(userData: Partial<IUser>): Promise<IUser> {
        return await Admin.create(userData);
    }

    async createMember(userData: Partial<IUser>): Promise<IUser> {
        return await Member.create(userData);
    }

    async findAllMembers(): Promise<IUser[]> {
        return await Member.find();
    }
}
