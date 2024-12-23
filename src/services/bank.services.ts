import Bank, { IBank } from '../models/bank';

class BankService {
  // Create a new bank
  createBank = async (bankData: IBank): Promise<IBank> => {
    const bank = new Bank(bankData);
    return await bank.save();
  };

  // Get all banks for a specific user
  getBanksByUser = async (userId: string): Promise<IBank[]> => {
    return await Bank.find({ user: userId }).populate('user', 'username email'); // Populates user info
  };

  // Get a specific bank by its ID
  getBankById = async (bankId: string): Promise<IBank | null> => {
    return await Bank.findById(bankId).populate('user', 'username email');
  };

  // Update a bank by its ID
  updateBank = async (bankId: string, bankData: Partial<IBank>): Promise<IBank | null> => {
    return await Bank.findByIdAndUpdate(bankId, bankData, { new: true }).populate(
      'user',
      'name email'
    );
  };

  // Delete a bank by its ID
  deleteBank = async (bankId: string): Promise<IBank | null> => {
    return await Bank.findByIdAndDelete(bankId);
  };

  // Delete all banks for a specific user (if required)
  deleteBanksByUser = async (userId: string): Promise<void> => {
    await Bank.deleteMany({ user: userId });
  };
}

export const bankService = new BankService();
