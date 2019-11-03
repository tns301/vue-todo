const Joi = require('@hapi/joi');

const validateRegister = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().min(6).required(),
		lastName: Joi.string().min(6).required(),
		email: Joi.string().min(6).email().required(),
		password: Joi.string().min(6).max(2048).required(),
		passwordConfirm: Joi.string().min(6).max(2048).required(),
		avatar: Joi.any()
	})

	return schema.validate(data)
}

module.exports.validateRegister = validateRegister;