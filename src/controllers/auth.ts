import { Request, Response } from 'express';
import userService from '../services/user.services';
import { validateUser, validateVerificationToken, validateLogin, validateUserUpdate } from '../validations/schemas/user.schema';
import encrypt, { comparePassword } from '../utils/encrypt';
import { Jtoken } from "../middlewares/Jtoken";
import { JWT_SECRET } from "../secrets";


class AuthRepo {
    createUser = async (req: Request, res: Response): Promise<Response> => {
        // Validate incoming user data
        const { error, value } = validateUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        try {
            const { password, referralCode, ...userData } = value;

            // Encrypt the password
            const encryptedPassword = encrypt(password);

            // Handle referral code if present
            let invitedBy = null;
            if (referralCode) {
                const referredUser = await userService.getRerredBy(referralCode);
                if (referredUser) {
                    invitedBy = referredUser._id;  // Get the ID of the referred user
                } else {
                    return res.status(400).json({ message: 'Referral code is invalid' });
                }
            }

            // Create the user
            const user = await userService.createUser({ ...userData, password: encryptedPassword, invitedBy });

            // Respond with the created user data
            return res.status(201).json(user);
        } catch (err) {
            // General error handling
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
    };
    verifyaccount = async (req: Request, res: Response) => {

        const { error, value } = validateVerificationToken(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        try {
            const message = await userService.verifyUserByEmail(value.email, value.token);
            return res.status(200).json({ message });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    login = async (req: Request, res: Response): Promise<Response> => {
        // Validate login input
        const { error, value } = validateLogin(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = value;

        try {
            // Find user by email
            const user = await userService.getUserByEmail(email);

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Check if the user is verified
            if (!user.isVerified) {
                return res.status(401).json({
                    message: 'Your account is not verified. Please check your email and verify your account using the verification token.'
                });
            }

            // Compare provided password with the stored hashed password
            const isPasswordValid = await comparePassword(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const jToken: Jtoken = new Jtoken(JWT_SECRET);
            const token = jToken.createToken({
                _id: String(user._id),
                role: user.role,
                email: user.email
            });

            // Respond with the token
            return res.status(200).json({ message: 'Login successful', user, token });
        } catch (err) {
            // Handle unexpected errors
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
    };
    getUsers = async (req: Request, res: Response) => {
        try {
            const users = await userService.getUsers();
            return res.status(200).json(users);
        } catch (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
    getUserById = async (req: Request, res: Response) => {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
    updateUser = async (req: Request, res: Response) => {
        const { error } = validateUserUpdate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        try {
            const updatedUser = await userService.updateUser(req.params.id, req.body);
            if (!updatedUser) return res.status(404).json({ message: 'User not found' });
            return res.status(200).json(updatedUser);
        } catch (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
    deleteUser = async (req: Request, res: Response) => {
        try {
            const deletedUser = await userService.deleteUser(req.params.id);
            if (!deletedUser) return res.status(404).json({ message: 'User not found' });
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
}

export default new AuthRepo()