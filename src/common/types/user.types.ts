import { z } from 'zod';

import {
  userCreatePayloadSchema,
  userUpdatePayloadSchema,
} from '@/common/schemas';

export type UserCreatePayload = z.infer<typeof userCreatePayloadSchema>;

export type UserUpdatePayload = z.infer<typeof userUpdatePayloadSchema>;