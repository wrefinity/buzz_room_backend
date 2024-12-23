import { Schema, model, Document } from 'mongoose';
import crypto from 'crypto'; // For generating unique referral codes

export const UserRoles = ['admin', 'user'];

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  tokens: number;
  isVerified: boolean
  completedTasks: Schema.Types.ObjectId[];
  invites: Schema.Types.ObjectId[]; // List of users this user has invited
  invitedBy: Schema.Types.ObjectId | null; // User who invited this user
  referralCode: string; // Unique referral code for the user
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: UserRoles, default: 'user' },
  tokens: { type: Number, default: 0 },
  isVerified: {type: Boolean, default: false},
  completedTasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],

  invites: [{ type: Schema.Types.ObjectId, ref: 'User' }], // References to other users this user invited
  invitedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null }, // Reference to the user who invited this user
  referralCode: { type: String, unique: true } // Unique referral code for the user
});

// Pre-save hook to generate a unique referral code
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.referralCode) {
    let uniqueCode = false;
    let generatedCode = '';

    while (!uniqueCode) {
      generatedCode = crypto.randomBytes(4).toString('hex'); 
      const existingUser = await model<IUser>('User').findOne({ referralCode: generatedCode });
      if (!existingUser) {
        uniqueCode = true; // Code is unique
      }
    }

    this.referralCode = generatedCode; 
  }
  next();
});

export default model<IUser>('User', UserSchema);
