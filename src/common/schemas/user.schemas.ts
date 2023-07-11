import { z } from 'zod';

const messages = {
  required: (text: string) => `${text} is required`,
  nonempty: (text: string) => `${text} can not be empty`
};

const userEmailSchema = z.string({
  required_error: messages.required('Email address'),
})
  .nonempty(messages.nonempty('Email address'))
  .email('Invalid email address format');

const userPasswordSchemaDefault = z.string({
  required_error: messages.required('Password'),
  invalid_type_error: "Password must be a string"
})
  .nonempty(messages.nonempty('Password'));

const userPasswordSchemaMinMax = userPasswordSchemaDefault
  .min(8, 'Password must be more than 8 characters')
  .max(32, 'Password must be less than 32 characters');

const userUsernameSchema = z.string({
  invalid_type_error: "Username must be a string"
})
  .max(20, 'Username must be less than 20 characters');

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