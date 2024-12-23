import { Schema, model, Document } from 'mongoose';
import User from './users';

interface ITokenVerification extends Document {
  userId: Schema.Types.ObjectId; // Reference to the user
  token: string; // Verification token
  expiresAt: Date; // Expiry time of the token
}

const TokenVerificationSchema = new Schema<ITokenVerification>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});

// Ensure tokens are automatically removed after expiration
TokenVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Middleware to handle token expiration and conditional user deletion
TokenVerificationSchema.post('findOneAndDelete', async function (doc: ITokenVerification) {
  if (doc) {
    const user = await User.findById(doc.userId);

    // Delete the user only if they are not verified
    if (user && !user.isVerified) {
      await User.findByIdAndDelete(doc.userId);
    }
  }
});

export default model<ITokenVerification>('TokenVerification', TokenVerificationSchema);
