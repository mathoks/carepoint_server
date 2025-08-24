import { Request, Response, NextFunction } from 'express';
export function isLoggedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next();
}
