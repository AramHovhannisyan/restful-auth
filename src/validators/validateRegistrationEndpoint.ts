import Joi from "joi";
import { RegisterUserRequestType } from '../types/RegistrationRequestTypes';

const RegisterUserRequestSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4)
});

const registrationEndpointValidator = (schema: any) => (payload: RegisterUserRequestType) => schema.validate(payload, {
  abortEarly: false,
  allowUnknown: true,
});

const validateGetRegistrationRequest = registrationEndpointValidator(RegisterUserRequestSchema);

export { validateGetRegistrationRequest };
