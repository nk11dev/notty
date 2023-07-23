import { z } from 'zod';

import { UserRole } from '@/common/constants/auth.constants';

const messages = {
  required: 'Required',
  min: (val: number) => `Must be more than ${val} characters`,
  max: (val: number) => `Must be less than ${val} characters`,
  invalidType: (validType: string) => `Must be a ${validType}`,
};

// Fields schemas
const usernameFieldSchema = z.string({
  required_error: messages.required,
  invalid_type_error: messages.invalidType('string')
})
  .nonempty(messages.required)
  .max(30, messages.max(30));

const emailFieldSchema = z.string({
  required_error: messages.required,
})
  .nonempty(messages.required)
  .email('Invalid email format');

const passwordFieldSchemaDefault = z.string({
  required_error: messages.required,
  invalid_type_error: messages.invalidType('string')
})
  .nonempty(messages.required);

const passwordFieldSchemaMinMax = passwordFieldSchemaDefault
  .min(6, messages.min(6))
  .max(30, messages.max(30));

const passwordConfirmFieldSchema = z.string({
  required_error: messages.required,
  invalid_type_error: messages.invalidType('string')
})
  .nonempty(messages.required);

const roleFieldSchema = z.nativeEnum(UserRole);

// Payload schemas
export const userRegisterPayloadSchema = z.object({
  username: usernameFieldSchema,
  email: emailFieldSchema,
  password: passwordFieldSchemaMinMax,
  passwordConfirm: passwordConfirmFieldSchema,
  role: roleFieldSchema.optional(),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export const userCreatePayloadSchema = z.object({
  username: usernameFieldSchema,
  email: emailFieldSchema,
  password: passwordFieldSchemaMinMax,
  role: roleFieldSchema,
});

export const userUpdatePayloadSchema = z.object({
  username: usernameFieldSchema.optional(),
  email: emailFieldSchema.optional(),
  password: passwordFieldSchemaMinMax.optional(),
});

export const userLoginPayloadSchema = z.object({
  email: emailFieldSchema,
  password: passwordFieldSchemaDefault,
});

// Request schemas
export const userRegisterRequestSchema = z.object({
  body: userRegisterPayloadSchema
});

export const userCreateRequestSchema = z.object({
  body: userCreatePayloadSchema
});

export const userUpdateRequestSchema = z.object({
  body: userUpdatePayloadSchema
});

export const userLoginRequestSchema = z.object({
  body: userLoginPayloadSchema
});