const Joi = require("@hapi/joi");
const registerValidation = (data) => {
    const schema = {
        name: Joi.string()
            .min(3)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        confirmPassword: Joi.any()
            .valid(Joi.ref("password"))
            .required()
    };
    return Joi.validate(data, schema);
};
const loginValidation = (data) => {
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(data, schema);
};
module.exports = { registerValidation, loginValidation };
//# sourceMappingURL=validation.js.map