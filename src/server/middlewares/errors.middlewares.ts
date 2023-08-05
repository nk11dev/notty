import type { Request, Response, NextFunction } from 'express';
import colors from 'ansi-colors';

import { HttpStatus } from '@/common/constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const handleErrors = (error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.log(colors.red(`\n--- error: ${error.stack}`));

  res.sendError(error.status || HttpStatus.INTERNAL_SERVER_ERROR, {
    message: error.message
  });
}