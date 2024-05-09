const Joi = require("joi");

module.exports.userSchema = Joi.object({
    user: Joi.object({
        name: Joi.string().required(),
        dob: Joi.date().required(),
        contactno: Joi.number().required(),
        email: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required()
    }).required()
});