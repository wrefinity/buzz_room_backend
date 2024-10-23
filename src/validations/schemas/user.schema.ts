import Joi from 'joi';
import { UserRoles } from '../../models/users';

export const validateUser = (user: any) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid(...UserRoles).optional(),
        tokens: Joi.number().optional(),
        completedTasks: Joi.array().items(Joi.string()).optional()
    });
    return schema.validate(user);
};

export const validateUserUpdate = (user: any) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().min(6).optional(),
        role: Joi.string().valid(...UserRoles).optional(),
        tokens: Joi.number().optional(),
        completedTasks: Joi.array().items(Joi.string()).optional()
    });
    return schema.validate(user);
};