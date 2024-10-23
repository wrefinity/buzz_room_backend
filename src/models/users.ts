import { Schema, model, Document } from 'mongoose';

export const UserRoles = ['admin', 'user'];

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    tokens: number;
    completedTasks: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: UserRoles, default: 'user' },
    tokens: { type: Number, default: 0 },
    completedTasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

export default model<IUser>('User', UserSchema);
