import User, { IUser } from '../models/users';

class UserService {
    createUser = async (userData: IUser): Promise<IUser> =>{
        const user = new User(userData);
        return await user.save();
    }

    getUsers = async (): Promise<IUser[]> =>{
        return await User.find().populate('completedTasks');
    }

    getUserById = async (userId: string) =>{
        return await User.findById(userId).populate('completedTasks');
    }

    updateUser = async (userId: string, userData: Partial<IUser>): Promise<IUser | null> =>{
        return await User.findByIdAndUpdate(userId, userData, { new: true });
    }

    deleteUser = async (userId: string): Promise<IUser | null> =>{
        return await User.findByIdAndDelete(userId);
    }

    async findUserByEmail(email: string) {
        return User.findOne({ email });
      }
}

export default  new UserService();