import { Request, Response } from 'express';
import { bankService } from '../services/bank.services';
import { validateBank, validateBankUpdate } from '../validations/schemas/bank.schema';
import { IBank } from '../models/bank';
import { CustomRequest } from '../utils/types';

class BankRepo {
  // Create a new bank account
  createBank = async (req: CustomRequest, res: Response) => {
    const { error, value } = validateBank(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
      // Add the currently logged-in user's ID to the bank data
      const bankData: IBank = { ...req.body, user: req.user._id }; 
      const bank = await bankService.createBank(bankData);
      return res.status(201).json(bank);
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  // Get all bank accounts for the logged-in user
  getBanks = async (req: CustomRequest, res: Response) => {
    try {
      const banks = await bankService.getBanksByUser(req.user._id); 
      return res.status(200).json(banks);
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  // Get a single bank account by its ID
  getBankById = async (req: CustomRequest, res: Response) => {
    try {
      const bank = await bankService.getBankById(req.params.id);
      if (!bank) return res.status(404).json({ message: 'Bank not found' });
      // Ensure the bank belongs to the logged-in user
      if (bank.user.toString() !== req.user._id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      return res.status(200).json(bank);
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  // Update a bank account
  updateBank = async (req: CustomRequest, res: Response) => {
    const { error } = validateBankUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
      const bank = await bankService.getBankById(req.params.id);
      if (!bank) return res.status(404).json({ message: 'Bank not found' });
      // Ensure the bank belongs to the logged-in user
      if (bank.user.toString() !== req.user._id) {
        return res.status(403).json({ message: 'Access denied' });
      }

      const updatedBank = await bankService.updateBank(req.params.id, req.body);
      return res.status(200).json(updatedBank);
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  // Delete a bank account
  deleteBank = async (req: CustomRequest, res: Response) => {
    try {
      const bank = await bankService.getBankById(req.params.id);
      if (!bank) return res.status(404).json({ message: 'Bank not found' });
      // Ensure the bank belongs to the logged-in user
      if (bank.user.toString() !== req.user._id) {
        return res.status(403).json({ message: 'Access denied' });
      }

      await bankService.deleteBank(req.params.id);
      return res.status(200).json({ message: 'Bank deleted successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
}

export default new BankRepo();
