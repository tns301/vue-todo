const Joi = require('@hapi/joi');

const validateRegister = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(6).required(),
		email: Joi.string().min(6).email().required(),
		password: Joi.string().min(6).max(2048).required(),
	})

	return schema.validate(data)
}

const loginRegister = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).email().required(),
		password: Joi.string().min(6).max(2048).required(),
	})

	return schema.validate(data)
}

module.exports.validateRegister = validateRegister;
module.exports.loginRegister = loginRegister;