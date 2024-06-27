import Joi from "joi";
import { RegisterUserRequestType } from '../types/RegistrationRequestTypes';

// Registration endpoint schema
const RegisterUserRequestSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const registrationEndpointValidator = (schema: any) => (payload: RegisterUserRequestType) => schema.validate(payload, {
  abortEarly: false,
  allowUnknown: true,
});

const validateRegistrationRequest = registrationEndpointValidator(RegisterUserRequestSchema);

export { validateRegistrationRequest };
