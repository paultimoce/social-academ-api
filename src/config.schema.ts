import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
    STAGE: Joi.string().default('dev'),
    MONGO_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().default('3600'),
    PORT: Joi.number().default(3000),
    SWAGGER_URL: Joi.string().default('api')
});