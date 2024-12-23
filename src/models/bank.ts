import mongoose, { Schema, model, Document } from 'mongoose';
import { ObjectId } from 'mongoose';

export interface IBank extends Document {
  accountNumber: string;
  accountName: string;
  currency: string;
  user: ObjectId; // Reference to the user
  updatedAt: Date;
  createdAt: Date;
}

const BankSchema = new Schema<IBank>(
  {
    accountNumber: { type: String, required: true },
    accountName: { type: String, required: true },
    currency: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.models.Bank || model<IBank>('Bank', BankSchema);
