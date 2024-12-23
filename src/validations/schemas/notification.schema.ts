import Joi from 'joi';

export const validateNotification = (notification: any) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        icon: Joi.string().optional()
    });

    return schema.validate(notification);
};
