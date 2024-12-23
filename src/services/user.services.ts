import User, { IUser } from '../models/users';
import TokenVerification from '../models/verifcation_token';
import { generateCode } from '../utils/randomcode';
import { verificationTemps } from '../utils/templates';
import Mailer from "../utils/emailer"
class UserService {
    createUser = async (userData: IUser): Promise<IUser> => {
        const user = new User(userData);

        // Save the user to the database
        const savedUser = await user.save();

        // Generate a token for verification
        const token = generateCode();
        const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

        // Create a TokenVerification document
        await TokenVerification.create({
            userId: savedUser._id,
            token,
            expiresAt,
        });

        const temp = verificationTemps(token);
        await Mailer(userData.email, "ACCOUNT VERIFICATION", temp);

        // Return the saved user
        return savedUser;
    };

    getRerredBy = async (referralCode: String) => {
        return await User.findOne({ referralCode });
    }
    getUserByEmail = async (email: String) => {
        return await User.findOne({ email });
    }

    getUsers = async (): Promise<IUser[]> => {
        return await User.find().populate('completedTasks');
    }

    getUserById = async (userId: string) => {
        return await User.findById(userId).populate('completedTasks');
    }

    updateUser = async (userId: string, userData: Partial<IUser>): Promise<IUser | null> => {
        return await User.findByIdAndUpdate(userId, userData, { new: true });
    }

    deleteUser = async (userId: string): Promise<IUser | null> => {
        return await User.findByIdAndDelete(userId);
    }

    async findUserByEmail(email: string) {
        return User.findOne({ email });
      }
    /**
     * Verify user by email and token, then delete the token
     * @param email - The email of the user
     * @param token - The verification token
     * @returns A message indicating the result of the operation
     */
    verifyUserByEmail = async (email: string, token: string) => {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('User with this email does not exist');
        }

        // Ensure the user is not already verified
        if (user.isVerified) {
            throw new Error('User is already verified');
        }

        // Find the token verification document
        const tokenRecord = await TokenVerification.findOne({ userId: user._id, token });

        if (!tokenRecord) {
            throw new Error('Invalid or expired token');
        }

        // Update the user as verified
        await User.findByIdAndUpdate(user._id, { isVerified: true });

        // Update the referring user by adding the current user to their "invites" list
        if (user.invitedBy) {
            await User.findByIdAndUpdate(
                user.invitedBy,
                { $push: { invites: user._id } }
            );
        }

        // Delete the token verification record
        await TokenVerification.findByIdAndDelete(tokenRecord._id);

        return user;
    };
}

export default new UserService();