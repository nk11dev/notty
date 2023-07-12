import { z } from 'zod';

import {
  userCreatePayloadSchema,
  userUpdatePayloadSchema,
  userLoginPayloadSchema,
} from '@/common/schemas';

export type UserCreatePayload = z.infer<typeof userCreatePayloadSchema>;

export type UserUpdatePayload = z.infer<typeof userUpdatePayloadSchema>;

export type UserLoginPayload = z.infer<typeof userLoginPayloadSchema>;