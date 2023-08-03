import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils/error.util';

export function errorHandler(
  err: HttpError | Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  if (err instanceof HttpError) {
    return res.status(err?.status || 500).json({
      status: 0,
      fields: err?.code,
      message: err?.message || 'Please, contact your system administrator',
    });
  }
  return res.status(500).json({
    status: 0,
    fields: {},
    message: err.message || 'Please, contact your system administrator',
  });
}
