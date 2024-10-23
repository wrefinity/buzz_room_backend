import Joi from 'joi';
import { SocialPlatform } from '../../models/task';

export const validateTask = (task: any) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        url: Joi.string().uri().optional(),
        socialPlatform: Joi.string().valid(...Object.values(SocialPlatform)).optional(),
        rewardTokens: Joi.number().required()
    });
    return schema.validate(task);
};

export const validateTaskUpdate = (task: any) => {
    const schema = Joi.object({
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        url: Joi.string().uri().optional(),
        socialPlatform: Joi.string().valid(...Object.values(SocialPlatform)).optional(),
        rewardTokens: Joi.number().optional()
    });
    return schema.validate(task);
};
