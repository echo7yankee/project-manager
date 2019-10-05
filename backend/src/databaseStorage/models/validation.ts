//Validation
import Joi from '@hapi/joi';
import { LoginUser, RegisterUser } from '../../TSTypes/User';

export function registerValidation(data: RegisterUser) {
    const schema: RegisterUser = {
        confirmPassword: Joi.any()
            .valid(Joi.ref('password'))
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        firstName: Joi.string()
            .min(2)
            .required(),
        lastName: Joi.string()
            .min(2)
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        role: Joi.string()
    };

    return Joi.validate(data, schema);
};

export function loginValidation(data: LoginUser) {
    const schema: LoginUser = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .required()
    };

    return Joi.validate(data, schema);
};
