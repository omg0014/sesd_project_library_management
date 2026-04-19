import mongoose, { Schema, Document } from 'mongoose';

const userOptions = { discriminatorKey: 'role', collection: 'users' };

export interface IUser extends Document {
    name: string;
    email: string;
    phoneNumber?: string;
    password?: string; // Optional for when sending data back
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    password: { type: String, required: true, select: false }, // don't return password by default
}, { ...userOptions, timestamps: true });

export const User = mongoose.model<IUser>('User', UserSchema);

// Admin Discriminator
export interface IAdmin extends IUser {
}

const AdminSchema = new Schema({}, userOptions);
export const Admin = User.discriminator<IAdmin>('ADMIN', AdminSchema);

// Member Discriminator
export interface IMember extends IUser {
}

const MemberSchema = new Schema({}, userOptions);
export const Member = User.discriminator<IMember>('MEMBER', MemberSchema);
