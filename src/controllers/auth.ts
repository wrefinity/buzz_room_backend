import { Request, Response } from 'express';
import userService from '../services/user.services';
import { validateUser, validateUserUpdate } from '../validations/schemas/user.schema';
import encrypt from '../utils/encrypt';

class AuthRepo {
    createUser = async (req: Request, res: Response) => {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
    
        try {
            const password = encrypt(req.body.password)
            const user = await userService.createUser({...req.body, password});
            return res.status(201).json(user);
        } catch (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
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