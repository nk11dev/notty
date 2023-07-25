import type { Request, Response, NextFunction } from 'express';
import colors from 'ansi-colors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const handleErrors = (error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.log(colors.red(`\n--- error: ${error}`));

  res.sendError(error.status || 500, {
    message: error.message
  });
}