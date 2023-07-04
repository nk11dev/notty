import { z } from 'zod';

import {
  userCreatePayloadSchema,
  userUpdatePayloadSchema,
} from '@/server/schemas';

export type UserCreatePayload = z.infer<typeof userCreatePayloadSchema>;

export type UserUpdatePayload = z.infer<typeof userUpdatePayloadSchema>;