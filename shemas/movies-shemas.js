import Joi from 'joi';

export const movieAddShema = Joi.object({
	title: Joi.string().required(),
	director: Joi.string().required(),
});

export const movieUpdateShema = Joi.object({
	title: Joi.string(),
	director: Joi.string(),
});