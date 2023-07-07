// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Express } from 'express-serve-static-core';

import type { TokenData } from '@/server/types/token.types';

declare module 'express-serve-static-core' {
  interface Request {
    tokenData?: TokenData;
  }
}