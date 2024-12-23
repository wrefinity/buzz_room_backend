import Joi from 'joi';


export const validateBank = (data: any) => {
  const schema = Joi.object({
    accountNumber: Joi.string().required().messages({
      'string.base': 'Account number must be a string.',
      'string.empty': 'Account number cannot be empty.',
      'any.required': 'Account number is required.',
    }),
    accountName: Joi.string().required().messages({
      'string.base': 'Account name must be a string.',
      'string.empty': 'Account name cannot be empty.',
      'any.required': 'Account name is required.',
    }),
    currency: Joi.string().required().messages({
      'string.base': 'Currency must be a string.',
      'string.empty': 'Currency cannot be empty.',
      'any.required': 'Currency is required.',
    }),
  });

  return schema.validate(data);
};

// Validation schema for updating a bank
export const validateBankUpdate = (data: any) => {
  const schema = Joi.object({
    accountNumber: Joi.string().optional().messages({
      'string.base': 'Account number must be a string.',
      'string.empty': 'Account number cannot be empty.',
    }),
    accountName: Joi.string().optional().messages({
      'string.base': 'Account name must be a string.',
      'string.empty': 'Account name cannot be empty.',
    }),
    currency: Joi.string().optional().messages({
      'string.base': 'Currency must be a string.',
      'string.empty': 'Currency cannot be empty.',
    }),
  });

  return schema.validate(data);
};
