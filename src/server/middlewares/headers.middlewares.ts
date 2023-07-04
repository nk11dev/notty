import type { Request, Response, NextFunction } from 'express';

export function setAccessHeaders(request: Request, response: Response, next: NextFunction) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
  next();
}