import { Request, Response, NextFunction } from 'express';

const tryCatchMiddleware =
  (handler: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };

export default tryCatchMiddleware;
