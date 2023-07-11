import { z } from 'zod';

const messages = {
  required: 'Required',
  min: (val: number) => `Must be more than ${val} characters`,
  max: (val: number) => `Must be less than ${val} characters`,
  invalidType: (validType: string) => `Must be a ${validType}`,
};

const userEmailSchema = z.string({
  required_error: messages.required,
})
  .nonempty(messages.required)
  .email('Invalid email format');

const userPasswordSchemaDefault = z.string({
  required_error: messages.required,
  invalid_type_error: messages.invalidType('string')
})
  .nonempty(messages.required);

const userPasswordSchemaMinMax = userPasswordSchemaDefault
  .min(6, messages.min(6))
  .max(20, messages.max(20));

const userUsernameSchema = z.string({
  invalid_type_error: messages.invalidType('string')
})
  .max(20, messages.max(20));

export const userCreatePayloadSchema = z.object({
  email: userEmailSchema,
  password: userPasswordSchemaMinMax,
  username: userUsernameSchema.optional(),
});

export const userUpdatePayloadSchema = z.object({
  email: userEmailSchema.optional(),
  password: userPasswordSchemaMinMax.optional(),
  username: userUsernameSchema.optional(),
});

export const userLoginPayloadSchema = z.object({
  email: userEmailSchema,
  password: userPasswordSchemaDefault,
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