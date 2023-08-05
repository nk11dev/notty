// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Express } from 'express-serve-static-core';

import type {
  AccessTokenPayload,
  RefreshTokenPayload,
} from '@/server/types/token.types';
import type { AccessConditions } from '@/server/types/auth.types';

declare module 'express-serve-static-core' {
  interface Request {
    accessTokenPayload?: AccessTokenPayload;
    accessConditions?: AccessConditions;
    refreshTokenPayload?: RefreshTokenPayload;
  }
  interface Response {
    sendSuccess: (statusCode: number, payload?: unknown) => Response;
    sendError: (statusCode: number, error: unknown) => Response;
    sendAccessForbidden: () => Response;
  }
}