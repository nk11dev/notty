import { z } from 'zod';

import { 
  userCreatePayloadSchema,
  userUpdatePayloadSchema,
 } from '@/server/helpers/validation/user.schemas';

export type UserCreatePayload = z.infer<typeof userCreatePayloadSchema>;

export type UserUpdatePayload = z.infer<typeof userUpdatePayloadSchema>;